import Head from "next/head";

import withApollo from "~/lib/apollo";
import { useMeQuery } from "~/generated/graphql";
import Layout from "~/components/Layout";

const Index = () => {
  const { data, loading, error } = useMeQuery();

  console.log({ loading, data, error });

  return (
    <Layout>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <h1>{data?.me?.id}</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
