export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface Tenant {
  tenant_id: string;
  deployment_type: string;
  name: string | null;
  created_at: string;
}

export interface Role {
  role_id: string;
  tenant_id: string;
  allowed_modules: string; // JSON string
  name: string | null;
  description: string | null;
  user_count: number | null;
  created_at: string;
}

export interface User {
  user_id: string;
  tenant_id: string;
  external_user_id: string | null;
  external_provider: string | null;
  primary_email: string;
  display_name: string | null;
  department: string | null;
  title: string | null;
  manager_external_id: string | null;
  account_status: string;
  role_id: string;
  is_service_account: boolean;
  mfa_enabled: boolean | null;
  last_synced_at: string | null;
  created_at: string;
}

export interface Mailbox {
  mailbox_id: string;
  tenant_id: string;
  source_type: string;
  external_mailbox_id: string;
  email_address: string;
  created_at: string;
}

export interface RetentionPolicy {
  retention_policy_id: string;
  tenant_id: string;
  retention_days: number;
  policy_name: string | null;
  description: string | null;
  legal_basis: string;
  status: string;
  created_at: string;
}

export interface LegalHold {
  legal_hold_id: string;
  tenant_id: string;
  reason: string;
  case_number: string | null;
  created_by_user_id: string;
  status: string;
  custodian_count: number | null;
  created_at: string;
}

export interface SavedSearch {
  saved_search_id: string;
  tenant_id: string;
  created_by_user_id: string;
  tantivy_query_json: string;
  created_at: string;
}

export interface ArchivedMessage {
  message_id: string;
  tenant_id: string;
  mailbox_id: string;
  indexed_at: string;
  retention_expiry_ts: string | null;
  created_at: string;
}

export interface AuditLog {
  audit_log_id: string;
  tenant_id: string;
  actor_user_id: string;
  action: string;
  target_type: string;
  target_id: string;
  timestamp: string;
  metadata: string;
  outcome: string | null;
  hash: string | null;
}

export interface SearchResultItem {
  message_id: string;
  created_at: string;
  source_type: string;
  sender: string;
  recipients: Vec<string>;
  subject: string;
  content_snippet: string;
  policy_name: string | null;
}

// Helper type for Vec<T> which is just T[] in TS
type Vec<T> = T[];

export interface SearchResponse {
  total_hits: number;
  took_ms: number;
  hits: SearchResultItem[];
}

// Request Models
export interface SearchRequest {
  query: string;
  filters?: {
    date_from?: string;
    date_to?: string;
    custodian?: string;
    source_type?: string;
  };
  page?: number;
  page_size?: number;
}

export interface CreateHoldRequest {
  reason: string;
  case_number?: string;
  custodian_ids?: string[];
}

export interface LoginRequest {
  email: string;
  password?: string; // Optional if using SSO flow later, but usually required for direct auth
  tenant_id?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expires_at: string;
}
