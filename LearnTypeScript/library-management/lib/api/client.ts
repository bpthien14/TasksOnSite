// API Client cho frontend kết nối backend qua proxy Next.js
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiClientOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    requireAuth = true,
  } = options;

  const fetchHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Thêm token nếu cần
  if (requireAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      fetchHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(endpoint, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Lỗi kết nối API');
  }

  // Nếu không có nội dung trả về
  if (res.status === 204) return {} as T;
  return res.json();
}

// Ví dụ sử dụng:
// const data = await apiClient('/api/dashboard/stats');
// const login = await apiClient('/api/auth/login', { method: 'POST', body: { email, password }, requireAuth: false });
