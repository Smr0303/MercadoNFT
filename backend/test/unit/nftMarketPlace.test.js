const { assert, expect } = require("chai")
const { developmentChains, networkConfig } = require("../../../helper-hardhat-config")
const { ethers, network, deployments, getNamedAccounts } = require("hardhat")
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Nft marketPlace tests", () => {
      let nftMarketPlace, basicNft, player;
      const PRICE = ethers.utils.parseEther("0.1")
      const TOKEN_ID = 0
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        player = (await ethers.getSigners())[0]
        await deployments.fixture(["all"])
        nftMarketPlace = await ethers.getContract("nftMarketplace");
       basicNft = await ethers.getContract("BasicNft");
        await basicNft.mintNft()
        await basicNft.approve(nftMarketPlace.address, TOKEN_ID)
      })
      it("lists and can be bought", async () => {
        console.log(nftMarketPlace);
        await nftMarketPlace.listItem(basicNft.address, TOKEN_ID, PRICE)
        const playerConnectedNftMarketPlace = nftMarketPlace.connect(player)
        await playerConnectedNftMarketPlace.buyItem(basicNft.address, TOKEN_ID, { value: PRICE })
        const newOwner = await basicNft.ownerOf(TOKEN_ID);
        const deployProceeds = await nftMarketPlace.getProceeds(deployer)
        assert.equal(newOwner.toString(), player.address)
        assert.equal(deployProceeds.toString(), PRICE.toString())
      })
    })
