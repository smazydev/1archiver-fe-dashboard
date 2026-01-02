import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import {
    LegalHold,
    RetentionPolicy,
    AuditLog,
    User,
    Role,
    Mailbox,
    SearchResponse,
    SearchRequest,
    CreateHoldRequest,
    ApiResponse
} from '../types/api';

export const createLegalHold = async (data: CreateHoldRequest): Promise<ApiResponse<LegalHold>> => {
    try {
        return await api.post<LegalHold>('/legal-holds', data);
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create legal hold',
            data: null
        };
    }
};

interface UseDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

function useData<T>(endpoint: string, initialData: T | null = null): UseDataResult<T> {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get<T>(endpoint);
            if (response.success && response.data) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Network error or server unavailable');
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export const useLegalHolds = () => useData<LegalHold[]>('/legal-holds');
export const useRetentionPolicies = () => useData<RetentionPolicy[]>('/retention-policies');
export const useAuditLogs = () => useData<AuditLog[]>('/audit-logs');
export const useUsers = () => useData<User[]>('/users');
export const useRoles = () => useData<Role[]>('/roles');
export const useMailboxes = () => useData<Mailbox[]>('/mailboxes');

export const useSearch = () => {
    const [results, setResults] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (query: string, filters?: SearchRequest['filters'], page: number = 1, page_size: number = 20) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<SearchResponse>('/search', { query, filters, page, page_size });
            if (response.success && response.data) {
                setResults(response.data);
            } else {
                setError(response.message || 'Search failed');
            }
        } catch (err) {
            setError('Network error during search');
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, search };
};
