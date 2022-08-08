const { ethers, network } = require("hardhat")
const fs = require("fs")
/*We update frontend using scripts */

const frontEndContractFile = "../frontend-moralis/constants/networkMapping.json"

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend")
    await updateFrontendAddresses()
  }
}

async function updateFrontendAddresses() {
  const nftMarketPlace = await ethers.getContract("nftMarketplace")
  const chainId = network.config.chainId.toString()
  const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractFile, "utf8"));
  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketPlace.address)) {
      contractAddresses[chainId]["NftMarketplace"].push(nftMarketPlace.address)
    }
  } else {
    contractAddresses[chainId] = { NftMarketplace: [nftMarketPlace.address] }
  }
  fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
