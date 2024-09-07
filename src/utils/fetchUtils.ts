// src/fetchUtils.ts

  // const BASE_URL = 'http://localhost:8080'; // Replace with your base URL
//  const BASE_URL = 'http://198.46.248.64:8080'; // Re
const BASE_URL =import.meta.env.VITE_APP_BASE_API
interface FetchOptions extends RequestInit {
  body?: any;
}

export const fetchFromApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const token = localStorage.getItem("token")?localStorage.getItem("token"):''
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`,
      ...options.headers,
    },
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${response.statusText} - ${errorText}`);
  }

  return response.json() as Promise<T>;
};

export async function postData<T>(url: string, data: object): Promise<T> {
  try {
    const token = localStorage.getItem("token")?localStorage.getItem("token"):''
      const response = await fetch( BASE_URL+url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`,
          },
          body: JSON.stringify(data),
      });

      // Check if the response is okay
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result: T = await response.json();
      return result;
  } catch (error) {
      // Handle any errors
      console.error('Error during POST request:', error);
      return error as Promise<T>;
      // return {
      //     success: false,
      //     message: (error as Error).message,
      // };
  }
}
