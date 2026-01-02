import React from 'react';
import { HardDrive, Server, Activity, Database, AlertCircle } from 'lucide-react';
import { Card, StatCard, Badge } from '../components/UI';

export const Storage: React.FC = () => {
  const nodes = [
    { id: 'NODE-01', ip: '10.0.4.101', role: 'Master / Index', status: 'Online', load: '45%', disk: '62%' },
    { id: 'NODE-02', ip: '10.0.4.102', role: 'Data Node', status: 'Online', load: '32%', disk: '78%' },
    { id: 'NODE-03', ip: '10.0.4.103', role: 'Data Node', status: 'Online', load: '28%', disk: '71%' },
    { id: 'NODE-04', ip: '10.0.4.104', role: 'Ingest Worker', status: 'Warning', load: '89%', disk: '12%' },
    { id: 'NODE-05', ip: '10.0.4.105', role: 'Cold Storage', status: 'Online', load: '5%', disk: '91%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Storage & Infrastructure</h1>
        <p className="text-slate-500 mt-1 text-sm">Cluster health, storage capacity, and node telemetry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Storage" value="850 TB" icon={<HardDrive className="w-5 h-5" />} />
        <StatCard label="Used Capacity" value="450.2 TB" trend="52.9% Used" trendUp={false} icon={<Database className="w-5 h-5" />} />
        <StatCard label="Cluster Nodes" value="12" trend="1 Warning" trendUp={false} icon={<Server className="w-5 h-5" />} />
        <StatCard label="Index Health" value="Green" trend="45ms Latency" trendUp={true} icon={<Activity className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Storage Visualization */}
         <Card title="Volume Usage (ZFS Pool)" className="lg:col-span-1">
            <div className="space-y-6 py-2">
               <div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Hot Tier (NVMe)</span>
                     <span className="text-slate-500">12TB / 20TB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                     <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Warm Tier (SSD)</span>
                     <span className="text-slate-500">84TB / 120TB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                     <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Cold Tier (HDD/Object)</span>
                     <span className="text-slate-500">354TB / 710TB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                     <div className="bg-slate-500 h-2.5 rounded-full" style={{ width: '49%' }}></div>
                  </div>
               </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100">
               <div className="flex items-start gap-2 text-sm text-slate-600">
                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p>Dedup Ratio: 3.2x. Compression: LZ4 enabled. Next capacity planning trigger predicted in 14 months.</p>
               </div>
            </div>
         </Card>

         {/* Node List */}
         <Card title="Node Status" className="lg:col-span-2">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                     <th className="px-4 py-3">Node ID</th>
                     <th className="px-4 py-3">Role</th>
                     <th className="px-4 py-3">Status</th>
                     <th className="px-4 py-3">CPU Load</th>
                     <th className="px-4 py-3">Disk Usage</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {nodes.map(node => (
                     <tr key={node.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-slate-600">{node.id} <span className="text-slate-400 text-xs ml-1">({node.ip})</span></td>
                        <td className="px-4 py-3">{node.role}</td>
                        <td className="px-4 py-3">
                           <Badge variant={node.status === 'Online' ? 'success' : 'warning'}>{node.status}</Badge>
                        </td>
                        <td className="px-4 py-3 font-mono">{node.load}</td>
                        <td className="px-4 py-3 font-mono">{node.disk}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </Card>
      </div>
    </div>
  );
};
