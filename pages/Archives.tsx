import React, { useEffect } from 'react';
import { Filter, Download, Archive as ArchiveIcon, Lock, FileDigit, Mail, MessageSquare } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { useMailboxStore } from '../src/store/mailboxStore';

export const Archives: React.FC = () => {
  const { mailboxes, loading, error, fetchMailboxes } = useMailboxStore();

  useEffect(() => {
    fetchMailboxes();
  }, [fetchMailboxes]);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
      case 'exchange':
      case 'google_workspace': return <Mail className="w-4 h-4" />;
      case 'messaging':
      case 'slack': return <MessageSquare className="w-4 h-4" />;
      case 'file': return <FileDigit className="w-4 h-4" />;
      default: return <ArchiveIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Archives Explorer</h1>
          <p className="text-slate-500 mt-1 text-sm">Browse and manage immutable data sets stored in the vault.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>Filter</Button>
          <Button icon={<Download className="w-4 h-4" />}>Export Manifest</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading archives...</div>
          ) : error ? (
            <div className="p-6 text-center text-rose-500">{error}</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Dataset Name</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Date Range</th>
                  <th className="px-6 py-4">Item Count</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Retention</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mailboxes?.map((item) => (
                  <tr key={item.mailbox_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded text-slate-500">
                          {getIcon(item.source_type)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{item.email_address}</div>
                          <div className="text-xs text-slate-500 font-mono">{item.mailbox_id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700 capitalize">{item.source_type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString()} - Now
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">-</td>
                    <td className="px-6 py-4 font-mono text-slate-600">-</td>
                    <td className="px-6 py-4">
                      <Badge variant="neutral">Default</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-xs">Standard</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Details</button>
                    </td>
                  </tr>
                ))}
                {mailboxes?.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-slate-500">No archives found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};
