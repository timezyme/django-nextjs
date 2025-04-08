// Add type declaration for fetch
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

const API_URL = 'http://localhost:8000/api' // This is the URL to your Django Ninja backend

export interface Item {
  id: number;
  name: string;
  description: string;
}

// Server-side version - for use in Server Components
export async function fetchItemsServer(): Promise<Item[]> {
  const response = await fetch(`${API_URL}/items`, {
    cache: 'no-store', // Similar to getServerSideProps, fetch on every request
    next: { revalidate: 0 }, // Don't revalidate
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
}

// Client-side version - for use in Client Components
export function fetchItems(): Promise<Item[]> {
  return fetch(`${API_URL}/items`, {
    cache: 'no-store', // Similar to getServerSideProps, fetch on every request
    next: { revalidate: 0 }, // Don't revalidate
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return response.json();
    });
}