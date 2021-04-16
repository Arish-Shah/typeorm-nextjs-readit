import { GetServerSideProps } from "next";
import { initializeApollo } from "~/apollo/client";
import { context } from "~/apollo/context";
import { MeDocument, useMeQuery } from "~/generated/frontend";

const Index = () => {
  const {
    data: {
      me: { username },
    },
  } = useMeQuery();

  return (
    <main>
      <h1>{username}</h1>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await context(ctx);

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: MeDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Index;
