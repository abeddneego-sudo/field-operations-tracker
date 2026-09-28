import React, { ReactNode, useState } from 'react';
import { 
  MapPin, 
  Truck, 
  FileText, 
  CreditCard, 
  Bell, 
  Users, 
  Menu, 
  X, 
  ArrowLeftRight,
  ShieldCheck
} from 'lucide-react';
import { AuthUser } from '../types';

interface VSRPlatformShellProps {
  user: AuthUser;
  onSignOut: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onHubChange: (hub: string) => void;
  onSwitchToSuperAdmin?: () => void;
  children: ReactNode;
}

const navigation = [
  { id: 'geo-clockin', label: 'GPS Shift Attendance', icon: MapPin },
  { id: 'route-checklist', label: 'Daily Route Outlets', icon: Truck },
  { id: 'weekly-reports', label: 'Weekly Performance', icon: FileText },
  { id: 'loan-repayment', label: 'Float & Loan Ledger', icon: CreditCard },
  { id: 'inbox-alerts', label: 'Alerts & Messaging', icon: Bell },
  { id: 'crew-directory', label: 'Field Staff Directory', icon: Users }
];

export const VSRPlatformShell: React.FC<VSRPlatformShellProps> = ({ 
  user, 
  onSignOut, 
  activeSection, 
  onNavigate, 
  onHubChange,
  onSwitchToSuperAdmin,
  children 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState('All Hubs');
  const [syncSeconds, setSyncSeconds] = useState(6);

  React.useEffect(() => {
    const timer = window.setInterval(() => setSyncSeconds((seconds) => (seconds >= 60 ? 1 : seconds + 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isFieldVsr = user.role === 'VSR' || user.role === 'ASSISTANT_VSR';

  const sidebar = (
    <div className="flex h-full flex-col justify-between bg-white text-slate-700">
      <div>
        {/* Brand Area */}
        <div className="flex items-center justify-between border-b border-slate-200/80 p-4">
          <div className="flex items-center">
            <img alt="KEA Corporate Hospitality Services" className="h-10 w-auto object-contain" src="/kea-logo.png" />
          </div>
          {mobileOpen && (
            <button onClick={() => setMobileOpen(false)} className="rounded p-1 text-slate-400 hover:text-slate-700 md:hidden" title="Close menu">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Live Signal */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">Field Portal</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-emerald-700">VSR Live GPS</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 p-3">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { onNavigate(id); setMobileOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                activeSection === id
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-xs'
                  : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={16} className={activeSection === id ? 'text-emerald-700' : 'text-slate-400'} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div>
        {/* Switch Platform Helper */}
        {onSwitchToSuperAdmin && (
          <div className="px-3 mb-2">
            <button
              onClick={onSwitchToSuperAdmin}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeftRight size={13} className="text-emerald-400" />
              <span>Return to Super Admin</span>
            </button>
          </div>
        )}

        {/* User Card */}
        <div className="mx-3 mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold text-white shadow-xs" style={{ backgroundColor: user.avatarColor || '#10b981' }}>
              {user.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-slate-900">{user.name}</div>
              <div className="truncate font-mono text-[10px] text-emerald-700 font-bold">
                {user.staffCode || 'KEA-VSR-041'}
              </div>
            </div>
          </div>
          <button onClick={onSignOut} className="shrink-0 rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 shadow-xs cursor-pointer" title="Sign out">
            <span className="text-xs">↪</span>
          </button>
        </div>

        {/* Database Sync */}
        <div className="border-t border-slate-100 bg-slate-50/70 p-3.5 text-xs">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-600">
            <span>DATABASE SYNC</span>
            <span className="text-emerald-700 font-mono font-bold">ONLINE (TLS 1.3)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="text-emerald-600">↻</span>
            <span className="truncate">Active Telemetry • Synced {syncSeconds}s ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] text-slate-800">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200/90 bg-white md:flex md:flex-col shadow-[0_2px_8px_rgba(0,0,0,0.03)]">{sidebar}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex h-full w-64 max-w-[85vw] flex-col border-r border-slate-200 bg-white">{sidebar}</aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
              <button onClick={() => setMobileOpen(true)} className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 md:hidden" title="Open menu">
                <Menu size={16} />
              </button>
              {['All Hubs', 'Lagos', 'Ibadan', 'Ogun', 'Benin'].map((hub) => (
                <button
                  key={hub}
                  onClick={() => { setSelectedHub(hub); onHubChange(hub); }}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedHub === hub
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {hub === 'All Hubs' ? 'All Regional Hubs' : `${hub} Hub`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {onSwitchToSuperAdmin && (
                <button
                  onClick={onSwitchToSuperAdmin}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeftRight size={13} />
                  <span>Switch to Super Admin</span>
                </button>
              )}

              <div className="relative flex items-center gap-2 border-l border-slate-200 pl-3">
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="max-w-[170px] truncate text-[10px] font-mono font-medium text-emerald-700">
                    {user.roleTitle || 'Van Sales Representative'}
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 font-mono text-xs font-bold text-white shadow-xs" style={{ backgroundColor: user.avatarColor || '#10b981' }}>
                  {user.initials}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-slate-50/70 px-4 py-2 text-xs lg:px-6">
            <span className="flex items-center gap-2 text-emerald-700 font-semibold text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              VAN GPS TELEMETRY ACTIVE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">Van: KEA-VN-08</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Territory: {user.assignedRegion}</span>
            <span className="ml-auto hidden text-slate-500 sm:block font-mono text-[11px]">
              VSR ID: {user.staffCode || 'KEA-VSR-041'}
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};
