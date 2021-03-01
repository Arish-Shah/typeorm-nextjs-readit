import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useMeQuery } from "../generated/graphql";

const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const history = useHistory();

  useEffect(() => {
    if (!loading && !data?.me) {
      history.replace("/login?next=" + history.location.pathname);
    }
  }, [history, loading, data?.me]);
};

export default useIsAuth;
