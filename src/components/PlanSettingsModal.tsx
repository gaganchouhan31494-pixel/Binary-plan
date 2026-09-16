import React, { useState } from 'react';
import { 
  Settings, 
  X, 
  Save, 
  RotateCcw, 
  Percent, 
  ShieldCheck, 
  DollarSign,
  PackageCheck
} from 'lucide-react';
import { PlanSettings } from '../types';

interface PlanSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PlanSettings;
  onSaveSettings: (newSettings: PlanSettings) => void;
  isHinglish: boolean;
}

export const PlanSettingsModal: React.FC<PlanSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  isHinglish,
}) => {
  const [formData, setFormData] = useState<PlanSettings>({ ...settings });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isHinglish ? 'MLM Binary Plan Settings & Rules' : 'Plan Settings & Commission Rules'}
              </h3>
              <p className="text-xs text-slate-400">
                {isHinglish
                  ? 'Matching %, Direct %, Capping, TDS aur Admin Charge badlein'
                  : 'Customize matching percentages, capping limits and compliance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Company Name */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isHinglish ? 'Company / Plan Ka Naam' : 'Company / Brand Name'}
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Key Rates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Binary Matching % */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-blue-400 font-semibold mb-1">
                {isHinglish ? 'Binary Matching (%)' : 'Binary Match (%)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="50"
                  value={formData.binaryMatchingPercent}
                  onChange={(e) =>
                    setFormData({ ...formData, binaryMatchingPercent: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                {isHinglish ? '1:1 Matched BV par' : 'On 1:1 Matched BV'}
              </span>
            </div>

            {/* Direct Referral % */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-indigo-400 font-semibold mb-1">
                {isHinglish ? 'Direct Referral (%)' : 'Direct Referral (%)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="50"
                  value={formData.directReferralPercent}
                  onChange={(e) =>
                    setFormData({ ...formData, directReferralPercent: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                {isHinglish ? 'Direct joining package par' : 'On direct member activation'}
              </span>
            </div>

            {/* Default Daily Capping */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <label className="block text-amber-400 font-semibold mb-1">
                {isHinglish ? 'Default Daily Capping (₹)' : 'Default Capping (₹)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="500"
                  min="1000"
                  value={formData.defaultDailyCapping}
                  onChange={(e) =>
                    setFormData({ ...formData, defaultDailyCapping: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">₹</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                {isHinglish ? 'Roj ka maximum binary limit' : 'Max binary match / day'}
              </span>
            </div>
          </div>

          {/* Deductions: TDS & Admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div>
              <label className="block text-rose-400 font-semibold mb-1">
                {isHinglish ? 'TDS Tax Katauti (%)' : 'TDS Tax Deduction (%)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="30"
                  value={formData.tdsPercent}
                  onChange={(e) =>
                    setFormData({ ...formData, tdsPercent: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {isHinglish ? 'Govt PAN Card Compliance (Default: 5%)' : 'Tax deduction rate'}
              </span>
            </div>

            <div>
              <label className="block text-amber-400 font-semibold mb-1">
                {isHinglish ? 'System Admin Fee (%)' : 'System Admin Charge (%)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="30"
                  value={formData.adminFeePercent}
                  onChange={(e) =>
                    setFormData({ ...formData, adminFeePercent: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {isHinglish ? 'Server maintenance & platform fee' : 'Platform fee'}
              </span>
            </div>
          </div>

          {/* Royalty Pool & Monthly Turnover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <div>
              <label className="block text-purple-400 font-semibold mb-1">
                {isHinglish ? 'Royalty Club Pool (%)' : 'Royalty Pool Share (%)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="10"
                  value={formData.royaltyPoolPercent}
                  onChange={(e) =>
                    setFormData({ ...formData, royaltyPoolPercent: Number(e.target.value) })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">%</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {isHinglish ? 'Company turnover se pool' : 'Share of company turnover'}
              </span>
            </div>

            <div>
              <label className="block text-purple-400 font-semibold mb-1">
                {isHinglish ? 'Est. Monthly Company Turnover (₹)' : 'Monthly Turnover (₹)'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="100000"
                  min="100000"
                  value={formData.estimatedMonthlyCompanyTurnover}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedMonthlyCompanyTurnover: Number(e.target.value),
                    })
                  }
                  className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-white"
                />
                <span className="text-slate-400">₹</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
            >
              {isHinglish ? 'Cancel' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-950"
            >
              <Save className="w-4 h-4" />
              <span>{isHinglish ? 'Settings Save Karein' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
