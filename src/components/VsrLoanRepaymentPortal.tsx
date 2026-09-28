import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Upload, 
  Send,
  ShieldAlert,
  ArrowUpRight,
  History
} from 'lucide-react';
import { AuthUser } from '../types';

interface VsrLoanRepaymentPortalProps {
  user: AuthUser;
}

export const VsrLoanRepaymentPortal: React.FC<VsrLoanRepaymentPortalProps> = ({ user }) => {
  const [totalLoanAmount] = useState(300000);
  const [totalRepaid] = useState(220000);
  const outstandingBalance = totalLoanAmount - totalRepaid;
  const nextDueDate = 'Friday, Oct 2, 2026';
  const weeklyInstallment = 20000;
  const isOverdue = false; // can be toggled by alert triggers

  const [paymentAmount, setPaymentAmount] = useState('20,000');
  const [paymentRef, setPaymentRef] = useState('ZENITH-TRF-98214309');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSuccess, setRecordedSuccess] = useState(false);

  const repaymentLedger = [
    { id: 'pay-1', date: '2026-09-21', amount: '₦20,000', method: 'Direct Bank Transfer', ref: 'ZENITH-TRF-81092', status: 'Verified by Audit' },
    { id: 'pay-2', date: '2026-09-14', amount: '₦20,000', method: 'Direct Bank Transfer', ref: 'GTB-TRF-77123', status: 'Verified by Audit' },
    { id: 'pay-3', date: '2026-09-07', amount: '₦20,000', method: 'Direct Bank Transfer', ref: 'ZENITH-TRF-65001', status: 'Verified by Audit' },
    { id: 'pay-4', date: '2026-08-31', amount: '₦20,000', method: 'POS Settlement Deduction', ref: 'POS-SETTLE-501', status: 'Verified by Audit' }
  ];

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordedSuccess(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">VSR Micro-Loan &amp; Inventory Float Ledger</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  GUARANTOR BACKED
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your allocated field float, repayment schedule, and submit proof of bank transfer.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-medium text-slate-400 block">Account Standing</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Active Good Standing
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[12px] border border-slate-200/80 p-4 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Micro-Loan Granted</div>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">₦{totalLoanAmount.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Fidelity guaranteed &amp; insured</div>
        </div>

        <div className="bg-white rounded-[12px] border border-slate-200/80 p-4 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Amount Repaid</div>
          <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">₦{totalRepaid.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">73.3% Paid Off (11 of 15 Installments)</div>
        </div>

        <div className="bg-white rounded-[12px] border border-slate-200/80 p-4 shadow-xs">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Outstanding Balance</div>
          <div className="text-xl font-extrabold text-amber-700 font-mono mt-1">₦{outstandingBalance.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-1">Next: ₦{weeklyInstallment.toLocaleString()} due {nextDueDate}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Record Repayment Form */}
        <div className="lg:col-span-6 bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm">Submit Repayment Transaction Proof</h4>
            <p className="text-xs text-slate-400 mt-0.5">Paid via bank transfer? Record the details below for Super Admin audit clearance.</p>
          </div>

          {recordedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Repayment Slip Logged Successfully!</span>
              </div>
              <p className="text-xs text-emerald-700">
                Super Admin audit team will verify the transfer against the Zenith bank statement.
              </p>
            </div>
          )}

          <form onSubmit={handleRecordPayment} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Repayment Amount (₦):</label>
              <input
                type="text"
                required
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900"
                placeholder="20,000"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Bank Transfer Reference / Session ID:</label>
              <input
                type="text"
                required
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-900"
                placeholder="ZENITH-TRF-98214309"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">KEA Corporate Repayment Bank Details:</label>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
                <div>Bank: <strong className="text-slate-900">Zenith Bank Plc</strong></div>
                <div>Account Name: <strong className="text-slate-900">KEA Corporate Hospitality Services Ltd</strong></div>
                <div>Account No: <strong className="text-emerald-700">1014892210</strong></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isRecording}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>{isRecording ? 'Submitting Payment Proof...' : 'Submit Repayment to Super Admin'}</span>
            </button>
          </form>
        </div>

        {/* Right: Repayment Ledger History */}
        <div className="lg:col-span-6 bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm">Verified Repayment History</h4>
            <span className="text-[10px] font-mono text-slate-400">4 Verified Payments</span>
          </div>

          <div className="space-y-2.5">
            {repaymentLedger.map((item) => (
              <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 font-mono">{item.amount}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{item.date} • {item.ref}</div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
