import React, { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  FileText, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Bell,
  RefreshCw,
  Sparkles,
  Users
} from 'lucide-react';
import { addMessage } from '../data/workflowStore';

export const SuperAdminTriggerConsole: React.FC = () => {
  const [triggerStatus, setTriggerStatus] = useState<string | null>(null);
  const [activeTriggerId, setActiveTriggerId] = useState<string | null>(null);

  const triggers = [
    {
      id: 'trigger-loan-defaults',
      title: '⚡ Automated Loan Default Alert Broadcast',
      description: 'Scans all active VSRs with overdue micro-float balances and automatically transmits official SMS/In-App repayment reminders.',
      targetCount: '14 VSRs Flagged',
      icon: CreditCard,
      color: 'amber',
      actionText: 'Execute Loan Default Broadcast',
      execute: () => {
        addMessage({
          senderId: 'system-super-admin',
          senderName: 'KEA Super Admin Executive Desk',
          audience: 'all',
          subject: '⚠️ URGENT: Outstanding Loan Repayment Notice',
          body: 'Automated Super Admin Notice: Your weekly inventory micro-float repayment of ₦20,000 is due. Kindly deposit to KEA Corporate Zenith Bank account (1014892210) and submit transaction proof via your VSR portal.'
        });
        return 'Broadcast dispatched to 14 VSRs with outstanding loan balances.';
      }
    },
    {
      id: 'trigger-missing-reports',
      title: '📋 Missing Weekly Performance Report Scanner',
      description: 'Detects all field merchandisers and VSRs who have not submitted their Week 39 performance ledger and dispatches urgent prompts.',
      targetCount: '9 Unsubmitted VSRs',
      icon: FileText,
      color: 'rose',
      actionText: 'Dispatch Missing Report Prompts',
      execute: () => {
        addMessage({
          senderId: 'system-super-admin',
          senderName: 'KEA Operations Compliance Unit',
          audience: 'all',
          subject: '📋 Compliance Directive: Submit Weekly Performance Log',
          body: 'Super Admin Compliance Alert: Your weekly field performance ledger for Week 39 is pending. Please log your gross sales, retail visits, and cash deposits before the 18:00 WAT cutoff.'
        });
        return 'Compliance alert sent to 9 VSRs pending weekly report submissions.';
      }
    },
    {
      id: 'trigger-shift-overrun',
      title: '🌙 Shift Cutoff & Overrun Adherence Trigger',
      description: 'Audits field terminals active past 21:00 WAT and issues automated closing compliance notifications to ensure security adherence.',
      targetCount: 'Regional Telemetry Scan',
      icon: Clock,
      color: 'indigo',
      actionText: 'Run Shift Adherence Check',
      execute: () => {
        addMessage({
          senderId: 'system-super-admin',
          senderName: 'KEA Telemetry Command',
          audience: 'all',
          subject: '🌙 Daily Shift Cutoff Reminder (21:00 WAT)',
          body: 'Field Operations Reminder: Daily retail terminal shifts close at 21:00 WAT. Ensure GPS clock-out is recorded and cash deposits are reconciled.'
        });
        return 'Shift compliance broadcast sent to all active regional hubs.';
      }
    }
  ];

  const handleRunTrigger = (t: typeof triggers[0]) => {
    setActiveTriggerId(t.id);
    setTriggerStatus(`Executing automated scan for: ${t.title}...`);

    setTimeout(() => {
      const message = t.execute();
      setTriggerStatus(`✅ Success: ${message}`);
      setActiveTriggerId(null);
      setTimeout(() => setTriggerStatus(null), 6000);
    }, 700);
  };

  return (
    <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">Super Admin Automated Trigger Engine</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                EXECUTIVE AUTONOMY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly audit field workforce conditions and dispatch automated alerts directly to VSR portals.
            </p>
          </div>
        </div>
      </div>

      {triggerStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{triggerStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {triggers.map((t) => {
          const Icon = t.icon;
          const isRunning = activeTriggerId === t.id;

          return (
            <div
              key={t.id}
              className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4.5 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-xs">
                    <Icon className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                    {t.targetCount}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-slate-900">{t.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{t.description}</p>
              </div>

              <button
                onClick={() => handleRunTrigger(t)}
                disabled={isRunning}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning &amp; Broadcasting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.actionText}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
