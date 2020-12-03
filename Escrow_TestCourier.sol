pragma solidity 0.5.1;

contract EscrowBaseContract {

    enum State {AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE}

    //State currentState;
    State constant default_value  = State.AWAITING_PAYMENT;
    //address buyer;
    struct Order { 
        uint id;
        address buyer;
        uint256 deposit;
        State currentState;
    }

    address payable constant seller = 0x0667FA2A9dDF39d6921373FFA82E4a48C31b2a97;
    address constant courier = 0x0667FA2A9dDF39d6921373FFA82E4a48C31b2a97;
    uint256 OrderCount;
    mapping(uint => Order) public order_list;
    modifier onlyCourier(){require(msg.sender == courier); _;}
    //modifier inState(State expectedState, uint id){require(order_list[id].currentState == expectedState); _;}
    
    
    function CheckState(uint id) public view returns(string memory) {
        if(order_list[id].currentState == State.AWAITING_PAYMENT)
            return 'Awaiting payment';
        if(order_list[id].currentState == State.AWAITING_DELIVERY)
            return 'Awaiting Delivery';
        else return 'Complete';
    }
 
    function deposit(address buyer_ad) public  payable {
        uint256 amount = msg.value;
        OrderCount+=1;
        order_list[OrderCount].buyer = buyer_ad;
        order_list[OrderCount].deposit = order_list[OrderCount].deposit + amount;
        order_list[OrderCount].currentState = State.AWAITING_DELIVERY;
    }

    function delivered(uint256 id) public onlyCourier {
        order_list[id].currentState = State.COMPLETE;
        withdraw(id);
    }

    function withdraw(uint256 id) internal {
        uint256 payment = order_list[id].deposit;
        order_list[id].deposit = 0;
        seller.transfer(payment);
        order_list[id].currentState=State.AWAITING_PAYMENT;
    }
    
}
