import { useEffect, useState } from "react";
import axios from "axios";

export default function useApiRequest(url) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setIsLoaded(true);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
}
