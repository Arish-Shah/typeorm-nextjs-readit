import Head from "next/head";

import Layout from "@components/Layout";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <main>
        <h1>Hello World</h1>
      </main>
    </Layout>
  );
};

export default Index;
