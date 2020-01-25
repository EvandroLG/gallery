import { useState, useEffect } from 'react';
import { get, authorizationHeader } from '../libs/http';

export default (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<Error | null>(null);

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
