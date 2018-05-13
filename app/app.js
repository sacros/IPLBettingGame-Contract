var contractABI = [ { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenOwner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenOwner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "tokenOwner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" } ], "name": "Approval", "type": "event" } ]
var contractAddress = "0x39d883dca1f1a37d36af7c82452232d2748a7819"
// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'))
if(typeof web3 !== 'undefined'){
web3 = new Web3(web3.currentProvider);
    } else{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var contract = web3.eth.contract(contractABI).at(contractAddress)

function getTotalSupply() {
    contract.totalSupply(function(err, res){
        document.getElementById("ans").innerHTML = res
    })
}

function getbalanceOf() {
    var addr = document.getElementById("addr1").value
    console.log(addr)
    contract.balanceOf.call(addr, {from:web3.eth.accounts[0], gas:200000}, function(err, res){
        document.getElementById("ans").innerHTML = res
    })
}

function transfer() {
    var addr = document.getElementById("addr2").value
    var amount = document.getElementById("amnt").value
    console.log(addr)
    console.log(amount)
    contract.transfer(addr, amount, {from:web3.eth.accounts[0], gas:200000}, function(err, res){
        document.getElementById("ans").innerHTML = res
    })

}
