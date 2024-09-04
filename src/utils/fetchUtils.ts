// src/fetchUtils.ts

//  const BASE_URL = 'http://localhost:8080'; // Replace with your base URL
 const BASE_URL = 'http://198.46.248.64:8080'; // Re
interface FetchOptions extends RequestInit {
  body?: any;
}

export const fetchFromApi = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${response.statusText} - ${errorText}`);
  }

  return response.json() as Promise<T>;
};
