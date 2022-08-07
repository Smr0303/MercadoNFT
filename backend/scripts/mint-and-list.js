const {ethers} = require('hardhat');

const PRICE =ethers.utils.parseEther("0.5");


async function mintAndList(){
    const nftMarketPlace = await ethers.getContract('nftMarketplace');
    const basicNft = await ethers.getContract('BasicNft');
    console.log("Minting...");
    const mintTx= await basicNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt.events[0].args.tokenId;
    console.log("Approving nft");

    const approvalTx = await  basicNft.approve(nftMarketPlace.address, tokenId);
    await approvalTx.wait(1);
    const tx = await nftMarketPlace.listItem(basicNft.address,tokenId,PRICE);
    await tx.wait(1);
    console.log("Listed");
}

mintAndList()
.then(()=>{
    process.exit(0);
}).catch((err)=>{
    console.log(err);
    process.exit(1);
})