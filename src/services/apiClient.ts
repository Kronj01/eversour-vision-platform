
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { supabase } from '@/integrations/supabase/client';

// Backend API configuration - Update these URLs when you deploy your Python/FastAPI backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-api.herokuapp.com/api/v1'  // Replace with your production backend URL
  : 'http://localhost:8000/api/v1';  // Local FastAPI development server

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,  // Reduced timeout for development
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
          }
        } catch (error) {
          console.warn('Failed to get session for API request:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // More detailed error handling for development
        if (error.code === 'ECONNREFUSED') {
          console.error('Backend connection refused. Make sure your Python/FastAPI server is running on port 8000');
          throw new Error('Backend server not available. Please start your Python/FastAPI server.');
        }
        
        if (error.response?.status === 404) {
          console.error('API endpoint not found:', error.config?.url);
          throw new Error('API endpoint not found. Check your backend implementation.');
        }
        
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || error.message || 'An error occurred');
      }
    );
  }

  // Generic API methods with better error handling
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.patch(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${url} failed:`, error);
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  // Upload file method
  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error(`File upload to ${url} failed:`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
