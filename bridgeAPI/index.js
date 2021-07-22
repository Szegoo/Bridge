const Web3 = require('web3');
const ABI = require('./ABI');

const address = "0x92ca3552599Ffa4Ae74945DA02065AC9D9Bf7336"
const privateKey = "secret"

const RopstenWeb3 = new Web3("infura endpoint on ropsten");
const RinkebyWeb3 = new Web3("infura endpoint on rinkeby");

const RopstenAddress = "0xB4d48062f4afC363FF4D6B8e70bFf328dE7fB7bA";
const RinkebyAddress = "0x0097698994199cC75437Fe89F7b1aEd2cB4b2aCe";

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
        const nonce = await RinkebyWeb3.eth.getTransactionCount(address);
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
