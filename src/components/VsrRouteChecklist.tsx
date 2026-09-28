import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Store, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { AuthUser } from '../types';

interface VsrRouteChecklistProps {
  user: AuthUser;
}

interface OutletItem {
  id: string;
  name: string;
  category: string;
  address: string;
  contactName: string;
  phone: string;
  expectedOrder: string;
  status: 'completed' | 'next' | 'pending';
  checkInTime?: string;
  volumeSold?: string;
}

export const VsrRouteChecklist: React.FC<VsrRouteChecklistProps> = ({ user }) => {
  const [outlets, setOutlets] = useState<OutletItem[]>([
    {
      id: 'out-1',
      name: 'Justrite Superstore - Ikeja Central',
      category: 'Tier 1 Key Account',
      address: '84 Awolowo Way, Ikeja',
      contactName: 'Mr. Babatunde',
      phone: '+234 803 111 2233',
      expectedOrder: '60 Cartons Hospitality Beverage',
      status: 'completed',
      checkInTime: '08:35 WAT',
      volumeSold: '₦420,000'
    },
    {
      id: 'out-2',
      name: 'Grand Square Supermarket - GRA',
      category: 'Tier 1 Retail',
      address: 'Plot 12 Isaac John St, GRA Ikeja',
      contactName: 'Mrs. Adebayo',
      phone: '+234 802 444 5566',
      expectedOrder: '40 Cartons Premium Juices',
      status: 'completed',
      checkInTime: '10:15 WAT',
      volumeSold: '₦310,000'
    },
    {
      id: 'out-3',
      name: 'Bestway Retail Outlet - Maryland',
      category: 'Neighborhood Mart',
      address: 'Mobolaji Bank Anthony Way, Maryland',
      contactName: 'Chief Emeka',
      phone: '+234 809 777 8899',
      expectedOrder: '25 Cartons Assorted Drinks',
      status: 'next'
    },
    {
      id: 'out-4',
      name: 'Sahad Supermarket - Oregun Link',
      category: 'General Mart',
      address: 'Kudirat Abiola Way, Oregun',
      contactName: 'Hajiya Amina',
      phone: '+234 807 123 4567',
      expectedOrder: '30 Cartons Standard Packs',
      status: 'pending'
    },
    {
      id: 'out-5',
      name: 'Ebeano Mart - Allen Avenue',
      category: 'Tier 1 Key Account',
      address: 'Allen Avenue Junction, Ikeja',
      contactName: 'Mr. David',
      phone: '+234 818 999 0000',
      expectedOrder: '50 Cartons Refreshment Suite',
      status: 'pending'
    }
  ]);

  const [activeCheckInId, setActiveCheckInId] = useState<string | null>(null);

  const completedCount = outlets.filter((o) => o.status === 'completed').length;
  const progressPct = Math.round((completedCount / outlets.length) * 100);

  const handlePerformCheckIn = (id: string) => {
    const nowWat = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date()) + ' WAT';

    setOutlets((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          return {
            ...o,
            status: 'completed',
            checkInTime: nowWat,
            volumeSold: '₦280,000'
          };
        }
        return o;
      })
    );
    setActiveCheckInId(null);
  };

  return (
    <div className="space-y-6">
      {/* Route Header */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Assigned Field Route &amp; Outlet Checklist</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  VAN KEA-VN-08
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Route: <strong className="text-slate-800">Ikeja Central - Maryland - Allen Corridor (LG-IS-04)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-sans">Route Progress</span>
              <span className="font-bold text-slate-900">{completedCount} of {outlets.length} Outlets ({progressPct}%)</span>
            </div>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Outlets List */}
      <div className="space-y-3">
        {outlets.map((outlet, idx) => (
          <div
            key={outlet.id}
            className={`bg-white rounded-[14px] border p-5 transition-all shadow-xs ${
              outlet.status === 'completed'
                ? 'border-emerald-200/80 bg-emerald-50/20'
                : outlet.status === 'next'
                ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/10'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs font-mono shadow-xs ${
                  outlet.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : outlet.status === 'next'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{outlet.name}</h4>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {outlet.category}
                    </span>
                    {outlet.status === 'completed' && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Checked-in at {outlet.checkInTime}
                      </span>
                    )}
                    {outlet.status === 'next' && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 animate-pulse">
                        📍 Next Stop
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {outlet.address}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {outlet.contactName} ({outlet.phone})</span>
                  </div>

                  <div className="text-[11px] text-slate-600 font-mono pt-1">
                    Expected Delivery: <strong className="text-slate-900 font-sans">{outlet.expectedOrder}</strong>
                    {outlet.volumeSold && <span className="ml-2 text-emerald-700 font-bold">• POS Sold: {outlet.volumeSold}</span>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {outlet.status !== 'completed' && (
                  <button
                    onClick={() => handlePerformCheckIn(outlet.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>GPS Check-In &amp; Log Sale</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
