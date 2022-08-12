const { ethers, network } = require("hardhat")
const fs = require("fs")
/*We update frontend using scripts */

const frontEndContractFile = "../frontend-moralis/constants/networkMapping.json"
const frontEndAbiLocation = "../frontend-moralis/constants/"
module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend")
    await updateFrontendAddresses()
    await updateAbi()
  }
}

/*To update the abi directly on frontend*/
async function updateAbi() {
  const nftMarketPlace = await ethers.getContract("nftMarketplace")
  const basicNft = await ethers.getContract("BasicNft")
  fs.writeFileSync(
    `${frontEndAbiLocation}NftMarketPlace.json`,
    nftMarketPlace.interface.format(ethers.utils.FormatTypes.json)//Check about this format in hardhat and ethers docs
  );
  fs.writeFileSync(
    `${frontEndAbiLocation}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateFrontendAddresses() {
  const nftMarketPlace = await ethers.getContract("nftMarketplace")
  const chainId = network.config.chainId.toString()
  const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractFile, "utf8"))
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
