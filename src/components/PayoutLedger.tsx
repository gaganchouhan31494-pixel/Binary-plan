import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ArrowUpRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building,
  CreditCard,
  Layers,
  Sparkles
} from 'lucide-react';
import { IncomeTransaction, PlanSettings, IncomeType } from '../types';
import { formatCurrency } from '../utils/mlmCalculator';

interface PayoutLedgerProps {
  transactions: IncomeTransaction[];
  settings: PlanSettings;
  walletBalance: number;
  onOpenWithdrawModal: () => void;
  isHinglish: boolean;
}

export const PayoutLedger: React.FC<PayoutLedgerProps> = ({
  transactions,
  settings,
  walletBalance,
  onOpenWithdrawModal,
  isHinglish,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTxn, setSelectedTxn] = useState<IncomeTransaction | null>(null);

  // Compute stats
  const totalGross = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalTds = transactions.reduce((acc, t) => acc + t.tdsDeduction, 0);
  const totalAdmin = transactions.reduce((acc, t) => acc + t.adminDeduction, 0);
  const totalNet = transactions.reduce((acc, t) => acc + t.netPayable, 0);

  // Filtered transactions
  const filtered = transactions.filter((t) => {
    const matchType = filterType === 'ALL' || t.type === filterType;
    const matchSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.memberName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const getIncomeTypeBadge = (type: IncomeType) => {
    switch (type) {
      case 'BINARY_MATCH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Binary Match</span>;
      case 'DIRECT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Direct Sponsor</span>;
      case 'LEVEL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">Level Bonus</span>;
      case 'DAILY_ROI':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">Daily ROI</span>;
      case 'RANK_REWARD':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Rank Reward</span>;
      case 'ROYALTY_POOL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Royalty Pool</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">Income</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {/* Wallet Balance */}
        <div className="col-span-2 sm:col-span-1 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1">
            <span>{isHinglish ? 'E-Wallet Balance' : 'Available Wallet'}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-white">
            {formatCurrency(walletBalance)}
          </div>
          <button
            onClick={onOpenWithdrawModal}
            className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{isHinglish ? 'Bank me Transfer Karein' : 'Withdraw to Bank'}</span>
          </button>
        </div>

        {/* Total Gross */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[11px] sm:text-xs text-slate-400 block mb-1">
            {isHinglish ? 'Kul Gross Aamadni' : 'Total Gross Earnings'}
          </span>
          <div className="text-lg sm:text-xl font-mono font-bold text-white">
            {formatCurrency(totalGross)}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
            {transactions.length} {isHinglish ? 'Transactions' : 'Records'}
          </span>
        </div>

        {/* TDS Deducted */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 mb-1">
            <span>TDS ({settings.tdsPercent}%)</span>
            <span className="text-[9px] sm:text-[10px] text-rose-400 font-mono">Deducted</span>
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-rose-400">
            {formatCurrency(totalTds)}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
            {isHinglish ? 'Govt PAN Deposit' : 'Tax Deduction'}
          </span>
        </div>

        {/* Admin Charges */}
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex justify-between text-[11px] sm:text-xs text-slate-400 mb-1">
            <span>Admin ({settings.adminFeePercent}%)</span>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-mono">System</span>
          </div>
          <div className="text-lg sm:text-xl font-mono font-bold text-amber-400">
            {formatCurrency(totalAdmin)}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
            {isHinglish ? 'Software & Server Fee' : 'Maintenance'}
          </span>
        </div>

        {/* Net Bank Payout */}
        <div className="col-span-2 sm:col-span-1 p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-indigo-900/50">
          <span className="text-[11px] sm:text-xs text-indigo-400 block mb-1 font-semibold">
            {isHinglish ? 'Net Shuddh Payout' : 'Net Paid to Bank'}
          </span>
          <div className="text-lg sm:text-xl font-mono font-bold text-indigo-300">
            {formatCurrency(totalNet)}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
            {isHinglish ? 'Account me jama rashi' : 'Direct Account Transfer'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Income Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'ALL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isHinglish ? 'Sabhi (All)' : 'All Incomes'}
            </button>
            <button
              onClick={() => setFilterType('BINARY_MATCH')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'BINARY_MATCH'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Binary Match
            </button>
            <button
              onClick={() => setFilterType('DIRECT')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'DIRECT'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Direct
            </button>
            <button
              onClick={() => setFilterType('LEVEL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'LEVEL'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Level
            </button>
            <button
              onClick={() => setFilterType('DAILY_ROI')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'DAILY_ROI'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ROI
            </button>
            <button
              onClick={() => setFilterType('RANK_REWARD')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'RANK_REWARD'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Reward
            </button>
            <button
              onClick={() => setFilterType('ROYALTY_POOL')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                filterType === 'ROYALTY_POOL'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Royalty
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHinglish ? "Search Txn / Member..." : "Search Txn ID / details..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Mobile Transactions Card View (md:hidden) */}
        <div className="md:hidden mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              {isHinglish ? 'Koi transaction nahi mila.' : 'No transactions found.'}
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono font-bold text-white text-xs">{t.id}</div>
                    <div className="text-[10px] text-slate-500">{t.date}</div>
                  </div>
                  <div>{getIncomeTypeBadge(t.type)}</div>
                </div>

                <div className="text-xs text-slate-300 font-medium">
                  {t.description}
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-900 rounded-lg text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block font-sans">Gross:</span>
                    <span className="text-slate-200 font-semibold">{formatCurrency(t.amount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-sans">TDS (5%):</span>
                    <span className="text-rose-400">-{formatCurrency(t.tdsDeduction)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-sans">Admin (10%):</span>
                    <span className="text-amber-400">-{formatCurrency(t.adminDeduction)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-850">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-sans">Net Credit:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {formatCurrency(t.netPayable)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTxn(t)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[10px] font-sans border border-slate-700 transition"
                  >
                    {isHinglish ? 'Voucher Slip' : 'View Slip'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Transactions Table (hidden md) */}
        <div className="hidden md:block mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Txn ID / Date</th>
                <th className="py-2.5 px-3">Income Stream</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-right">Gross</th>
                <th className="py-2.5 px-3 text-right">TDS (5%)</th>
                <th className="py-2.5 px-3 text-right">Admin (10%)</th>
                <th className="py-2.5 px-3 text-right">Net Payable</th>
                <th className="py-2.5 px-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500 font-sans">
                    {isHinglish ? 'Koi transaction nahi mila.' : 'No transactions found.'}
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-white">{t.id}</div>
                      <div className="text-[10px] text-slate-500 font-sans">{t.date}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-sans">
                      {getIncomeTypeBadge(t.type)}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-300 max-w-xs truncate">
                      {t.description}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-white whitespace-nowrap">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="py-3 px-3 text-right text-rose-400 whitespace-nowrap">
                      -{formatCurrency(t.tdsDeduction)}
                    </td>
                    <td className="py-3 px-3 text-right text-amber-400 whitespace-nowrap">
                      -{formatCurrency(t.adminDeduction)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400 whitespace-nowrap">
                      {formatCurrency(t.netPayable)}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap font-sans">
                      <button
                        onClick={() => setSelectedTxn(t)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-400 text-[11px] font-medium transition"
                      >
                        {isHinglish ? 'Slip' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSACTION SLIP / RECEIPT MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {isHinglish ? 'Payout Slip & Voucher' : 'Payout Statement Voucher'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>VOUCHER ID:</span>
                <span className="text-white font-bold">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>MEMBER NAME:</span>
                <span className="text-indigo-400">{selectedTxn.memberName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DATE OF RUN:</span>
                <span className="text-white">{selectedTxn.date}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>INCOME STREAM:</span>
                <span className="text-white">{selectedTxn.type}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-300">
                <span>GROSS AMOUNT:</span>
                <span className="text-white font-bold">{formatCurrency(selectedTxn.amount)}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>TDS TAX (5%):</span>
                <span>-{formatCurrency(selectedTxn.tdsDeduction)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>ADMIN & SERVICE FEE (10%):</span>
                <span>-{formatCurrency(selectedTxn.adminDeduction)}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-emerald-400 text-sm font-bold">
                <span>NET BANK TRANSFER:</span>
                <span>{formatCurrency(selectedTxn.netPayable)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              {isHinglish
                ? 'Ye computer generated payout slip hai aur official record me darj hai.'
                : 'Computer generated disbursement voucher registered with compliance.'}
            </p>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
            >
              {isHinglish ? 'Band Karein' : 'Close Slip'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
