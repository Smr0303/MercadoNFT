# MercadoNFT
![Alt text](https://github.com/Smr0303/MercadoNFT/blob/18cb357d4e0351d1a93a802f7aeca8a59c68b42a/Desktop%20-%205.png)


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
