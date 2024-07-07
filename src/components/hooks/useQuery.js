import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

const useQuery = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: '',
  });

  const fetchData = useCallback(() => {
    setState((s) => ({ ...s, isLoading: true }));

    axios.get(url)
      .then((response) => {
        setState((s) => ({
          ...s,
          data: response.data,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: '',
        }));
      })
      .catch((err) => {
        setState((s) => ({
          ...s,
          data: null,
          isLoading: false,
          isError: true,
          error: err.message || 'Failed to fetch',
        }));
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

export default useQuery;
