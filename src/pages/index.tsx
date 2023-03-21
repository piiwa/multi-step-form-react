import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Quotation from '@/components/pages/quotation/quotation';

const HomePage: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Front Test</title>
        <meta name="description" content="Web3 App description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Quotation />
    </>
  );
};

export default HomePage;
