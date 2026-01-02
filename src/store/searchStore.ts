import { create } from 'zustand';
import { api } from '../lib/api';
import { SearchResponse, SearchRequest } from '../types/api';

interface SearchState {
    query: string;
    filters: SearchRequest['filters'];
    results: SearchResponse | null;
    loading: boolean;
    error: string | null;

    setQuery: (query: string) => void;
    setFilters: (filters: SearchRequest['filters']) => void;
    executeSearch: (page?: number, pageSize?: number) => Promise<void>;
    reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
    query: '',
    filters: {},
    results: null,
    loading: false,
    error: null,

    setQuery: (query) => set({ query }),
    setFilters: (filters) => set({ filters }),

    executeSearch: async (page = 1, pageSize = 20) => {
        const { query, filters } = get();
        set({ loading: true, error: null });
        try {
            const response = await api.post<SearchResponse>('/search', {
                query: query || "*",
                filters,
                page,
                page_size: pageSize
            });

            if (response.success && response.data) {
                set({ results: response.data });
            } else {
                set({ error: response.message || 'Search failed' });
            }
        } catch (err) {
            set({ error: 'Network error during search' });
        } finally {
            set({ loading: false });
        }
    },

    reset: () => set({ query: '', filters: {}, results: null, error: null })
}));
