const {run} = require("hardhat");

async function verify(contractAddress, args) {
    //We could verify using command line which is given in hardhatEtherscan docs but we made a function for it
    try {
      console.log(args);
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e) {
      if (e.message.toLowerCase().includes("alerady verified")) {
        console.log("Verified..")
      }
      else{
        throw e; 
      }
    }
  }
  module.exports = {verify};