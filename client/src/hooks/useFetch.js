import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url, options = {}, dependencies = []) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [url]);

  async function refetch() {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
    }
  }

  return { data, isLoaded, error, refetch };
}
