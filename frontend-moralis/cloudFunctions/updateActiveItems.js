/*Create new table ActiveItems
add items when listed on marketplace
remove when either cancelled or bought */

/*Moralis is internally injected from server hence we didint import it */
Moralis.Cloud.afterSave("ItemListed", async (request) => {
    const confirmed = request.object.get("confirmed") // transaction is called twice once it is sent and once confirmed
    const logger = Moralis.Cloud.getLogger() //inbuilt logger of moralis
    logger.info("Looking for confirmed TX...")
    /*We want to only update ActiveItem table once item in itemListed get confirmed */
    if (confirmed) {
        logger.info("Found item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        // In case of listing update, search for already listed ActiveItem and delete
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("seller", request.object.get("seller"))
        logger.info(`Marketplace | Query: ${query}`)
        const alreadyListedItem = await query.first()
        console.log(`alreadyListedItem ${JSON.stringify(alreadyListedItem)}`);
        if (alreadyListedItem) {
            logger.info(`Deleting ${alreadyListedItem.id}`)
            await alreadyListedItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get(
                    "address"
                )} since the listing is being updated. `
            )
        }

        // Add new ActiveItem
        /*We are creating a type of schema and the value we are getting from the event emitted */
        const activeItem = new ActiveItem()
        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))
        logger.info(
            `Adding Address: ${request.object.get("address")} TokenId: ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})

/*Any time item bought or cancelled remove from active item */

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("confirmed")
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const logger = Moralis.Cloud.getLogger()
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)
        const canceledItem = await query.first()
        logger.info(`Marketplace | CanceledItem: ${JSON.stringify(canceledItem)}`)
        if (canceledItem) {
            logger.info(`Deleting ${canceledItem.id}`)
            await canceledItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was canceled. `
            )
        } else {
            logger.info(
                `No item canceled with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found.`
            )
        }
    }
})

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed")
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const logger = Moralis.Cloud.getLogger()
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)
        const boughtItem = await query.first()
        logger.info(`Marketplace | boughtItem: ${JSON.stringify(boughtItem)}`)
        if (boughtItem) {
            logger.info(`Deleting boughtItem ${boughtItem.id}`)
            await boughtItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get(
                    "address"
                )} from ActiveItem table since it was bought.`
            )
        } else {
            logger.info(
                `No item bought with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found`
            )
        }
    }
})