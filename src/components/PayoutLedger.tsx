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
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Binary Match</span>;
      case 'DIRECT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#155e37] border border-emerald-200">Direct Sponsor</span>;
      case 'LEVEL':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Level Bonus</span>;
      case 'DAILY_ROI':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">Daily ROI</span>;
      case 'RANK_REWARD':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Rank Reward</span>;
      case 'ROYALTY_POOL':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Royalty Pool</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Income</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Wallet Balance */}
        <div className="col-span-2 sm:col-span-1 p-4 rounded-[22px] bg-[#155e37] text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-100 font-semibold mb-1">
              <span>{isHinglish ? 'E-Wallet Balance' : 'Available Wallet'}</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              {formatCurrency(walletBalance)}
            </div>
          </div>
          <button
            onClick={onOpenWithdrawModal}
            className="mt-3 w-full py-1.5 rounded-full bg-white hover:bg-slate-100 text-[#155e37] text-[11px] font-extrabold transition flex items-center justify-center gap-1 shadow-sm active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{isHinglish ? 'Bank me Transfer' : 'Withdraw to Bank'}</span>
          </button>
        </div>

        {/* Total Gross */}
        <div className="p-4 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] sm:text-xs text-slate-500 block mb-1 font-medium">
              {isHinglish ? 'Kul Gross Aamadni' : 'Total Gross Earnings'}
            </span>
            <div className="text-lg sm:text-xl font-mono font-extrabold text-slate-900">
              {formatCurrency(totalGross)}
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block">
            {transactions.length} {isHinglish ? 'Records' : 'Records'}
          </span>
        </div>

        {/* TDS Deducted */}
        <div className="p-4 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mb-1 font-medium">
              <span>TDS ({settings.tdsPercent}%)</span>
              <span className="text-[9px] sm:text-[10px] text-rose-600 font-mono font-bold">Deducted</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-extrabold text-rose-600">
              {formatCurrency(totalTds)}
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block">
            {isHinglish ? 'Govt PAN Deposit' : 'Tax Deduction'}
          </span>
        </div>

        {/* Admin Charges */}
        <div className="p-4 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-[11px] sm:text-xs text-slate-500 mb-1 font-medium">
              <span>Admin ({settings.adminFeePercent}%)</span>
              <span className="text-[9px] sm:text-[10px] text-amber-600 font-mono font-bold">Fee</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-extrabold text-amber-600">
              {formatCurrency(totalAdmin)}
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block">
            {isHinglish ? 'Server Fee' : 'Maintenance'}
          </span>
        </div>

        {/* Net Bank Payout */}
        <div className="col-span-2 sm:col-span-1 p-4 rounded-[22px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] sm:text-xs text-[#155e37] block mb-1 font-bold">
              {isHinglish ? 'Net Shuddh Payout' : 'Net Paid to Bank'}
            </span>
            <div className="text-lg sm:text-xl font-mono font-extrabold text-slate-900">
              {formatCurrency(totalNet)}
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-2 block">
            {isHinglish ? 'Account me jama' : 'Direct Transfer'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Income Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'ALL'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isHinglish ? 'Sabhi (All)' : 'All Incomes'}
            </button>
            <button
              onClick={() => setFilterType('BINARY_MATCH')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'BINARY_MATCH'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Binary Match
            </button>
            <button
              onClick={() => setFilterType('DIRECT')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'DIRECT'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Direct
            </button>
            <button
              onClick={() => setFilterType('LEVEL')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'LEVEL'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Level
            </button>
            <button
              onClick={() => setFilterType('DAILY_ROI')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'DAILY_ROI'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ROI
            </button>
            <button
              onClick={() => setFilterType('RANK_REWARD')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'RANK_REWARD'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Reward
            </button>
            <button
              onClick={() => setFilterType('ROYALTY_POOL')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                filterType === 'ROYALTY_POOL'
                  ? 'bg-[#155e37] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155e37]"
            />
          </div>
        </div>

        {/* Mobile Transactions Card View (md:hidden) */}
        <div className="md:hidden mt-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              {isHinglish ? 'Koi transaction nahi mila.' : 'No transactions found.'}
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono font-bold text-slate-900 text-xs">{t.id}</div>
                    <div className="text-[10px] text-slate-500">{t.date}</div>
                  </div>
                  <div>{getIncomeTypeBadge(t.type)}</div>
                </div>

                <div className="text-xs text-slate-700 font-medium">
                  {t.description}
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-2 bg-white rounded-xl border border-slate-200 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-500 block font-sans">Gross:</span>
                    <span className="text-slate-800 font-bold">{formatCurrency(t.amount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-sans">TDS (5%):</span>
                    <span className="text-rose-600 font-bold">-{formatCurrency(t.tdsDeduction)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-sans">Admin:</span>
                    <span className="text-amber-600 font-bold">-{formatCurrency(t.adminDeduction)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-sans">Net Credit:</span>
                    <span className="font-mono font-bold text-[#155e37] text-sm">
                      {formatCurrency(t.netPayable)}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTxn(t)}
                    className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200 transition shadow-sm"
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
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-400 font-sans">
                    {isHinglish ? 'Koi transaction nahi mila.' : 'No transactions found.'}
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{t.id}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{t.date}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-sans">
                      {getIncomeTypeBadge(t.type)}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-600 max-w-xs truncate">
                      {t.description}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="py-3 px-3 text-right text-rose-600 whitespace-nowrap">
                      -{formatCurrency(t.tdsDeduction)}
                    </td>
                    <td className="py-3 px-3 text-right text-amber-600 whitespace-nowrap">
                      -{formatCurrency(t.adminDeduction)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#155e37] whitespace-nowrap">
                      {formatCurrency(t.netPayable)}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap font-sans">
                      <button
                        onClick={() => setSelectedTxn(t)}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-[22px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#155e37]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isHinglish ? 'Payout Slip & Voucher' : 'Payout Statement Voucher'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>VOUCHER ID:</span>
                <span className="text-slate-900 font-bold">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>MEMBER NAME:</span>
                <span className="text-slate-900 font-semibold">{selectedTxn.memberName}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>DATE OF RUN:</span>
                <span className="text-slate-800">{selectedTxn.date}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>INCOME STREAM:</span>
                <span className="text-slate-800 font-bold">{selectedTxn.type}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-700">
                <span>GROSS AMOUNT:</span>
                <span className="text-slate-900 font-bold">{formatCurrency(selectedTxn.amount)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>TDS TAX (5%):</span>
                <span>-{formatCurrency(selectedTxn.tdsDeduction)}</span>
              </div>
              <div className="flex justify-between text-amber-600">
                <span>ADMIN & SERVICE FEE (10%):</span>
                <span>-{formatCurrency(selectedTxn.adminDeduction)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-[#155e37] text-sm font-bold">
                <span>NET BANK TRANSFER:</span>
                <span>{formatCurrency(selectedTxn.netPayable)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              {isHinglish
                ? 'Ye computer generated payout slip hai aur official record me darj hai.'
                : 'Computer generated disbursement voucher registered with compliance.'}
            </p>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-2.5 rounded-full bg-[#155e37] hover:bg-[#114c2c] text-white font-bold text-xs transition shadow-sm"
            >
              {isHinglish ? 'Band Karein' : 'Close Slip'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
