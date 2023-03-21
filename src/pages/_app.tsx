import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from 'next/head';
import Layout from '@/components/templates/template';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
