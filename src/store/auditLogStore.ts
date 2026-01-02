import { create } from 'zustand';
import { api } from '../lib/api';
import { AuditLog } from '../types/api';

interface AuditLogState {
    logs: AuditLog[];
    loading: boolean;
    error: string | null;

    fetchLogs: () => Promise<void>;
}

export const useAuditLogStore = create<AuditLogState>((set) => ({
    logs: [],
    loading: false,
    error: null,

    fetchLogs: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get<AuditLog[]>('/audit-logs');
            if (response.success && response.data) {
                set({ logs: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch audit logs' });
            }
        } catch (err) {
            set({ error: 'Network error fetching audit logs' });
        } finally {
            set({ loading: false });
        }
    }
}));
