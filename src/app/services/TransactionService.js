const { Web3 } = require("web3");
const { encode } = require("rlp");

class TransactionService {
  constructor() {
  }

  async constructTransaction() {
    const web3 = new Web3("http://127.0.0.1:8545/");

    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    // import the Hardhat test account without the use of a wallet
    const sender = web3.eth.accounts.privateKeyToAccount(privateKey);

    const receiver = web3.eth.accounts.create();

    // used to calculate the transaction's maxFeePerGas
    const block = await web3.eth.getBlock();

    const transactionAsJson = {
      from: sender.address,
      to: receiver.address,
      value: 10,
      // the following two properties must be included in raw transactions
      maxFeePerGas: block.baseFeePerGas * 2n,
      maxPriorityFeePerGas: 100000,
    };
    console.log("transactionAsJson", transactionAsJson);

    const txAsBuffer = encode([
      transactionAsJson.nonce, 
      transactionAsJson.gasPrice, 
      transactionAsJson.gasLimit, 
      transactionAsJson.to, 
      transactionAsJson.value, 
      transactionAsJson.data
    ]);
    const txAsUint8Array = new Uint8Array(txAsBuffer);
    console.log("txAsUint8Array", new Uint8Array(txAsUint8Array));

    return txAsUint8Array;
  }

  uint8ArrayToJson(dataAsUint8Array) {
    const jsonString = Buffer.from(dataAsUint8Array).toString('utf8');
    const parsedDataAsJson = JSON.parse(jsonString);
    
    console.log("parsedDataAsJson", parsedDataAsJson);

    return parsedDataAsJson;
  }

  async signTransaction(transaction, privateKey) {
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      privateKey
    );
    console.log("signedTransaction", signedTransaction);
  }

  async broadcastTransaction(signedTransaction) {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("receipt", receipt);
  }
}

const theWalletTransactionService = new TransactionService();
Object.freeze(theWalletTransactionService);

// export default theWalletTransactionService;

module.exports = { theWalletTransactionService };