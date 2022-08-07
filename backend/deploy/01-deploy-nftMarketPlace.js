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