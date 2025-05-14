import apiClient from './apiClient';

export interface User {
  _id: string;
  username: string;
  role: string;
  status: string;
  lastLogin?: Date;
  staffInfo?: any;
  memberInfo?: any;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  /**
   * Đăng nhập vào hệ thống
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient<LoginResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
      requireAuth: false
    });
  },

  /**
   * Đăng xuất khỏi hệ thống
   */
  logout: async (): Promise<{ message: string }> => {
    const result = await apiClient<{ message: string }>('/auth/logout', {
      method: 'POST'
    });
    // Xóa token khỏi localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    return result;
  },

  /**
   * Lấy thông tin người dùng hiện tại
   */
  getProfile: async (): Promise<{ user: User }> => {
    return apiClient('/auth/profile');
  },

  /**
   * Kiểm tra xem người dùng đã đăng nhập chưa
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    return !!token;
  }
};

export default authService;
