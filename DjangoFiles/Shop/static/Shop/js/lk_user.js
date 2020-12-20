const admin = "0x0667FA2A9dDF39d6921373FFA82E4a48C31b2a97";
window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log("Web3 detected!");
        window.web3 = new Web3(web3.currentProvider);
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
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"CheckState",
        "outputs":[{"name":"","type":"string"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"Refund",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"delivered",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"CancelOrder",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":false,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"CancelOrderAdmin",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable","type":"function"
    },{
        "constant":false,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"OrderArranged",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":true,
        "inputs":[{"name":"id","type":"uint256"}],
        "name":"getOrder",
        "outputs":[
            {"name":"buyer","type":"address"},
            {"name":"deposit","type":"uint256"},
            {"name":"currentState","type":"uint8"},
            {"name":"OrderTime","type":"uint256"}
        ],
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
        "inputs":[{"name":"buyer","type":"address"}],
        "name":"getIDs",
        "outputs":[{"name":"","type":"uint256[]"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    }]
    const contract_Address = {
        "3": "0x50943D5E5214A5f0CdC1802b0797d73BEcD9601d"
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
        contract.getOrder(
            id,
            function (error, Order) {
                if(!error){
                    saveOrder(Order, id);
                }else{
                    console.log(error);
                }
            }
        );   
    });
}

function showOrder(Order, id) {
    var orderId = id;
    console.log("id: ", orderId);
    var address = Order[0];
    console.log("address: ", address);
    var deposit = Order[1]['c'][0];
    console.log("deposit: ", deposit);
    var status = Order[2]['c'][0];
    console.log("status: ", status);
    var time = Order[3]['c'][0];
    console.log("time: ", time);

}