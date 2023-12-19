

const fetchData = async (url, method, body, token) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch Error:', error.message);
      throw error;
    }
  };
  
  export default fetchData;
  