const admin = "0xD9eaa853bBCCcf5CB0A49241A7F69d743f3cf049";
window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("Web3 detected!");
        window.web3 = new Web3("https://ropsten.infura.io/v3/fa2d51dfb7214816ae1e14b2f3145619");
        // Now you can start your app & access web3 freely:
        console.log("Вы подключены к Блокчейн");
        var currentNetwork = web3.version.network;
        if (currentNetwork == 3) {
            console.log("Вы подключены к Ropsten");
            changeLkUrl()
        } else {
            console.log("Вы не подключены к сети Ropsten");
        }
    }
    getIdFromSC();

})

function changeLkUrl() {
    let cookie = getCookie('address');
    console.log(cookie)
    if (typeof cookie !== "undefined") {
        console.log("in cookie")
        addr = cookie;
        show_address(addr);
        if (addr == admin.toLowerCase()){
            changeURLadmin();
        }
        else{
            console.log("user")
            changeURLUser();
        }
    }
}
function changeURLadmin(){
	var lk = document.getElementById('lk')
	lk.href='lk_admin';
}
function changeURLUser(){
    console.log("user")
	var lk = document.getElementById('lk')
	lk.href='lk_user';
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/'
    };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

$('#post-form').on('submit', function (event) {
    let addr = connect()
    changeLkUrl()
    show_address(addr)
    console.log("done")
    event.preventDefault()
    console.log("form submitted!")  // sanity check
    add_user(addr)
})

function show_address(addr) {
    var address = document.getElementById("address");
    if (typeof addr !== 'undefined') {
        address.innerHTML = "Вы вошли под кошельком с адресом: " + addr;
    } else {
        address.innerHTML = "Нажмите на кнопку входа еще раз";
    }
}

function connect() {
    if (typeof ethereum !== 'undefined') {
       ethereum
        .request({ method: 'eth_requestAccounts' })
        .catch((error) => {
        if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
        } else {
            console.error(error);
        }
        }); 
        let addr = web3.eth.accounts[0];
        setCookie('address', encodeURIComponent(addr), {secure: true, 'max-age': 3600});
        return addr;
    } else {
        document.getElementById("address").innerHTML = "Error";
    }
}

function add_user(addr) {
    console.log("create post is working!") // sanity check
    $.ajax({
        type: "POST", // http method
        data: {
            the_post: addr,
            csrfmiddlewaretoken: window.CSRF_TOKEN,
            action: "add_user"
        }, // data sent with the post request

        // handle a successful response
        success: function (json) {
            $('#post-text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error: function (xhr, errmsg, err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    })
}

function initContract() {
    const abi = [{
        "constant":true,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"CheckState",
        "outputs":[{
            "name":"",
            "type":"string"
        }],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"Refund",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"delivered",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"CancelOrder",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"CancelOrderAdmin",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"OrderArranged",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":true,
        "inputs":[{
            "name":"id",
            "type":"uint256"
        }],
        "name":"getOrder",
        "outputs":[{
            "name":"buyer",
            "type":"address"
        },{
            "name":"depositOut",
            "type":"uint256"
        },{
            "name":"currentState",
            "type":"uint8"
        },{
            "name":"OrderTime",
            "type":"uint256"
        }],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },{
        "constant":false,
        "inputs":[],
        "name":"deposit",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },{
        "constant":true,
        "inputs":[{
            "name":"buyer",
            "type":"address"
        }],
        "name":"getIDs",
        "outputs":[{
            "name":"",
            "type":"uint256[]"
        }],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    }]
    const contract_Address = {
        "3": "0xe0e00e259fe5649932953955f5bf82414c359029"
    }
 
    try {
        var current_network = web3.version.network;
        var contract = web3.eth.contract(abi).at(contract_Address[current_network]);
    } catch (error) {
        console.log(error)
    }
    return contract;
}


function getIdFromSC() {
    addr = connect();
    var contract = initContract();
    contract.getIDs(
        addr,
        function (error, ids) {
            if(!error){
                getOrder_js(ids);
            }else{
                console.log(error);
            }
       }); 
}

function getOrder_js(ids) {
    var contract = initContract();
    ids.forEach(id_dirty => {
        id = id_dirty['c'][0];
        console.log("id in order: ", id);
        getOrder_SC(contract, id);   
    });
}

function getOrder_SC(contract, id){
       contract.getOrder(
           id,
           function (error, Order) {
               if(!error){
                   showOrder(Order, id);
               }else{
                   console.log(error);
               }
           }
       );   
}

function showOrder(Order, id) {
    var orderId = id;
    console.log("id: ", orderId);
    var address = Order[0];
    console.log("address: ", address);
    var deposit = Order[1]['c'][0];
	deposit = deposit*45000/10000;
    console.log("deposit: ", deposit);
    var status = Order[2]['c'][0];
	switch (status) {
	  case 0:
	    status = "Ожидается оплаты";
	    break;
	  case 1:
	    status = "Отменен ";
	    break;
	  case 2:
	    status = "Сборка заказа";
	    break;
	  case 3:
	    status = "Доставляется";
	    break;
	  case 4:
	    status = "Возврат средств";
	    break;
	  case 5:
	    status = "Выполнен";
	    break;
	  default:
	    status = "Ожидается оплата";
	}
    console.log("status: ", status);
    var time = Order[3]['c'][0];
    time = timeConverter(time);
    console.log("time: ", time);
	
    let order_template = document.createElement('div');
    order_template.append(orders_users.content.cloneNode(true));
    var lk_user = document.getElementsByClassName("staticText");
    lk_user[0].appendChild(order_template);
	
    order_time = document.getElementById("order_time");
    order_id = document.getElementById("order_id");
    order_price = document.getElementById("order_price");
    order_state = document.getElementById("order_state");
    order_cancel_button = document.getElementById("cancelBtn");
    order_refund_button = document.getElementById("refundBtn");
	
    order_time.innerHTML = "Заказ от " + time;
    order_id.innerHTML = "Номер заказа: " + orderId;
    order_price.innerHTML = "Вы заплатили: " + deposit + " руб.";
    order_state.innerHTML = "Статус заказа: " + status;
	
    order_time.removeAttribute('id');
    order_id.removeAttribute('id');
    order_price.removeAttribute('id');
    order_state.removeAttribute('id');
    order_cancel_button.setAttribute('onclick', 'cancelOrder_user(' + orderId + ')');
    order_cancel_button.removeAttribute('id');
    order_refund_button.setAttribute('onclick', 'refundOrder_user(' + orderId + ')');
    order_refund_button.removeAttribute('id');
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
  return time;
}

function cancelOrder_user(id_order){
    connect();
    console.log(id_order)
    var contract = initContract();
    contract.CancelOrder(id_order, function (error, result) {
        if (!error)
            console.log(result);
        else
            console.error(error);
    });		
}

function refundOrder_user(id_order){
    connect();
    console.log(id_order)
    var contract = initContract();
    contract.Refund(id_order, function (error, result) {
        if (!error)
            console.log(result);
        else
            console.error(error);
    });	
}
