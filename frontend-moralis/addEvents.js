const Moralis = require("moralis/node");
require("dotenv").config();
const contractAddresses = require("./constants/networkMapping.json");
let chainId = process.env.chainId || 31337;
const contractAddress = contractAddresses[chainId]["NftMarketplace"];
/*As moralis understands local chain as 1337 */
let moralisChainId = chainId == "31337" ? "1337" : chainId;

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appID = process.env.NEXT_PUBLIC_APP_ID;
const masterKey = process.env.masterKey;

async function main() {
  await Moralis.start({ serverUrl, appID, masterKey });
  console.log("Working with moralis server..");

  let itemListedOptions = {
    /*We can do this manually also so we have to request only those attributes which we find while doing manually */
    chanId: moralisChainId,
    sync_historical: true, // If true it keeps the memory of all the emitted events
    topic: "ItemListed(address,address,uint256,uint256)", // We pass the event
    address: contractAddress,
    abi: {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "ItemListed",
      "type": "event"
    },
    tableName: "ItemListed",
  };

let itemBoughtOptions = {
  chainId: moralisChainId,
  address: contractAddress,
  sync_historical: true,
  topic: "ItemBought(address,address,uint256,uint256)",
  abi: {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "ItemBought",
    "type": "event"
  },
  tableName: "ItemBought",
}

let itemCanceledOptions = {
  chainId: moralisChainId,
  address: contractAddress,
  topic: "ItemCanceled(address,address,uint256)",
  sync_historical: true,
  abi: {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ItemCanceled",
    "type": "event"
  },
  tableName: "ItemCanceled",
}
}

main()
  .then(() => [process.exit(0)])
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
