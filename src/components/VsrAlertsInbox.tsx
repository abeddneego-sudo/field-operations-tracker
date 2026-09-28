import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  Send, 
  Clock, 
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Inbox
} from 'lucide-react';
import { AuthUser } from '../types';
import { getWorkflowState, subscribeToWorkflow, addRequest } from '../data/workflowStore';

interface VsrAlertsInboxProps {
  user: AuthUser;
}

export const VsrAlertsInbox: React.FC<VsrAlertsInboxProps> = ({ user }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'alerts' | 'request'>('alerts');
  const [requestType, setRequestType] = useState<'funding' | 'leave'>('funding');
  const [requestAmount, setRequestAmount] = useState('50,000');
  const [requestReason, setRequestReason] = useState('Additional POS Float required for high-volume retail corridor in Ikeja.');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Load live messages and alerts from workflow store
  useEffect(() => {
    const update = () => {
      const state = getWorkflowState();
      // Combine state messages with automated trigger alerts
      const userMessages = state.messages.filter(
        (m) => m.audience === 'all' || m.audience === user.id || m.audience === user.staffCode
      );

      // Default system alerts if none
      const defaultAlerts = [
        {
          id: 'alert-loan-reminder',
          subject: '⚡ Automated Notice: Micro-Float Weekly Installment Due',
          body: 'Dear VSR, your weekly inventory float installment of ₦20,000 is due on Friday. Kindly deposit and submit transfer receipt.',
          createdAt: new Date().toISOString(),
          type: 'loan'
        },
        {
          id: 'alert-report-reminder',
          subject: '📋 Compliance Notice: Submit Week 39 Performance Log',
          body: 'Weekly retail visits and POS gross merchandise values must be submitted prior to the Saturday 18:00 WAT cutoff.',
          createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
          type: 'report'
        }
      ];

      setMessages([...userMessages, ...defaultAlerts]);
    };

    update();
    const unsubscribe = subscribeToWorkflow(update);
    return () => unsubscribe();
  }, [user]);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addRequest({
        senderId: user.id,
        senderName: user.name,
        type: requestType,
        amount: requestType === 'funding' ? `₦${requestAmount}` : undefined,
        reason: requestReason
      });
      setRequestSubmitted(true);
      setTimeout(() => setRequestSubmitted(false), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">VSR Operations Inbox &amp; Command Alerts</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  REAL-TIME CHANNEL
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Receive automated triggers from Super Admin and send float or support requests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'alerts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Alerts &amp; Directives ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'request' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              New Float / Support Request
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'alerts' && (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 space-y-2.5 transition-all hover:border-emerald-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    <Bell className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{msg.subject}</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WAT
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pl-8">{msg.body}</p>

              <div className="pl-8 pt-2 flex items-center gap-3">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Broadcast by Super Admin Console
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'request' && (
        <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 max-w-2xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm">Submit Operational Request to Super Admin</h4>
            <p className="text-xs text-slate-400 mt-0.5">Dispatched directly to the Super Admin executive review desk.</p>
          </div>

          {requestSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Request Transmitted Successfully!</span>
              </div>
              <p className="text-xs text-emerald-700">Super Admin has been alerted and will review shortly.</p>
            </div>
          )}

          <form onSubmit={handleSendRequest} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Request Type:</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
              >
                <option value="funding">POS Cash Float / Inventory Restock Advance</option>
                <option value="leave">Field Duty Leave / Absence Clearance</option>
              </select>
            </div>

            {requestType === 'funding' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Amount Requested (₦):</label>
                <input
                  type="text"
                  required
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900"
                  placeholder="50,000"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Justification &amp; Notes:</label>
              <textarea
                rows={4}
                required
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-emerald-500"
                placeholder="Explain the operational necessity..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Request to Super Admin</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
