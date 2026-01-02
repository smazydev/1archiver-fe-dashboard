import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, setUnauthorizedCallback } from '../lib/api';
import { LoginRequest, LoginResponse, User } from '../types/api';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;

    setToken: (token: string | null) => void;
    login: (credentials: LoginRequest) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,

            setToken: (token) => {
                if (token) {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        set({ token, isAuthenticated: true, user: payload }); // Fallback if user obj not provided
                    } catch (e) {
                        console.error("Invalid token", e);
                        set({ token: null, isAuthenticated: false, user: null });
                    }
                } else {
                    set({ token: null, isAuthenticated: false, user: null });
                }
            },

            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const response = await api.post<LoginResponse>('/auth/login', credentials);
                    if (response.success && response.data) {
                        set({
                            token: response.data.token,
                            isAuthenticated: true,
                            user: response.data.user,
                            error: null
                        });
                        return true;
                    } else {
                        set({ error: response.message || 'Login failed' });
                        return false;
                    }
                } catch (err) {
                    set({ error: 'Network error during login' });
                    return false;
                } finally {
                    set({ loading: false });
                }
            },

            logout: () => set({ token: null, isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

// Register callback to handle 401s from API
setUnauthorizedCallback(() => {
    useAuthStore.getState().logout();
});
