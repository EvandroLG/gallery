import { useState, useEffect } from 'react';
import { authorizationHeader } from '../libs/http';

export default (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const httpPost = async () => {
      setIsLoading(true);

      try {
        const result = await window.fetch(url, {
          method: 'POST',
          headers: { ...authorizationHeader },
          body: data,
        });

        setResponse(result);
      } catch (e) {
        setError(e);
      }
    };

    httpPost();
  }, [setData]);

  return [setData, isLoading, response, error];
};
