import React, { useState, useEffect } from 'react';
import { Plus, Gavel, Users, Calendar, AlertTriangle, FileText, X } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { useLegalHoldsStore } from '../src/store/legalHoldsStore';

export const LegalHolds: React.FC = () => {
  const { holds, loading, error, fetchHolds, createHold } = useLegalHoldsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchHolds();
  }, [fetchHolds]);

  const handleCreate = async () => {
    if (!reason) return;
    setIsCreating(true);
    const res = await createHold({ reason, case_number: caseNumber });
    setIsCreating(false);
    if (res.success) {
      setIsModalOpen(false);
      setReason('');
      setCaseNumber('');
      // No need to refetch manually if store updates optimistically or re-fetches internally
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Legal Holds</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage preservation orders and custodian scopes.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>Create New Hold</Button>
      </div>

      {loading && <div className="text-center text-slate-500">Loading legal holds...</div>}
      {error && <div className="text-center text-rose-500">{error}</div>}

      <div className="grid grid-cols-1 gap-6">
        {holds?.map((hold) => (
          <Card key={hold.legal_hold_id} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${hold.status === 'active' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Gavel className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">{hold.reason}</h3>
                    <Badge variant={hold.status === 'active' ? 'error' : 'neutral'}>{hold.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {hold.case_number || 'N/A'}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {hold.custodian_count || 0} Custodians</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Started {new Date(hold.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-14 md:pl-0">
                <Button variant="secondary" size="sm">Edit Scope</Button>
                <Button variant="secondary" size="sm">Audit Log</Button>
                {hold.status === 'active' && (
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">Release Hold</Button>
                )}
              </div>
            </div>

            {hold.status === 'active' && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-amber-600 bg-amber-50/50 p-2 rounded">
                <AlertTriangle className="w-4 h-4" />
                <span>Data under this hold cannot be deleted, even if retention policy expires.</span>
              </div>
            )}
          </Card>
        ))}
        {!loading && holds?.length === 0 && (
          <div className="text-center text-slate-500 py-8">No legal holds found.</div>
        )}
      </div>

      {/* Create Hold Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Create New Legal Hold</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Name</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="e.g. Litigation Hold: Case 123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Case Number (Optional)</label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="e.g. CASE-2023-001"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={!reason || isCreating}>
                  {isCreating ? 'Creating...' : 'Create Hold'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
