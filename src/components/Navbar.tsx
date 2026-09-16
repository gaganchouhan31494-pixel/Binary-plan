import React from 'react';
import { 
  Network, 
  Settings, 
  UserPlus, 
  Sparkles,
  Globe,
  Layers,
  Calculator,
  Crown,
  FileText,
  Users,
  LayoutDashboard
} from 'lucide-react';
import { PlanSettings } from '../types';
import { formatCurrency } from '../utils/mlmCalculator';

export type AppTab = 'dashboard' | 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members';

interface NavbarProps {
  settings: PlanSettings;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Announcement / Quick Status Bar */}
        <div className="bg-[#eef8f2] px-3 sm:px-4 py-1.5 border-b border-emerald-100/90 text-xs text-slate-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Rates ticker */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 text-[11px] sm:text-xs font-medium">
              <span className="flex h-2 w-2 rounded-full bg-[#155e37] animate-pulse shrink-0" />
              <span className="font-bold text-[#155e37] whitespace-nowrap">
                {isHinglish ? '1:1 Binary Match:' : '1:1 Match:'} {settings.binaryMatchingPercent}%
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-700 whitespace-nowrap hidden sm:inline font-semibold">
                {isHinglish ? 'Direct Sponsor:' : 'Direct Bonus:'} {settings.directReferralPercent}%
              </span>
              <span className="text-slate-300 hidden md:inline">•</span>
              <span className="text-slate-500 whitespace-nowrap hidden md:inline">
                Carry Forward: Active (No Flashout)
              </span>
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsHinglish(!isHinglish)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-700 transition text-[11px] font-semibold border border-slate-200 shadow-xs active:scale-95"
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 text-[#155e37] shrink-0" />
                <span>{isHinglish ? '🇮🇳 हिंदी' : '🌐 EN'}</span>
              </button>

              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-[11px] shadow-xs">
                <span className="text-slate-400 hidden xs:inline">
                  {isHinglish ? 'Wallet:' : 'Bal:'}
                </span>
                <strong className="text-[#155e37] font-mono font-bold">
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
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 sm:gap-2.5 min-w-0 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#155e37] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <Network className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs sm:text-base md:text-lg tracking-tight text-slate-900 truncate max-w-[120px] sm:max-w-none">
                    {settings.companyName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#155e37] whitespace-nowrap hidden sm:inline-block">
                    Binary Pro
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate hidden md:block">
                  {isHinglish
                    ? '1:1 Binary Tree & 7 Incomes Portal'
                    : 'Multi-Income Binary Management'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 text-xs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'dashboard'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{isHinglish ? 'Dashboard' : 'Dashboard'}</span>
              </button>
              <button
                onClick={() => setActiveTab('tree')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'tree'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isHinglish ? 'Binary Tree' : 'Tree'}</span>
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'simulator'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{isHinglish ? 'Calculator' : 'Simulator'}</span>
              </button>
              <button
                onClick={() => setActiveTab('incomes')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'incomes'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>{isHinglish ? '7 Incomes' : 'Incomes'}</span>
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'ledger'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isHinglish ? 'Payouts' : 'Payouts'}</span>
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-150 ${
                  activeTab === 'members'
                    ? 'bg-[#155e37] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{isHinglish ? 'Team' : 'Team'}</span>
              </button>
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Modern High-Polish Deep Green Join Button */}
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#155e37] hover:bg-[#114c2c] text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
                title={isHinglish ? 'Naya Member Jodein (Join Member)' : 'Join Member'}
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
                <span className="tracking-wide">{isHinglish ? '+ Join Member' : '+ Add Member'}</span>
              </button>

              {/* Cutoff Trigger Button */}
              <button
                onClick={onRunPayout}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition active:scale-95 whitespace-nowrap shrink-0"
                title={isHinglish ? 'Cycle Matching Cutoff Run Karein' : 'Trigger cycle matching cutoff'}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#155e37] shrink-0" />
                <span className="hidden sm:inline">{isHinglish ? 'Run Cutoff' : 'Cutoff'}</span>
              </button>

              {/* Settings Button */}
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200 active:scale-95 shrink-0"
                title="Plan Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sleek Mobile Bottom App Bar (Sticky on phones with light clean theme) */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1 py-1.5 flex items-center justify-around shadow-lg safe-area-bottom"
      >
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'dashboard'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Home' : 'Home'}</span>
        </button>

        <button
          onClick={() => setActiveTab('tree')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'tree'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Tree' : 'Tree'}</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'simulator'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Calc' : 'Calc'}</span>
        </button>

        <button
          onClick={() => setActiveTab('incomes')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'incomes'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Incomes' : 'Incomes'}</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'ledger'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Payouts' : 'Payouts'}</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex flex-col items-center py-1.5 px-2.5 rounded-xl transition-all duration-150 active:scale-95 ${
            activeTab === 'members'
              ? 'bg-emerald-50 text-[#155e37] font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">{isHinglish ? 'Team' : 'Team'}</span>
        </button>
      </nav>
    </>
  );
};
