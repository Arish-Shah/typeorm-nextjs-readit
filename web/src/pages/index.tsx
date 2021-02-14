import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data } = useMeQuery();

  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Readit</title>
      </Head>
    </Fragment>
  );
};

export default Index;
