connectButton.addEventListener('click', function () {
  connect()
})

function connect () {
  if (typeof ethereum !== 'undefined') {
    ethereum.enable()
    .catch(console.error)
  }
}
window.addEventListener('load', async () => {
	if (window.ethereum) {
	    window.web3 = new Web3(ethereum);
	    try {
	        await ethereum.enable();
	        initPaypayButton()
	    }catch (err) {
	        $('#status').html('User denied account access', err)
	    }
	} else if (window.web3) {
	    window.web3 = new Web3(web3.currentProvider)
	    initPaypayButton()
	} else {
	    $('#status').html('No Metamask (or other Web3 Provider) installed')
	}
})

const initPaypayButton = () => {
	$('.payButton',).click(() => {
	//var amountEth = parseInt(text) / ethRate
		const amountEth = 0.5
		const abi=[{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"CheckState","outputs":[{"name":"currentState","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"Refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"delivered","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"order_list","outputs":[{"name":"buyer","type":"address"},{"name":"deposit","type":"uint256"},{"name":"currentState","type":"uint8"},{"name":"OrderTime","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
		const contract_Address="0x4b41F4A10BB68Df8890B789273666bA2EDe0c2F8";
		const contract = new web3.eth.Contract(abi, contract_Address);
		contract.methods.deposit(amountEth);
	})
}

