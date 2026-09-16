import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Calculator, 
  Crown, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ArrowUpRight,
  FileText,
  CreditCard,
  X
} from 'lucide-react';
import { PlanSettings } from '../types';

interface SidebarProps {
  activeTab: 'dashboard' | 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members';
  setActiveTab: (tab: 'dashboard' | 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members') => void;
  onOpenSettings: () => void;
  onOpenWithdraw: () => void;
  isHinglish: boolean;
  memberCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenWithdraw,
  isHinglish,
  memberCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const handleTabClick = (tab: 'dashboard' | 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members') => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-5 select-none">
      {/* Brand Logo & Title (matching Donezo logo with green spiral mark) */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Green Spiral Donezo-style Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-[#155e37]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 6a6 6 0 1 0 6 6" />
                <path d="M12 10a2 2 0 1 0 2 2" />
              </svg>
            </div>

            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                Donezo
              </span>
              <span className="block text-[10px] font-bold text-[#155e37] tracking-wider uppercase">
                Binary Plan Pro
              </span>
            </div>
          </div>

          {/* Close mobile button */}
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Section: MENU */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Menu
          </div>

          {/* 1. Dashboard */}
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 relative ${
              activeTab === 'dashboard'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Active green left indicator bar */}
              {activeTab === 'dashboard' && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#155e37] rounded-r-full" />
              )}
              <LayoutDashboard 
                className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-[#155e37]' : 'text-slate-400'}`} 
              />
              <span>{isHinglish ? 'Dashboard' : 'Dashboard'}</span>
            </div>
          </button>

          {/* 2. Binary Tree (Tasks in Donezo) */}
          <button
            onClick={() => handleTabClick('tree')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 relative ${
              activeTab === 'tree'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {activeTab === 'tree' && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#155e37] rounded-r-full" />
              )}
              <Layers 
                className={`w-4 h-4 ${activeTab === 'tree' ? 'text-[#155e37]' : 'text-slate-400'}`} 
              />
              <span>{isHinglish ? 'Binary Tree' : 'Binary Tree'}</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-[#155e37] border border-emerald-200 font-mono">
              {memberCount}+
            </span>
          </button>

          {/* 3. Calculator / Simulator (Calendar in Donezo) */}
          <button
            onClick={() => handleTabClick('simulator')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 relative ${
              activeTab === 'simulator'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {activeTab === 'simulator' && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#155e37] rounded-r-full" />
              )}
              <Calculator 
                className={`w-4 h-4 ${activeTab === 'simulator' ? 'text-[#155e37]' : 'text-slate-400'}`} 
              />
              <span>{isHinglish ? 'Calculator' : 'Simulator'}</span>
            </div>
          </button>

          {/* 4. 7 Incomes (Analytics in Donezo) */}
          <button
            onClick={() => handleTabClick('incomes')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 relative ${
              activeTab === 'incomes'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {activeTab === 'incomes' && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#155e37] rounded-r-full" />
              )}
              <Crown 
                className={`w-4 h-4 ${activeTab === 'incomes' ? 'text-[#155e37]' : 'text-slate-400'}`} 
              />
              <span>{isHinglish ? '7 Incomes' : '7 Incomes'}</span>
            </div>
          </button>

          {/* 5. Team (Team in Donezo) */}
          <button
            onClick={() => handleTabClick('members')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 relative ${
              activeTab === 'members'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {activeTab === 'members' && (
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#155e37] rounded-r-full" />
              )}
              <Users 
                className={`w-4 h-4 ${activeTab === 'members' ? 'text-[#155e37]' : 'text-slate-400'}`} 
              />
              <span>{isHinglish ? 'Team Downline' : 'Team'}</span>
            </div>
          </button>
        </div>

        {/* Section: GENERAL */}
        <div className="space-y-1 mt-6">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            General
          </div>

          {/* Settings */}
          <button
            onClick={() => {
              onOpenSettings();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 transition"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>{isHinglish ? 'Plan Settings' : 'Settings'}</span>
          </button>

          {/* Payouts / Ledger (Help in Donezo) */}
          <button
            onClick={() => handleTabClick('ledger')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
              activeTab === 'ledger'
                ? 'bg-white text-slate-900 font-bold border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>{isHinglish ? 'Payouts & Ledger' : 'Payouts'}</span>
          </button>

          {/* Withdraw */}
          <button
            onClick={() => {
              onOpenWithdraw();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 transition"
          >
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span>{isHinglish ? 'Bank Withdraw' : 'Withdraw'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Promo Card (matching "Download our Mobile App" in screenshot) */}
      <div className="mt-6 bg-[#0c2b1a] rounded-2xl p-4 text-white relative overflow-hidden shadow-sm">
        {/* Abstract wavy green background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z" fill="#22c55e" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10" />
            </svg>
          </div>
          <h4 className="text-xs font-bold leading-tight">
            {isHinglish ? 'Binary Plan Pro' : 'Download our Mobile App'}
          </h4>
          <p className="text-[10px] text-emerald-300/80 mt-1 leading-snug">
            {isHinglish ? '1:1 Matching & Real-time Live Cutoff' : 'Get easy in another way'}
          </p>

          <button
            onClick={() => handleTabClick('simulator')}
            className="mt-3 w-full bg-[#155e37] hover:bg-[#124e2e] text-white py-1.5 rounded-lg text-xs font-bold shadow-xs transition"
          >
            {isHinglish ? 'Quick Simulator' : 'Download'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200/80 bg-[#f8fafc]/90 sticky top-0 h-screen overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#f8fafc] shadow-2xl z-10 overflow-y-auto">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
