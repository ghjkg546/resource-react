// src/fetchUtils.ts

  const BASE_URL = 'http://localhost:8080'; // Replace with your base URL
//  const BASE_URL = 'http://198.46.248.64:8080'; // Re
interface FetchOptions extends RequestInit {
  body?: any;
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcHAiLCJleHAiOjE3MjU1NDIwMzMsIm5iZiI6MTcyNTQ5NzgzMywianRpIjoiOSJ9.j9KU0hDn9oJy9Tj88_rlVHNg43dFptSU22HCp9a_UEg'
export const fetchFromApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
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
      // Perform the POST request
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
