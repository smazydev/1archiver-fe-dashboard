import { create } from 'zustand';
import { api } from '../lib/api';
import { Mailbox } from '../types/api';

interface MailboxState {
    mailboxes: Mailbox[];
    loading: boolean;
    error: string | null;

    fetchMailboxes: () => Promise<void>;
}

export const useMailboxStore = create<MailboxState>((set) => ({
    mailboxes: [],
    loading: false,
    error: null,

    fetchMailboxes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get<Mailbox[]>('/mailboxes');
            if (response.success && response.data) {
                set({ mailboxes: response.data });
            } else {
                set({ error: response.message || 'Failed to fetch mailboxes' });
            }
        } catch (err) {
            set({ error: 'Network error fetching mailboxes' });
        } finally {
            set({ loading: false });
        }
    }
}));
