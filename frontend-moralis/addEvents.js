const Moralis = require("moralis/node");
require("dotenv").config();
const contractAddresses = require("./constants/networkMapping.json");
let chainId = process.env.chainId || 31337;
 
async function main() {


}

main()
  .then(() => [process.exit(0)])
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
