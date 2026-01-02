import { create } from 'zustand';
import { api } from '../lib/api';
import { RetentionPolicy } from '../types/api';

interface RetentionState {
    policies: RetentionPolicy[];
    loading: boolean;
    error: string | null;

    fetchPolicies: () => Promise<void>;
}

export const useRetentionStore = create<RetentionState>((set) => ({
    policies: [],
    loading: false,
    error: null,

    fetchPolicies: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get<RetentionPolicy[]>('/retention-policies');
            if (response.success && response.data) {
                set({ policies: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch retention policies' });
            }
        } catch (err) {
            set({ error: 'Network error fetching retention policies' });
        } finally {
            set({ loading: false });
        }
    }
}));
