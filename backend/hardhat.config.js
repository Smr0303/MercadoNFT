/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("solidity-coverage")
require("hardhat-deploy")
require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require("solhint")
module.exports = {
  solidity: {
    compilers:[{version:"0.8.7"},{version:"0.6.12"},{version:"0.6.6"},{version:"0.4.19"}]
  },
  defaultNetwork:"hardhat",
  networks: {
    hardhat:{
     chainId:31337,
     forking:{
      url:process.env.MAINNET_RPC_URL
     }
    },
    rinkeby: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4, //for rinkeby
      blockConfirmations:5,
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      //accounts : Hardhat uses it own local accounts automatically
      chainId:31337,
      blockConfirmations:1,
    }
  },
  etherscan:{
  apiKey:{
    rinkeby: process.env.ETHERSCAN_API
  },
},
  namedAccounts:{
    deployer:{
      default:0,
      4:0,
    },
    player:{
      default:1,
    } 
  },
  mocha:{
    timeout:200000,//200 secs
  }
}
