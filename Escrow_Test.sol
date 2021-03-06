 pragma solidity ^0.5.3;

contract EscrowBaseContract {

    enum State {AWAITING_PAYMENT, CANCELLED, ARRANGING_ORDER, AWAITING_DELIVERY, REFUNDED, COMPLETE}

    //State currentState;
    State constant default_value  = State.AWAITING_PAYMENT;
    //address buyer;
    struct Order { 
        address payable buyer;
        uint256 deposit;
        uint256 depositOut;
        State currentState;
        uint256 OrderTime;
    }
    
    address payable constant seller = 0xD9eaa853bBCCcf5CB0A49241A7F69d743f3cf049; 
    uint256 OrderCount;
    mapping(address => uint[]) buyer_orders;
    mapping(uint => Order) order_list;
    modifier onlySeller(){require(msg.sender == seller); _;}

    modifier timePassedRefund(uint256 id, uint256 time) {
        require(now - order_list[id].OrderTime >= time); 
        require(order_list[id].deposit != 0); 
        require(msg.sender == order_list[id].buyer); 
        require(order_list[id].currentState == State.AWAITING_DELIVERY);
        _; 
    }
    
    modifier CancelOrdReq(uint256 id) {
        require(order_list[id].deposit != 0); 
        require(msg.sender == order_list[id].buyer); 
        require(order_list[id].currentState == State.ARRANGING_ORDER);
        _; 
    }
    
    modifier depNot0(uint256 id){
        require(order_list[id].deposit != 0);
        _;
    }
    
    function getOrder(uint id) public view returns(address buyer, uint256 depositOut, State currentState, uint256 OrderTime){
        return (order_list[id].buyer, order_list[id].depositOut, order_list[id].currentState, order_list[id].OrderTime); 
    }    
    
    function getIDs(address buyer) public view returns(uint256[] memory){
        return buyer_orders[buyer];
    }
    
    
    function CheckState(uint id) public view returns(string memory) {
        if(order_list[id].currentState == State.AWAITING_PAYMENT)
            return 'Awaiting payment.';
        if(order_list[id].currentState == State.CANCELLED)
            return 'The order is cancelled.';
        if(order_list[id].currentState == State.ARRANGING_ORDER)
            return 'Order in the proccess of arranging.';
        if(order_list[id].currentState == State.AWAITING_DELIVERY)
            return 'Awaiting Delivery.';
        if(order_list[id].currentState == State.COMPLETE)
            return 'Complete.';
        else return 'Refunded.';
    }
    
    function deposit() public payable {
        uint256 amount = msg.value;
        OrderCount+=1;
        
        order_list[OrderCount].buyer = msg.sender;
        order_list[OrderCount].deposit += amount;
        order_list[OrderCount].depositOut = order_list[OrderCount].deposit;
        order_list[OrderCount].currentState = State.ARRANGING_ORDER;
        order_list[OrderCount].OrderTime = now;
        buyer_orders[msg.sender].push(OrderCount);
    }

    function OrderArranged(uint256 id) public onlySeller() {
        order_list[id].currentState = State.AWAITING_DELIVERY;
    }

    function delivered(uint256 id) public onlySeller {
        order_list[id].currentState = State.COMPLETE;
        withdraw(id);
    }

    function withdraw(uint256 id) internal onlySeller {
        uint256 payment = order_list[id].deposit;
        order_list[id].deposit = 0;
        seller.transfer(payment);
    }
    
    function Refund(uint256 id) public timePassedRefund(id, 5 minutes) {
        msg.sender.transfer(order_list[id].deposit);
        order_list[id].deposit = 0;
        order_list[id].currentState = State.REFUNDED;
    }
    
    function CancelOrder(uint256 id) public CancelOrdReq(id) {
        msg.sender.transfer(order_list[id].deposit);
        order_list[id].deposit = 0;
        order_list[id].currentState = State.CANCELLED;
    }
    
    function CancelOrderAdmin(uint256 id) public onlySeller() depNot0(id){
        order_list[id].buyer.transfer(order_list[id].deposit);
        order_list[id].deposit = 0;
        order_list[id].currentState = State.CANCELLED;
    }
    
}
