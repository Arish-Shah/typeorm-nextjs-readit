import withApollo from "~/lib/apollo";
import { useMeQuery } from "~/generated/graphql";

const Index = () => {
  const { data, loading, error } = useMeQuery();

  console.log({ loading, data, error });

  return (
    <main>
      <h1>{data?.me?.id}</h1>
    </main>
  );
};

export default withApollo({ ssr: true })(Index);
