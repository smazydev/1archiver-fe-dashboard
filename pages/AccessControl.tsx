import React, { useEffect } from 'react';
import { Users, Shield, Key, Plus, Lock } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { useAccessControlStore } from '../src/store/accessControlStore';

export const AccessControl: React.FC = () => {
   const { users, roles, loading, error, fetchUsers, fetchRoles, addUser } = useAccessControlStore();
   const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
   const [newUser, setNewUser] = React.useState({
      primary_email: '',
      display_name: '',
      role_id: '',
      department: '',
      title: ''
   });

   useEffect(() => {
      fetchUsers();
      fetchRoles();
   }, [fetchUsers, fetchRoles]);

   const handleAddUser = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await addUser({
         ...newUser,
         role_id: newUser.role_id || undefined // Send undefined if empty string to trigger default role logic
      });
      if (success) {
         setIsAddUserModalOpen(false);
         setNewUser({ primary_email: '', display_name: '', role_id: '', department: '', title: '' });
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Access Control (RBAC)</h1>
               <p className="text-slate-500 mt-1 text-sm">Manage user roles, permissions, and authentication policies.</p>
            </div>
            <Button icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddUserModalOpen(true)}>Add User</Button>
         </div>

         {/* Roles Overview */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles?.map((role) => (
               <Card key={role.role_id} className="border-l-4 border-l-slate-900">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="font-bold text-slate-900">{role.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{role.description}</p>
                     </div>
                     <Shield className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                     <Users className="w-4 h-4" />
                     <span>{role.user_count || 0} Active Users</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                     <button className="text-xs font-medium text-blue-700 hover:text-blue-800">Edit Permissions</button>
                  </div>
               </Card>
            ))}
         </div>

         {/* Users Table */}
         <Card title="Active Users">
            <div className="overflow-x-auto">
               {loading ? (
                  <div className="p-6 text-center text-slate-500">Loading users...</div>
               ) : error ? (
                  <div className="p-6 text-center text-rose-500">{error}</div>
               ) : (
                  <table className="w-full text-left text-sm">
                     <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                           <th className="px-6 py-3">User</th>
                           <th className="px-6 py-3">Role</th>
                           <th className="px-6 py-3">Status</th>
                           <th className="px-6 py-3">MFA</th>
                           <th className="px-6 py-3">Last Login</th>
                           <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {users?.map((user) => (
                           <tr key={user.user_id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-3">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-xs">
                                       {user.display_name ? user.display_name.substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                       <div className="font-medium text-slate-900">{user.display_name || 'Unknown'}</div>
                                       <div className="text-xs text-slate-500">{user.primary_email}</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-3">
                                 <Badge variant="neutral">
                                    {roles.find(r => r.role_id === user.role_id)?.name || 'Unknown Role'}
                                 </Badge>
                              </td>
                              <td className="px-6 py-3">
                                 <Badge variant="success">Active</Badge>
                              </td>
                              <td className="px-6 py-3">
                                 {user.mfa_enabled ? (
                                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                                       <Lock className="w-3 h-3" /> Enabled
                                    </span>
                                 ) : (
                                    <span className="text-slate-400 text-xs">Disabled</span>
                                 )}
                              </td>
                              <td className="px-6 py-3 text-slate-500 text-xs">
                                 2 hours ago
                              </td>
                              <td className="px-6 py-3 text-right">
                                 <button className="text-slate-400 hover:text-slate-600">Edit</button>
                              </td>
                           </tr>
                        ))}
                        {users?.length === 0 && (
                           <tr>
                              <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No users found.</td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               )}
            </div>
         </Card>

         {/* Security Policy */}
         <Card title="Security Policy Configuration">
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                     <Key className="w-5 h-5 text-slate-400" />
                     <div>
                        <h4 className="text-sm font-medium text-slate-900">Enforce SSO (SAML 2.0)</h4>
                        <p className="text-xs text-slate-500">Require all users to authenticate via corporate Identity Provider.</p>
                     </div>
                  </div>
                  <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out bg-emerald-500 rounded-full cursor-pointer">
                     <span className="absolute left-5 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all"></span>
                  </div>
               </div>
            </div>
         </Card>

         {/* Add User Modal */}
         {isAddUserModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Add New User</h2>
                  <form onSubmit={handleAddUser} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                        <input
                           type="email"
                           required
                           className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           value={newUser.primary_email}
                           onChange={(e) => setNewUser({ ...newUser, primary_email: e.target.value })}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                        <input
                           type="text"
                           className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           value={newUser.display_name}
                           onChange={(e) => setNewUser({ ...newUser, display_name: e.target.value })}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Role (Optional)</label>
                        <select
                           className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           value={newUser.role_id}
                           onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
                        >
                           <option value="">Select a role (Default: Viewer)</option>
                           {roles.map(role => (
                              <option key={role.role_id} value={role.role_id}>{role.name}</option>
                           ))}
                        </select>
                     </div>
                     <div className="flex justify-end gap-3 mt-6">
                        <button
                           type="button"
                           onClick={() => setIsAddUserModalOpen(false)}
                           className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                        >
                           Create User
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};
