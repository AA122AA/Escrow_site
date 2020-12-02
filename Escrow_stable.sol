pragma solidity 0.5.1;

contract EscrowBaseContract {

    enum State {AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE}

    State currentState;

    address buyer;
    address payable constant seller = 0x0667FA2A9dDF39d6921373FFA82E4a48C31b2a97;
    mapping(address => uint256) public deposits;
    modifier onlySeller(){require(msg.sender == seller); _;}
    modifier inState(State expectedState){require(currentState == expectedState); _;}

    constructor () public {
        buyer = msg.sender;
        currentState = State.AWAITING_PAYMENT;
    }
    
    function CheckState() public view returns(string memory) {
        if(currentState == State.AWAITING_PAYMENT)
            return 'Awaiting payment';
        if(currentState == State.AWAITING_DELIVERY)
            return 'Awaiting Delivery';
        else return 'Complete';
    }
 
    function deposit(address f_buyer) public inState(State.AWAITING_PAYMENT) payable {
        uint256 amount = msg.value;
        buyer = f_buyer;
        deposits[buyer] = deposits[buyer] + amount;
        currentState = State.AWAITING_DELIVERY;
    }

    function delivered() public onlySeller inState(State.AWAITING_DELIVERY){
        currentState = State.COMPLETE;
        withdraw();
    }

    function withdraw() private onlySeller inState(State.COMPLETE){
        uint256 payment = deposits[buyer];
        deposits[buyer] = 0;
        seller.transfer(payment);
        currentState=State.AWAITING_PAYMENT;
    }
    
}


