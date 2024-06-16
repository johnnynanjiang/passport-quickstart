const { Web3 } = require("web3");
const { encode } = require("rlp");
const { LegacyTransaction } = require('@ethereumjs/tx');

const { theWalletTransactionService } = require("./TransactionService");

async function main() {
  const txSerialized = await theWalletTransactionService.constructTransactionSerialized();
  const signedTx = await theWalletTransactionService.signTransactionSerialized(txSerialized);
  const receipt = await theWalletTransactionService.broadcastTransaction(signedTx);

  var testTxAsLegacyTransaction = LegacyTransaction.fromSerializedTx(signedTx.rawTransaction);
  console.log("main() - testTxAsLegacyTransaction", testTxAsLegacyTransaction);
  console.log("main() - testTxAsLegacyTransaction.toJSON()", testTxAsLegacyTransaction.toJSON());
}

main();