import React from 'react';
import { 
  Search, 
  Mail, 
  Bell, 
  Menu, 
  Globe, 
  Sparkles,
  Command
} from 'lucide-react';
import { Member, PlanSettings } from '../types';
import { formatCurrency } from '../utils/mlmCalculator';

interface HeaderBarProps {
  onToggleMobileMenu: () => void;
  leader: Member;
  walletBalance: number;
  isHinglish: boolean;
  setIsHinglish: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onToggleMobileMenu,
  leader,
  walletBalance,
  isHinglish,
  setIsHinglish,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#f4f5f7]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Button + Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Mobile hamburger button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 transition"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search task / member bar (matching screenshot with ⌘F shortcut badge) */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHinglish ? 'Search members, IDs, BV...' : 'Search task, members, BV...'}
              className="w-full pl-9 pr-12 py-2 bg-white rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#155e37] focus:ring-1 focus:ring-[#155e37] shadow-2xs transition"
            />
            {/* Shortcut badge ⌘F */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-400">
              <span>⌘</span>
              <span>F</span>
            </div>
          </div>
        </div>

        {/* Right: Language switch + Notifications + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setIsHinglish(!isHinglish)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition active:scale-95"
            title="Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#155e37]" />
            <span className="hidden sm:inline">{isHinglish ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Mail / Inbox Button */}
          <button
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-2xs transition active:scale-95 relative"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Notification Bell with Dot */}
          <button
            className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center shadow-2xs transition active:scale-95 relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>

          {/* User Profile Chip (matching Totok Michael chip in the screenshot) */}
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
            {/* Avatar image / circle */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 shadow-xs shrink-0 flex items-center justify-center text-white font-bold text-xs">
              <span className="text-sm">🧔🏽</span>
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-extrabold text-slate-900 leading-tight">
                {leader.name || 'Totok Michael'}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                {leader.email || 'tmichael20@mail.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
