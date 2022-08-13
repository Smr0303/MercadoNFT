import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

/*We use Apollo client to make cache query to graph */

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://api.studio.thegraph.com/query/32697/nft-market/v0.0.1`
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nft-Markt</title>
        <meta name="description" content="Nft Market Place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <Component {...pageProps} />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
