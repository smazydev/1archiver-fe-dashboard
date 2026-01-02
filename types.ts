export type UserRole = 'Admin' | 'Compliance Officer' | 'Legal Reviewer' | 'Auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type IntegrationStatus = 'Healthy' | 'Warning' | 'Error' | 'Syncing';

export interface DataSource {
  id: string;
  name: string;
  type: 'Email' | 'Messaging' | 'File' | 'Voice';
  status: IntegrationStatus;
  lastSync: string;
  itemCount: number;
  sizeBytes: number;
}

export interface ComplianceEvent {
  id: string;
  timestamp: string;
  severity: 'Info' | 'Warning' | 'Critical';
  message: string;
  actor: string;
}

export interface LegalHold {
  id: string;
  name: string;
  caseId: string;
  status: 'Active' | 'Released' | 'Pending';
  custodians: number;
  startDate: string;
  createdBy: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  outcome: 'Success' | 'Failure';
  hash: string; // Simulating tamper-evidence
}

export type ViewState = 
  | 'overview' 
  | 'sources' 
  | 'archives' 
  | 'search' 
  | 'holds' 
  | 'retention' 
  | 'audit' 
  | 'rbac' 
  | 'storage' 
  | 'settings';
