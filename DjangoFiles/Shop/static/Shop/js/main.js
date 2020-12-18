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
  		connect()
		console.log("error")
	})

	function connect () {
		if (typeof ethereum !== 'undefined') {
   			ethereum.enable()
   			.catch(console.error)
			var addr = web3.eth.accounts[0]
  			document.getElementById("address").innerHTML=addr;
 		}
		else{
	    	document.getElementById("address").innerHTML = "Error";
   		}
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