const { Web3 } = require("web3");
const { encode } = require("rlp");

const { theWalletTransactionService } = require("./TransactionService");

async function main() {
  /*
  const web3 = new Web3("http://127.0.0.1:8545/");

  const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // import the Hardhat test account without the use of a wallet
  const sender = web3.eth.accounts.privateKeyToAccount(privateKey);

  const receiver = web3.eth.accounts.create();

  // used to calculate the transaction's maxFeePerGas
  const block = await web3.eth.getBlock();

  const transaction = {
    from: sender.address,
    to: receiver.address,
    value: 10,
    // the following two properties must be included in raw transactions
    maxFeePerGas: block.baseFeePerGas * 2n,
    maxPriorityFeePerGas: 100000,
  };
  console.log("transaction", transaction);

  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    sender.privateKey
  );
  console.log("signedTransaction", signedTransaction);

  const receipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  );
  console.log("receipt", receipt);

  const rawTransaction = encode([transaction.nonce, transaction.gasPrice, transaction.gasLimit, transaction.to, transaction.value, transaction.data]);
  console.log("rawTransaction", new Uint8Array(rawTransaction));
  */

  const txAsUint8Array = await theWalletTransactionService.constructTransaction();
  const txAsJson = theWalletTransactionService.uint8ArrayToJson(txAsUint8Array);
}

main();