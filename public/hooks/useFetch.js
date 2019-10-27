import { useState, useEffect } from 'react';
import { get, authorizationHeader } from '../libs/http';

export default url => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const result = await get(url, {
          ...authorizationHeader,
        });

        setData(result);
      } catch (e) {
        setError(e);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [url]);

  return [isLoading, data, error];
};
