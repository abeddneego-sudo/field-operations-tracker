import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Store, 
  Send, 
  Sparkles,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { AuthUser } from '../types';
import { addReport } from '../data/workflowStore';

interface VsrWeeklyReportFormProps {
  user: AuthUser;
}

export const VsrWeeklyReportForm: React.FC<VsrWeeklyReportFormProps> = ({ user }) => {
  const [selectedWeek, setSelectedWeek] = useState('Week 39 (21 Sep - 27 Sep 2026)');
  const [outletsVisited, setOutletsVisited] = useState('18');
  const [outletsTarget, setOutletsTarget] = useState('20');
  const [grossSalesValue, setGrossSalesValue] = useState('1,840,000');
  const [unitsSold, setUnitsSold] = useState('420');
  const [cashCollected, setCashCollected] = useState('1,840,000');
  const [expenses, setExpenses] = useState('35,000');
  const [fieldNotes, setFieldNotes] = useState('High demand for hospitality beverage pack sizes in Ikeja sector. Restock needed for Tuesday.');
  const [fileName, setFileName] = useState('VSR_Weekly_Sales_Report_Week39.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const pastReports = [
    { id: 'rep-1', week: 'Week 38 (14 Sep - 20 Sep 2026)', outlets: '19/20', sales: '₦1,920,000', status: 'Accepted', date: '2026-09-20', reviewedBy: 'Tope Balogun (CEO)' },
    { id: 'rep-2', week: 'Week 37 (07 Sep - 13 Sep 2026)', outlets: '20/20', sales: '₦2,100,000', status: 'Accepted', date: '2026-09-13', reviewedBy: 'Adebayo Adeleke (Ops)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addReport({
        senderId: user.id,
        senderName: user.name,
        period: 'weekly',
        fileName: fileName || `${user.name.replace(/\s+/g, '_')}_Weekly_Report_${selectedWeek.slice(0, 7)}.pdf`
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Weekly Performance &amp; Sales Submission</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  WEEKLY COMPLIANCE
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit your weekly field visit log, POS collections, and inventory reconciliations to the Super Admin.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-medium text-slate-400 block">Current Submission Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3" /> Ready for Review
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm">Submit New Weekly Ledger</h4>
            <p className="text-xs text-slate-400 mt-0.5">Fill in your field KPI numbers accurately. All data syncs in real-time.</p>
          </div>

          {isSubmittedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Weekly Report Successfully Submitted to Super Admin!</span>
              </div>
              <p className="text-xs text-emerald-700">
                Your report has been placed in the Super Admin executive audit queue for review.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reporting Period */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Reporting Week Period:</label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-medium outline-none focus:border-emerald-500"
              >
                <option value="Week 39 (21 Sep - 27 Sep 2026)">Week 39 (21 Sep - 27 Sep 2026) - Current Week</option>
                <option value="Week 40 (28 Sep - 04 Oct 2026)">Week 40 (28 Sep - 04 Oct 2026) - Next Week</option>
              </select>
            </div>

            {/* Outlets & Gross Sales Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Outlets Visited / Target:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={outletsVisited}
                    onChange={(e) => setOutletsVisited(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                    placeholder="18"
                  />
                  <span className="text-slate-400 text-xs">/</span>
                  <input
                    type="number"
                    value={outletsTarget}
                    onChange={(e) => setOutletsTarget(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Gross POS Volume (₦):</label>
                <input
                  type="text"
                  value={grossSalesValue}
                  onChange={(e) => setGrossSalesValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800"
                  placeholder="1,840,000"
                />
              </div>
            </div>

            {/* Units & Cash Collected */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Cartons / Packs Delivered:</label>
                <input
                  type="number"
                  value={unitsSold}
                  onChange={(e) => setUnitsSold(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                  placeholder="420"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Customer Cash Deposited (₦):</label>
                <input
                  type="text"
                  value={cashCollected}
                  onChange={(e) => setCashCollected(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800"
                  placeholder="1,840,000"
                />
              </div>
            </div>

            {/* Field Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Field Notes &amp; Route Observations:</label>
              <textarea
                rows={3}
                value={fieldNotes}
                onChange={(e) => setFieldNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 outline-none focus:border-emerald-500"
                placeholder="Share merchant inventory comments, competitor pricing observations..."
              />
            </div>

            {/* File Upload Attachment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Attach Detailed Sales Sheet (CSV/PDF):</label>
              <div className="p-3.5 border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl bg-slate-50/50 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{fileName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">1.2 MB • Ready for ingestion</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFileName(`VSR_Report_${Date.now()}.pdf`)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting to Super Admin...' : 'Transmit Weekly Report to Super Admin'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Past Submissions Audit */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[14px] border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Past Report Submissions</h4>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Audit Ledger</span>
            </div>

            <div className="space-y-3">
              {pastReports.map((rep) => (
                <div key={rep.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{rep.week}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ✅ {rep.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <span className="text-slate-500">Outlets: <strong className="text-slate-800">{rep.outlets}</strong></span>
                    <span className="text-slate-500">Sales: <strong className="text-emerald-700">{rep.sales}</strong></span>
                  </div>

                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                    <span>Date: {rep.date}</span>
                    <span>Reviewed: {rep.reviewedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
