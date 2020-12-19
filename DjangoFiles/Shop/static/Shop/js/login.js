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
        } else {
            console.log("Вы не подключены к сети Ropsten");
        }
    }
})

$('#post-form').on('submit', function (event) {
    let addr = connect()
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

export function connect() {
    if (typeof ethereum !== 'undefined') {
        ethereum.enable().catch(console.error);
        let addr = web3.eth.accounts[0];
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
            csrfmiddlewaretoken: window.CSRF_TOKEN
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
