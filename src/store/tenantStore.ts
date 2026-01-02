import { create } from 'zustand';
import { api } from '../lib/api';
import { Tenant } from '../types/api';

interface TenantState {
    tenant: Tenant | null;
    loading: boolean;
    error: string | null;

    fetchTenant: (tenantId: string) => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
    tenant: null,
    loading: false,
    error: null,

    fetchTenant: async (tenantId: string) => {
        set({ loading: true });
        try {
            const response = await api.get<Tenant>(`/tenants/${tenantId}`);
            if (response.success && response.data) {
                set({ tenant: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch tenant' });
            }
        } catch (err) {
            set({ error: 'Network error fetching tenant' });
        } finally {
            set({ loading: false });
        }
    }
}));
