import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hàm tiện ích để gọi API với token xác thực
interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchAPI(url: string, options: FetchOptions = {}) {
  const { requireAuth = true, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);
  
  // Thêm content-type mặc định nếu chưa có
  if (!headers.has('Content-Type') && !fetchOptions.body) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Thêm token xác thực nếu cần và có sẵn
  if (requireAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers
  });
  
  return response;
}

// Các hàm API cụ thể
export const api = {
  // Dashboard APIs
  dashboard: {
    async getStats() {
      return fetchAPI('http://localhost:4000/api/dashboard/stats');
    },
    async getPopularGenres() {
      return fetchAPI('http://localhost:4000/api/dashboard/popular-genres');
    },
    async getRecentActivities(limit = 10) {
      return fetchAPI(`http://localhost:4000/api/dashboard/recent-activities?limit=${limit}`);
    },
    async getMonthlyCheckouts() {
      return fetchAPI('http://localhost:4000/api/dashboard/monthly-checkouts');
    }
  },
  
  // Auth APIs
  auth: {
    async login(email: string, password: string) {
      return fetchAPI('http://localhost:4000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        requireAuth: false
      });
    },
    async logout() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
  }
}
