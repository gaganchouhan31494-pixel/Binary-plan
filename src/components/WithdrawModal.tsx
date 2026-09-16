import React, { useState } from 'react';
import { 
  Building, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign,
  CreditCard,
  QrCode
} from 'lucide-react';
import { PlanSettings } from '../types';
import { formatCurrency } from '../utils/mlmCalculator';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  settings: PlanSettings;
  onConfirmWithdraw: (amount: number, accountDetails: string) => void;
  isHinglish: boolean;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  settings,
  onConfirmWithdraw,
  isHinglish,
}) => {
  const [amount, setAmount] = useState<number>(Math.min(walletBalance, 10000));
  const [bankName, setBankName] = useState<string>('State Bank of India (SBI)');
  const [accountNumber, setAccountNumber] = useState<string>('30894561234');
  const [ifscCode, setIfscCode] = useState<string>('SBIN0004521');
  const [payoutMode, setPayoutMode] = useState<'BANK' | 'UPI'>('BANK');
  const [upiId, setUpiId] = useState<string>('vikram@okaxis');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txnRef, setTxnRef] = useState<string>('');

  if (!isOpen) return null;

  const validAmount = Math.max(0, Math.min(amount, walletBalance));
  const tdsAmount = (validAmount * settings.tdsPercent) / 100;
  const adminAmount = (validAmount * settings.adminFeePercent) / 100;
  const netAmount = Math.max(0, validAmount - tdsAmount - adminAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validAmount <= 0) return;

    const ref = `WTH-${Date.now().toString().slice(-6)}`;
    setTxnRef(ref);
    onConfirmWithdraw(
      validAmount,
      payoutMode === 'BANK' ? `${bankName} (${accountNumber})` : `UPI: ${upiId}`
    );
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isHinglish ? 'Bank me Payout Nikalein (Withdrawal)' : 'Withdraw to Bank Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {isHinglish ? 'E-Wallet se bank khate me transfer' : 'Instant IMPS / NEFT Settlement'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">
              {isHinglish ? 'Withdrawal Safalta Se Ho Gaya!' : 'Withdrawal Request Processed!'}
            </h4>
            <p className="text-xs text-slate-300">
              {isHinglish
                ? `Rashi ${formatCurrency(netAmount)} aapke khate me bhej di gayi hai.`
                : `Net amount of ${formatCurrency(netAmount)} has been credited.`}
            </p>
            <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-slate-400">
              REF NO: <span className="text-white font-bold">{txnRef}</span>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition mt-2"
            >
              {isHinglish ? 'Thik Hai' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Wallet balance display */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">{isHinglish ? 'Maujooda Wallet Rashi:' : 'Available Balance:'}</span>
              <span className="font-mono text-base font-bold text-emerald-400">
                {formatCurrency(walletBalance)}
              </span>
            </div>

            {/* Amount input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">
                  {isHinglish ? 'Nikaasi Rashi (Amount) *' : 'Withdrawal Amount *'}
                </label>
                <button
                  type="button"
                  onClick={() => setAmount(walletBalance)}
                  className="text-[10px] text-indigo-400 hover:underline"
                >
                  {isHinglish ? 'Poori Rashi (100%)' : 'Max All'}
                </button>
              </div>
              <input
                type="number"
                min="500"
                max={walletBalance}
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Payout Mode Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayoutMode('BANK')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-semibold transition ${
                  payoutMode === 'BANK'
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
              <button
                type="button"
                onClick={() => setPayoutMode('UPI')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-semibold transition ${
                  payoutMode === 'UPI'
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI ID</span>
              </button>
            </div>

            {/* Account Details */}
            {payoutMode === 'BANK' ? (
              <div className="space-y-2.5 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-0.5">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-0.5">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-0.5">IFSC Code</label>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white uppercase"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="block text-slate-400 text-[11px] mb-1">UPI VPA / ID</label>
                <input
                  type="text"
                  placeholder="e.g. mobile@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
              </div>
            )}

            {/* Deductions Breakdown */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>{isHinglish ? 'Nikaasi Rashi (Gross):' : 'Gross Requested:'}</span>
                <span className="font-mono text-white">{formatCurrency(validAmount)}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>{isHinglish ? `TDS (${settings.tdsPercent}%):` : `TDS (${settings.tdsPercent}%):`}</span>
                <span className="font-mono">-{formatCurrency(tdsAmount)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>{isHinglish ? `Admin (${settings.adminFeePercent}%):` : `Admin (${settings.adminFeePercent}%):`}</span>
                <span className="font-mono">-{formatCurrency(adminAmount)}</span>
              </div>
              <div className="border-t border-slate-800 pt-1.5 flex justify-between text-emerald-400 font-bold text-xs">
                <span>{isHinglish ? 'Khate Me Transfer Hogi:' : 'Net Bank Transfer:'}</span>
                <span className="font-mono">{formatCurrency(netAmount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
              >
                {isHinglish ? 'Cancel' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={validAmount <= 0}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold transition flex items-center gap-1.5 shadow"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>{isHinglish ? 'Transfer Confirm Karein' : 'Confirm Payout'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
