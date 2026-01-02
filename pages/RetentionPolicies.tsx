import React, { useEffect } from 'react';
import { Clock, Shield, AlertCircle, FileText } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { useRetentionStore } from '../src/store/retentionStore';

export const RetentionPolicies: React.FC = () => {
   const { policies, loading, error, fetchPolicies } = useRetentionStore();

   useEffect(() => {
      fetchPolicies();
   }, [fetchPolicies]);

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Retention Policies</h1>
               <p className="text-slate-500 mt-1 text-sm">Define data lifecycle and immutable preservation rules.</p>
            </div>
            <Button icon={<Clock className="w-4 h-4" />}>New Policy</Button>
         </div>

         {/* WORM Compliance Banner */}
         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
               <h4 className="text-sm font-semibold text-blue-900">Global WORM Compliance Mode Enabled</h4>
               <p className="text-xs text-blue-700 mt-1">
                  All retention policies are enforced with Write-Once-Read-Many (WORM) protection.
                  Data cannot be modified or deleted before the retention period expires.
               </p>
            </div>
         </div>

         {loading && <div className="text-center text-slate-500">Loading retention policies...</div>}
         {error && <div className="text-center text-rose-500">{error}</div>}

         <div className="grid grid-cols-1 gap-6">
            {policies?.map((policy) => (
               <Card key={policy.retention_policy_id} className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-100 rounded-lg text-slate-500">
                           <FileText className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-slate-900">{policy.policy_name}</h3>
                              <Badge variant={policy.status === 'active' ? 'success' : 'neutral'}>
                                 {policy.status}
                              </Badge>
                           </div>
                           <p className="text-sm text-slate-500 mt-1">{policy.description}</p>
                           <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                 <Clock className="w-4 h-4" /> {policy.retention_days} Days Retention
                              </span>
                              <span className="flex items-center gap-1">
                                 <Shield className="w-4 h-4" /> {policy.legal_basis}
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 pl-14 md:pl-0">
                        <Button variant="secondary" size="sm">Edit Rules</Button>
                        <Button variant="secondary" size="sm">View Items</Button>
                     </div>
                  </div>
               </Card>
            ))}
            {!loading && policies?.length === 0 && (
               <div className="text-center text-slate-500 py-8">No retention policies found.</div>
            )}
         </div>
      </div>
   );
};
