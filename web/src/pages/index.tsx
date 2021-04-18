import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import withApollo from "~/lib/apollo";

const QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const Index = () => {
  const { data, loading } = useQuery(QUERY);

  console.log(data);

  return (
    <main>
      <h1>{data?.me?.id}</h1>
    </main>
  );
};

export default withApollo({ ssr: true })(Index);
