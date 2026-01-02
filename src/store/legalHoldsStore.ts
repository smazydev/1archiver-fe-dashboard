import { create } from 'zustand';
import { api } from '../lib/api';
import { LegalHold, CreateHoldRequest, ApiResponse } from '../types/api';

interface LegalHoldsState {
    holds: LegalHold[];
    loading: boolean;
    error: string | null;

    fetchHolds: () => Promise<void>;
    createHold: (data: CreateHoldRequest) => Promise<ApiResponse<LegalHold>>;
}

export const useLegalHoldsStore = create<LegalHoldsState>((set) => ({
    holds: [],
    loading: false,
    error: null,

    fetchHolds: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get<LegalHold[]>('/legal-holds');
            if (response.success && response.data) {
                set({ holds: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch legal holds' });
            }
        } catch (err) {
            set({ error: 'Network error fetching legal holds' });
        } finally {
            set({ loading: false });
        }
    },

    createHold: async (data) => {
        try {
            const response = await api.post<LegalHold>('/legal-holds', data);
            if (response.success && response.data) {
                // Optimistically update or refetch
                set((state) => ({ holds: [response.data!, ...state.holds] }));
            }
            return response;
        } catch (err) {
            return { success: false, message: 'Network error creating hold', data: null };
        }
    }
}));
