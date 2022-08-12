/*This script is just to mine blocks in case we need,
such as when we need to update moralis table attribute isConfirmed to true
 */

const { moveBlocks } = require("../utils/move-blocks")

const BLOCKS = 2
const SLEEP_AMOUNT = 1000

async function mine() {
  await moveBlocks(BLOCKS, (sleepAmount = SLEEP_AMOUNT))
}

mine()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
