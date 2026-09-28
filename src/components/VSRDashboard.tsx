import React, { useState } from 'react';
import { AuthUser } from '../types';
import { VSRPlatformShell } from './VSRPlatformShell';
import { VsrGeoClockInOut } from './VsrGeoClockInOut';
import { VsrRouteChecklist } from './VsrRouteChecklist';
import { VsrWeeklyReportForm } from './VsrWeeklyReportForm';
import { VsrLoanRepaymentPortal } from './VsrLoanRepaymentPortal';
import { VsrAlertsInbox } from './VsrAlertsInbox';
import { Users, Search, ChevronDown, CheckCircle2 } from 'lucide-react';

interface VSRDashboardProps {
  user: AuthUser;
  onSignOut: () => void;
  onSwitchToSuperAdmin?: () => void;
}

const CREW_RECORDS = [
  { id: 'KEA-VSR-041', name: 'Ruth Eze', assistant: 'Chinedu Okafor', hub: 'Lagos', territory: 'Island Core', route: 'Mile 2 - Eko Atlantic (LG-IS-04)', status: 'En Route', phone: '+234 803 111 2233' },
  { id: 'KEA-VSR-042', name: 'Folashade Alabi', assistant: 'Mariam Bello', hub: 'Lagos', territory: 'Trade Fair Corridor', route: 'Ikeja - Alaba (LG-TF-12)', status: 'Active Shift', phone: '+234 802 444 5566' },
  { id: 'KEA-VSR-043', name: 'Akinfolarin Dada', assistant: 'Tosin Adeyemi', hub: 'Ibadan', territory: 'Bodija Cluster', route: 'Bodija - Mokola (IB-BD-07)', status: 'Completed', phone: '+234 805 333 4455' },
  { id: 'KEA-VSR-044', name: 'Emeka Nwosu', assistant: 'Bisi Adebayo', hub: 'Ogun', territory: 'Abeokuta Trade', route: 'Abeokuta - Sagamu (OG-AS-03)', status: 'En Route', phone: '+234 807 888 9900' },
  { id: 'KEA-VSR-045', name: 'Grace Omoregie', assistant: 'Peter Igbinovia', hub: 'Benin', territory: 'Central Benin', route: 'Ring Road - Airport (BN-OR-02)', status: 'Active Shift', phone: '+234 809 123 7890' }
];

export const VSRDashboard: React.FC<VSRDashboardProps> = ({ 
  user, 
  onSignOut,
  onSwitchToSuperAdmin 
}) => {
  const [activeSection, setActiveSection] = useState<string>('geo-clockin');
  const [hubFilter, setHubFilter] = useState('All Hubs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrew = CREW_RECORDS.filter((c) => {
    const matchesHub = hubFilter === 'All Hubs' || c.hub === hubFilter;
    const matchesQuery = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHub && matchesQuery;
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'geo-clockin':
        return <VsrGeoClockInOut user={user} />;
      case 'route-checklist':
        return <VsrRouteChecklist user={user} />;
      case 'weekly-reports':
        return <VsrWeeklyReportForm user={user} />;
      case 'loan-repayment':
        return <VsrLoanRepaymentPortal user={user} />;
      case 'inbox-alerts':
        return <VsrAlertsInbox user={user} />;
      case 'crew-directory':
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Field Reps &amp; Van Crew Directory</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Operational directory of all active field representatives and assigned assistants.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search VSR name or code..."
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">VSR Code</th>
                      <th className="px-4 py-3">Representative Name</th>
                      <th className="px-4 py-3">Assistant Paired</th>
                      <th className="px-4 py-3">Hub &amp; Territory</th>
                      <th className="px-4 py-3">Assigned Route</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCrew.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">{c.id}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{c.name}</td>
                        <td className="px-4 py-3 text-slate-600">{c.assistant}</td>
                        <td className="px-4 py-3 text-slate-600">{c.hub} • {c.territory}</td>
                        <td className="px-4 py-3 font-mono text-slate-600">{c.route}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <VSRPlatformShell
      user={user}
      onSignOut={onSignOut}
      activeSection={activeSection}
      onNavigate={setActiveSection}
      onHubChange={setHubFilter}
      onSwitchToSuperAdmin={onSwitchToSuperAdmin}
    >
      <div className="min-h-screen bg-[#f8fafc] text-slate-800">
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8 space-y-6">
          {renderContent()}
        </main>
      </div>
    </VSRPlatformShell>
  );
};
