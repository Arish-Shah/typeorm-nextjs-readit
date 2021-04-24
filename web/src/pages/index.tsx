import Head from "next/head";

import withApollo from "~/lib/apollo";
import { useFeedQuery } from "~/generated/graphql";
import Layout from "~/components/Layout";

const Index = () => {
  const { data, loading } = useFeedQuery({
    variables: {
      input: {
        take: 10,
      },
    },
  });

  console.log(data);

  return (
    <Layout>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
