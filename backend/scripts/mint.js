const { ethers, network } = require("hardhat")
const { moveBlocks, sleep } = require("../utils/move-blocks")
const PRICE = ethers.utils.parseEther("0.5")

async function mintAndList() {
  const nftMarketPlace = await ethers.getContract("nftMarketplace")
  const basicNft = await ethers.getContract("BasicNft")
  console.log("Minting...")
  const mintTx = await basicNft.mintNft()
  const mintTxReceipt = await mintTx.wait(1)
  const tokenId = mintTxReceipt.events[0].args.tokenId
  console.log("Approving nft")

//   const approvalTx = await basicNft.approve(nftMarketPlace.address, tokenId)
//   await approvalTx.wait(1)
//   const tx = await nftMarketPlace.listItem(basicNft.address, tokenId, PRICE)
//   const txReceipt = await tx.wait(1)
//   console.log(txReceipt)
//   console.log("Listed")

  if (network.config.chainId === 31337) {
    /*Moralis has a hard time if we mine more than 1 block */
    await moveBlocks(1, (sleeAmount = 1000)) // We are doing so that the itemListed events get confirmed and we dont have to wait
  }
}

mintAndList()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
