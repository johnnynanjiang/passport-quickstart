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

  // const passportSignedTxAsHexString = '0xa7f71182bfdc2f938eefa493b4b55f7b5ce500b127c6fb6e2210543048d16bd7765e79336f5f5dda9d38522316bcd9999487dd2142c3a0687ce73e37a7ec62891c';
  // const passportSignedTxAsLegacyTransaction = LegacyTransaction.fromSerializedTx(passportSignedTxAsHexString);
  // console.log("main() - passportSignedTxAsLegacyTransaction", passportSignedTxAsLegacyTransaction);
}

main();