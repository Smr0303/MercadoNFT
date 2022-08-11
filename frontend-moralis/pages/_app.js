import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/*We can connect by frpc but we will use moralis-admin-cli to connect to localchain */


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nft-Markt</title>
        <meta name="description" content="Nft Market Place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={true} appId={APP_ID} serverUrl={SERVER_URL}>
        <Header />
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
