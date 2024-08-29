import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api'; // Adjust the path as needed

export function useFetchData(queryParams) {
  const [data, setData] = useState(null); // fetched data
  const [error, setError] = useState(null); //error messages

  useEffect(() => { // Hook for data fetching
    const getData = async () => { // fetch data from API
      try {
        const params = { 'city': 'pasadena' }; // query parameters
        const result = await fetchData('626_hangout/events', params); // Use query parameters
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error); //ToDo: Find where this is logging to
        setError(error.message); // Set error message in state
      }
    };
    getData();
  }, []);

  return { data, error };
}