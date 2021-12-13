import React from "react";
import axios from "axios";

import { parseLinkHeader } from "../utils/ParserUtils";

import { BASE_URL } from "../utils/ApiUtils";

export function useFetch(url, headers) {
  const { useEffect, useState } = React;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [linkHeaders, setLinkHeaders] = useState([null]);

  const loadData = (url) => {
    if (url?.length > BASE_URL.length) {
      console.log("CargandoDatos", url);
      setLoading(true);
      axios
        .get(url, headers)
        .then((response) => {
          setData(response.data);
          if (response.headers.link) {
            setLinkHeaders(parseLinkHeader(response.headers.link));
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(
    (url) => {
      loadData(url);
    },
    [url]
  );

  const refetch = () => {
    loadData();
  };

  return { data, loading, error, refetch };
}
