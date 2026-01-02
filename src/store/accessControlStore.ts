import { create } from 'zustand';
import { api } from '../lib/api';
import { User, Role } from '../types/api';

interface AccessControlState {
    users: User[];
    roles: Role[];
    loading: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
    fetchRoles: () => Promise<void>;
    addUser: (user: Partial<User> & { role_id?: string }) => Promise<boolean>;
}

export const useAccessControlStore = create<AccessControlState>((set) => ({
    users: [],
    roles: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true }); // Keep error if any from previous calls? Or reset? Let's not reset error here to allow parallel fetching
        try {
            const response = await api.get<User[]>('/users');
            if (response.success && response.data) {
                set({ users: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch users' });
            }
        } catch (err) {
            set({ error: 'Network error fetching users' });
        } finally {
            set({ loading: false });
        }
    },

    fetchRoles: async () => {
        set({ loading: true });
        try {
            const response = await api.get<Role[]>('/roles');
            if (response.success && response.data) {
                set({ roles: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch roles' });
            }
        } catch (err) {
            set({ error: 'Network error fetching roles' });
        } finally {
            set({ loading: false });
        }
    },

    addUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            // Ensure user_id is generated if not present (though backend expects UUID, frontend usually generates or backend does)
            // Backend expects user_id in body. Let's generate one if missing.
            const payload = {
                ...userData,
                user_id: userData.user_id || crypto.randomUUID(),
                // If role_id is undefined/null, backend handles it.
            };

            const response = await api.post<User>('/users', payload);
            if (response.success && response.data) {
                set((state) => ({
                    users: [...state.users, response.data],
                    error: null
                }));
                return true;
            } else {
                set({ error: response.message || 'Failed to create user' });
                return false;
            }
        } catch (err) {
            set({ error: 'Network error creating user' });
            return false;
        } finally {
            set({ loading: false });
        }
    }
}));
