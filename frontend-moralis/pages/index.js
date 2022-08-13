import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { useMoralisQuery ,useMoralis} from "react-moralis";
import NFTBox from "../components/Nft-Box";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)
  
  {
    /*So what we want is to get the list of all listed nfts show on home page
But their will be a lot of mappings and if we change it into an array it would be gas expensive as we have to traverse on chain
So what we do is every time we list an item we fire an event we will,
index that event offChain and store it in database*/
  }
  {
    /*So we will set a server which will listen to the events to be fired
and will add them to database to query
So we can use
1.Moralis - it is centralised is faster etc.
2.Graph protocol - it is decentralised and store the events in itself
Check the docs...... */
  }
  {
    /* query ActiveItems to get all listed nfts*/
  }
  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              console.log(nft.attributes);
              const { price, nftAddress, tokenId, seller } =nft;
              return (
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              );
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
    </div>
  );
}
