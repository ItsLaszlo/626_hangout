const API_URL = 'http://localhost:5001'; // Flask API URL

export const fetchData = async (endpoint, params = {}) => {
   const queryString = new URLSearchParams(params).toString(); // manipulate query parameters
   const api_url = `${API_URL}/${endpoint}?${queryString}`

   try {
    const response = await fetch(api_url);
    if (!response.ok) {
      const errorText = await response.text(); // Read error text from response
      throw new Error(`Error ${response.status}: ${errorText}`); // BREAK
    }
    return await response.json();
   } catch (error){
   console.error('Error fetching data:', error);
   throw error;
   }
 };
