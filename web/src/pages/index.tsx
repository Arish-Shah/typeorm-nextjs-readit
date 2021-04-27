import Head from "next/head";

import { MeDocument, useFeedQuery } from "~/generated/graphql";
import Layout from "~/components/Layout";
import { GetServerSideProps } from "next";
import { initializeApollo } from "~/lib/apollo";

const Index = () => {
  const { data, loading } = useFeedQuery({
    variables: {
      input: {
        take: 10,
      },
    },
  });

  return (
    <Layout>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: MeDocument,
  });

  return {
    props: {
      initializeApollo: apolloClient.cache.extract(),
    },
  };
};

export default Index;
