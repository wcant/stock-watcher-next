import { useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch(url, options = {}, dependencies = []) {
  const { debounce, debounceDelay } = options;

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoaded(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  async function refetch() {
    try {
      setIsLoaded(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  }

  return { data, isLoaded, error, refetch };
}
