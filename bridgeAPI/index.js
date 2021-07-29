const Web3 = require('web3');
const ABI = require('./ABI');

const address = "0x87BC5b7Ea1A2957ECcE8ae1858FC590744369902"
const privateKey = "a0d9f8862cd73a4140fcc954c5dd865b37423d44c68b2109267aa4f0ee0f5bff"

const RopstenWeb3 = new Web3("wss://ropsten.infura.io/ws/v3/e013c86a43a4452c925b592be49c8e21");
const RinkebyWeb3 = new Web3("wss://rinkeby.infura.io/ws/v3/e013c86a43a4452c925b592be49c8e21");

const RopstenAddress = "0xDAbb0E7cD39cD41a36043D4338AF9aa641D1e811";
const RinkebyAddress = "0xe84ff1f42bdc136b40c857bc928e2b1776a68185";

const RopstenToken = new RopstenWeb3.eth.Contract(ABI, RopstenAddress);
const RinkebyToken = new RinkebyWeb3.eth.Contract(ABI, RinkebyAddress);

RopstenToken.events.BurnEvent({})
    .on('data', async(event) => {
        console.log('Token burned on Ropsten')
        const amount = event.returnValues._amount;
        const to = event.returnValues._to;
        console.log("amount: " + amount);
        console.log("to: " + to);
        const tx = RinkebyToken.methods.Mint(amount, to);
        const gas = await tx.estimateGas({from: address});
        const gasPrice = await RinkebyWeb3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await RinkebyWeb3.eth.getTransactionCount(address) + 1;
        console.log("tx: " + tx);
        console.log("data: " +data);
        console.log("gas: " + gas);
        console.log("gas price: " + gasPrice);
        console.log("nonce: " + nonce);
        const signedTx = await RinkebyWeb3.eth.accounts.signTransaction({
            to: RinkebyAddress,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: 4
        },
        privateKey);
        RinkebyWeb3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("signed tx: " + signedTx);
})
RinkebyToken.events.BurnEvent({})
    .on('data', async(event) => {
        console.log('Token burned on Rinkeby')
        const amount = event.returnValues._amount;
        const to = event.returnValues._to;
        console.log("amount: " + amount);
        console.log("to: " + to);
        const tx = RopstenToken.methods.Mint(amount, to);
        const gas = await tx.estimateGas({from: address});
        const gasPrice = await RopstenWeb3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await RopstenWeb3.eth.getTransactionCount(address);
        console.log("tx: " + tx);
        console.log("data: " +data);
        console.log("gas: " + gas);
        console.log("gas price: " + gasPrice);
        console.log("nonce: " + nonce);
        const signedTx = await RopstenWeb3.eth.accounts.signTransaction({
            to: RopstenAddress,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: 3
        },
        privateKey);
        RopstenWeb3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("signed tx: " + signedTx);
})