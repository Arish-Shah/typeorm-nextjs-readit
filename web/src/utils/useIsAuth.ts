import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useMeQuery } from "../generated/graphql";

export const useIsAuth = (isAuth = true) => {
  const { data, loading } = useMeQuery();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      if (!data?.me) {
        history.replace("/login?next=" + history.location.pathname);
      }
    } else {
      if (data?.me) {
        history.replace("/");
      }
    }
  }, [history, loading, data?.me, isAuth]);
};
