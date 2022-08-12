const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const basicNftTwo = await deploy("BasicNftTwo", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
        // await verify(basicNftTwo.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "basicnft"]

/*deploying "BasicNft" (tx: 0x4e899b57fa7d0ef3645cd9e090e1a08972031ff3255a45881752542539fecdc7)...: deployed at 0x0506Ca03E936C16d41E6ADD4A9CDd333006Ec2B7 with 2071478 gas
deploying "BasicNftTwo" (tx: 0x538400c8fca3805d40222f818d403b823e03407f23d4b91214033ba2188a759f)...: deployed at 0xa692B1dc408B6fe398fdEd39e93BBC31CebBc597 with 2064151 gas*/