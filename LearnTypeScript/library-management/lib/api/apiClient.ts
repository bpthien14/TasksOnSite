/**
 * API Client chính cho việc giao tiếp với backend
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiClientOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
  rawResponse?: boolean; // Trả về response object thay vì parse JSON
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

const BASE_URL = '/api'; // Sử dụng Next.js API route proxies

export async function apiClient<T = any>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    requireAuth = true,
    rawResponse = false,
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

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // Gửi cookies nếu có
  });

  // Trả về raw response nếu cần
  if (rawResponse) return res as unknown as T;

  // Xử lý lỗi
  if (!res.ok) {
    let errorData: ApiErrorResponse;
    try {
      errorData = await res.json();
    } catch {
      errorData = {
        message: 'Lỗi kết nối đến server',
        status: res.status
      };
    }
    throw new ApiError(
      errorData.message || `Lỗi ${res.status}`,
      res.status,
      errorData.errors
    );
  }

  // Nếu không có nội dung trả về
  if (res.status === 204) return {} as T;
  
  // Parse JSON response
  const data = await res.json();
  return data as T;
}

export default apiClient;