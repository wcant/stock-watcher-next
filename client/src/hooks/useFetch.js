import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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

  return { data, isLoaded, error };
}
