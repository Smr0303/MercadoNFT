const {developmentChains,networkConfig} = require('../helper-hardhat-config');
const {ethers,network} = require("hardhat");
const {verify} = require('../utils/verify');
module.exports = async({getNamedAccounts, deployments})=>{
const {deploy,log} = deployments;
const {deployer} = await getNamedAccounts();

const nftMarketPlace = await deploy("nftMarketplace",{
    from:deployer,
    args:[],
    log:true,
    waitConfirmations: network.config.blockConfirmations || 1 
}); 
if(!developmentChains.includes(network.name)){
    log("Verifying....");
    verify(nftMarketPlace.address, []);
    log("-------")
}

}
module.exports.tags =["all","nftMarketPlace"];

// deploying "nftMarketplace" (tx: 0x06ac77e88f950fb88d4c49b899e018e97ed506a16cd67478adbb66b8e77e0359)...: deployed at 0x9967229673245fC28cE88C7579ab42A37e3C882b with 1368070 gas
//Verifying....
/*Successfully verified contract nftMarketplace on Etherscan.
https://rinkeby.etherscan.io/address/0x9967229673245fC28cE88C7579ab42A37e3C882b#code */