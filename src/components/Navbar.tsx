import React from 'react';
import { 
  Network, 
  Settings, 
  UserPlus, 
  DollarSign, 
  Sparkles,
  Globe,
  Layers,
  Calculator,
  Crown,
  FileText,
  Users
} from 'lucide-react';
import { PlanSettings } from '../types';
import { formatCurrency } from '../utils/mlmCalculator';

interface NavbarProps {
  settings: PlanSettings;
  activeTab: 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members';
  setActiveTab: (tab: 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members') => void;
  onOpenSettings: () => void;
  onOpenAddMember: () => void;
  onRunPayout: () => void;
  walletBalance: number;
  isHinglish: boolean;
  setIsHinglish: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenAddMember,
  onRunPayout,
  walletBalance,
  isHinglish,
  setIsHinglish,
}) => {
  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        {/* Top Announcement / Quick Status Bar */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-indigo-950/70 to-purple-950/70 px-3 sm:px-4 py-1.5 border-b border-slate-800/80 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Rates ticker */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 text-[11px] sm:text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-medium text-emerald-300 whitespace-nowrap">
                {isHinglish ? 'Matching:' : 'Match:'} {settings.binaryMatchingPercent}% (1:1)
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-indigo-300 whitespace-nowrap hidden sm:inline">
                {isHinglish ? 'Direct:' : 'Direct:'} {settings.directReferralPercent}%
              </span>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="text-slate-400 whitespace-nowrap hidden md:inline">
                Carry Forward: Active
              </span>
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsHinglish(!isHinglish)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[11px] border border-slate-700 active:scale-95"
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="font-semibold">{isHinglish ? '🇮🇳 हिंदी' : '🌐 EN'}</span>
              </button>

              <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                <span className="text-slate-400 hidden xs:inline">
                  {isHinglish ? 'Wallet:' : 'Bal:'}
                </span>
                <strong className="text-emerald-400 font-mono font-bold">
                  {formatCurrency(walletBalance)}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Logo & Plan Name */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 p-0.5 shadow-md shadow-indigo-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Network className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-base md:text-lg tracking-tight text-white truncate max-w-[120px] sm:max-w-none">
                    {settings.companyName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap hidden sm:inline-block">
                    Binary Pro
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden md:block">
                  {isHinglish
                    ? '1:1 Binary Tree & 7 Incomes Portal'
                    : 'Multi-Income Binary Management'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('tree')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'tree'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                🌳 {isHinglish ? 'Binary Tree' : 'Tree'}
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'simulator'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                ⚡ {isHinglish ? 'Calculator' : 'Simulator'}
              </button>
              <button
                onClick={() => setActiveTab('incomes')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'incomes'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                💎 {isHinglish ? '7 Incomes' : 'Incomes'}
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'ledger'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                📜 {isHinglish ? 'Payouts' : 'Payouts'}
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTab === 'members'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                👥 {isHinglish ? 'Team' : 'Team'}
              </button>
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Modern High-Polish Join Button */}
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/60 border border-emerald-400/40 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
                title={isHinglish ? 'Naya Member Jodein (Join Member)' : 'Join Member'}
              >
                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <UserPlus className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="tracking-wide">{isHinglish ? '+ Join' : '+ Join'}</span>
              </button>

              {/* Cutoff Trigger Button */}
              <button
                onClick={onRunPayout}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-900/30 transition active:scale-95 whitespace-nowrap shrink-0"
                title={isHinglish ? 'Cycle Matching Cutoff Run Karein' : 'Trigger cycle matching cutoff'}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="hidden sm:inline">{isHinglish ? 'Cutoff' : 'Cutoff'}</span>
              </button>

              {/* Settings Button */}
              <button
                onClick={onOpenSettings}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 active:scale-95 shrink-0"
                title="Plan Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Pill Tab Navigation */}
          <div className="md:hidden flex items-center overflow-x-auto scrollbar-none py-2 border-t border-slate-800/60 gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition active:scale-95 flex items-center gap-1.5 ${
                activeTab === 'tree'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800'
              }`}
            >
              <span>🌳</span>
              <span>{isHinglish ? 'Binary Tree' : 'Tree'}</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition active:scale-95 flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800'
              }`}
            >
              <span>⚡</span>
              <span>{isHinglish ? 'Calculator' : 'Simulator'}</span>
            </button>
            <button
              onClick={() => setActiveTab('incomes')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition active:scale-95 flex items-center gap-1.5 ${
                activeTab === 'incomes'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800'
              }`}
            >
              <span>💎</span>
              <span>{isHinglish ? '7 Incomes' : 'Incomes'}</span>
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition active:scale-95 flex items-center gap-1.5 ${
                activeTab === 'ledger'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800'
              }`}
            >
              <span>📜</span>
              <span>{isHinglish ? 'Payouts' : 'Payouts'}</span>
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition active:scale-95 flex items-center gap-1.5 ${
                activeTab === 'members'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800'
              }`}
            >
              <span>👥</span>
              <span>{isHinglish ? 'Team' : 'Team'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sleek Mobile Bottom App Bar (Sticky on phones for native app feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-1.5 flex items-center justify-between shadow-2xl safe-area-bottom">
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'tree' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-medium">{isHinglish ? 'Tree' : 'Tree'}</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'simulator' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-medium">{isHinglish ? 'Calc' : 'Calc'}</span>
        </button>

        {/* Center Prominent Elevated Join Button */}
        <button
          onClick={onOpenAddMember}
          className="-mt-5 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-xl shadow-emerald-950/80 border-2 border-slate-900 active:scale-90 transition-transform shrink-0"
          title={isHinglish ? 'Naya Member Jodein' : 'Join Member'}
        >
          <UserPlus className="w-5 h-5 text-white" />
          <span className="text-[8px] font-extrabold tracking-tight uppercase leading-none mt-0.5 text-emerald-100">JOIN</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'ledger' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-medium">{isHinglish ? 'Payouts' : 'Ledger'}</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition ${
            activeTab === 'members' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-medium">{isHinglish ? 'Team' : 'Team'}</span>
        </button>
      </div>
    </>
  );
};
