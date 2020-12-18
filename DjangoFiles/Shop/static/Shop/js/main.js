window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log("Web3 detected!");
    window.web3 = new Web3(web3.currentProvider);
    // Now you can start your app & access web3 freely:
    console.log("Вы подключены к Блокчейн");
    var currentNetwork = web3.version.network;
    if (currentNetwork == 3){
        console.log("Вы подключены к Ropsten");
    } else {
        console.log("Вы не подключены к сети Ropsten");
    }
  }
})

	login_but.addEventListener('click', function() {
  		addr = connect()
        console.log("done")
        create_post(addr)
    })

	exit_but.addEventListener('click', function() {
		if (ethereum.isConnected()){
			disconnect();
		}
        console.log("done")
    	})
    
    function create_post(addr) {
        console.log("create post is working!") // sanity check
        $.ajax({
            type : "POST", // http method
            data : { the_post : addr }, // data sent with the post request

            // handle a successful response
            success : function(json) {
                console.log(json); // log the returned json to the console
                console.log("success"); // another sanity check
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    };

	function connect () {
		if (typeof ethereum !== 'undefined') {
   			ethereum.enable()
   			.catch(console.error)
            var addr = web3.eth.accounts[0]
            var address = document.getElementById("address");
            address.innerHTML = "Вы вошли под кошельком с адресом: " +addr;
            var enter = document.getElementById("login_but");
            enter.innerHTML = "Выйти";
            enter.id = "exit_but";
            return addr;
 		}
		else{
	    	document.getElementById("address").innerHTML = "Error";
   		}
	}
	
	function disconnect(){
		ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
	}
		
	const elements = document.getElementsByClassName('payOrder');

	function initContract(){
		const abi=[{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"CheckState","outputs":[{"name":"currentState","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"Refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"delivered","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"order_list","outputs":[{"name":"buyer","type":"address"},{"name":"deposit","type":"uint256"},{"name":"currentState","type":"uint8"},{"name":"OrderTime","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
		const contract_Address={
			"3" : "0x4b41F4A10BB68Df8890B789273666bA2EDe0c2F8"
		}
		try {
 			var current_network = web3.version.network;
  			var contract = web3.eth.contract(abi).at(contract_Address[current_network]);
		} catch (error) {
			console.log(error)	
		}
		return contract;
	}

	function deposit_js(price){
  		connect();
   		console.log(price)
		contract = initContract();
		const amountWei = price/45000*1e18
		contract.deposit({
           		value: amountWei 
     		},function(error, result){
         		if(!error)
             		console.log(result);
         		else
             		console.error(error);
    		});
	}
