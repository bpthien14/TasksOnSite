// lib/api/api-client.js
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API endpoints
export const api = {
  players: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return fetchAPI(`/players${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => fetchAPI(`/players/${id}`),
    getStats: (id) => fetchAPI(`/players/${id}/stats`),
  },
  
  matches: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return fetchAPI(`/matches${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => fetchAPI(`/matches/${id}`),
    getByPlayer: (playerId) => fetchAPI(`/matches?player=${playerId}`),
  },
  
  seasons: {
    getAll: () => fetchAPI('/seasons'),
    getCurrent: () => fetchAPI('/seasons/active'),
  }
};