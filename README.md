# MercadoNFT
Mercado NFT is a decentralized marketplace that allows users to list, buy, and sell NFTs.This  ensures a secure, transparent, and efficient platform for digital asset transactions. This marketplace uses Pinata to upload NFT images to IPFS and indexes emitted events into a graph database for faster querying, eliminating the need to repeatedly query the blockchain for fetching NFTs.
<br></br>

## Features

- **Decentralized Marketplace**: List, buy, and sell NFTs seamlessly.
- **Pinata Integration**: Upload and store NFT images on IPFS for decentralized and reliable storage.
- **Graph Database Indexing**: Efficiently indexes events into a graph database, providing a faster and more efficient querying system without the need to constantly query the blockchain.
 <br></br>
<br></br>

![Alt text](https://github.com/Smr0303/MercadoNFT/blob/18cb357d4e0351d1a93a802f7aeca8a59c68b42a/Desktop%20-%205.png)





## Tech Stack

### Frontend

- **Next.js**: A React framework for building fast, server-side rendered applications.
- **Web3uikit**: A collection of essential UI components for blockchain applications.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.

### Backend

- **Hardhat**: A development environment to compile, deploy, test, and debug Ethereum software.
- **Pinata**: A service to manage and pin files to IPFS.
- **The Graph**: An indexing protocol for querying blockchain data with GraphQL.

### Update Functionality

  ![ALT](https://github.com/Smr0303/MercadoNFT/blob/d35df6f01747b048ea3b45fa91a8cb68da706bb1/UPDATE.png)
<br></br>  

This application also provides the user , the ability to list his or her listed NFTS.

## Do not try to clone the app and run as several issues have occured . The repository will be updated soon in future

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:

## Cloning the repository
  ```sh
      git clone https://github.com/Smr0303/MercadoNFT.git
  ```
## Deploying the backend first

```sh
    cd backend
    yarn
```

# Deploy Contracts
```
yarn hardhat deploy
```

## Testing
```
yarn hardhat test
```

# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `SEPOLIA_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file
```sh

PRIVATE_KEY
SEPOLIA_RPC_URL
```

2. Get testnet ETH

3. Deploy

```
yarn hardhat deploy --network sepolia
```
# The Deployment of Frontend is within the README of frontend folder
