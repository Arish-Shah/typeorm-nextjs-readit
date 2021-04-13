import { MeDocument, useMeQuery } from "@generated/codegen";
import { initializeApollo } from "@graphql/client";

const Navbar = () => {
  const { data } = useMeQuery();

  return <nav>{data?.me && <h1>{data.me.id}</h1>}</nav>;
};

export const getServerSideProps = async () => {
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

export default Navbar;
