import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralisQuery } from "react-moralis";

export default function Home() {
  const { data: listedNfts, isFetching: fetchinfListedNfts } = useMoralisQuery(
    "ActiveItem",
    (query) => query.limit(10).descending("tokenId")
  );

  return (
    <div className={styles.container}>
      hi
      {/*So what we want is to get the list of all listed nfts show on home page
 But their will be a lot of mappings and if we change it into an array it would be gas expensive as we have to traverse on chain
 So what we do is every time we list an item we fire an event we will,
 index that event offChain and store it in database*/}
      {/*So we will set a server which will listen to the events to be fired
 and will add them to database to query
 So we can use
 1.Moralis - it is centralised is faster etc.
 2.Graph protocol - it is decentralised and store the events in itself
 Check the docs...... */}
      {/* query ActiveItems to get all listed nfts*/}
    </div>
  );
}
