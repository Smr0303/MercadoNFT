import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL


function MyApp({ Component, pageProps }) {
  return (
    <>
    {console.log(APP_ID + " is available on " + SERVER_URL)}
      <Head>
        <title>Nft-Markt</title>
        <meta name="description" content="Nft Market Place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={true} appId="ZzLfAlSeHiArUxv3dscU5eye6ymV37OjnGq109yK" serverUrl="https://ij22o2kwus0l.usemoralis.com:2053/server">
        <Header />
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
