import { ApiResponse } from '../types/api';

const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api/v1';

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedCallback = (callback: () => void) => {
    onUnauthorized = callback;
};

class ApiClient {
    private async request<T>(
        endpoint: string,
        method: string,
        body?: any
    ): Promise<ApiResponse<T>> {
        // Read token from Zustand persisted storage
        let token: string | null = null;
        try {
            const storage = localStorage.getItem('auth-storage');
            if (storage) {
                const parsed = JSON.parse(storage);
                token = parsed.state?.token || null;
            }
        } catch (e) {
            console.error('Failed to read auth token', e);
        }

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (response.status === 401) {
                // Handle unauthorized access via callback
                if (onUnauthorized) {
                    onUnauthorized();
                }
                // Also redirect as fallback
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                throw new Error('Unauthorized');
            }

            const data: ApiResponse<T> = await response.json();
            return data;
        } catch (error) {
            console.error(`API Error [${method} ${endpoint}]:`, error);
            throw error;
        }
    }

    public get<T>(endpoint: string) {
        return this.request<T>(endpoint, 'GET');
    }

    public post<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, 'POST', body);
    }

    public put<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, 'PUT', body);
    }

    public delete<T>(endpoint: string) {
        return this.request<T>(endpoint, 'DELETE');
    }
}

export const api = new ApiClient();
