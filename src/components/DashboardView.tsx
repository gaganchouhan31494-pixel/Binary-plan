import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Layers, 
  Zap, 
  Play, 
  Pause, 
  Square, 
  ChevronRight,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Crown
} from 'lucide-react';
import { Member, PlanSettings, IncomeTransaction } from '../types';
import { formatCurrency, formatBV } from '../utils/mlmCalculator';

interface DashboardViewProps {
  members: Member[];
  settings: PlanSettings;
  transactions: IncomeTransaction[];
  walletBalance: number;
  onOpenAddMember: () => void;
  onRunPayout: () => void;
  onOpenWithdraw: () => void;
  onNavigateTab: (tab: 'tree' | 'simulator' | 'incomes' | 'ledger' | 'members') => void;
  isHinglish: boolean;
  onSelectMember: (m: Member) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  members,
  settings,
  transactions,
  walletBalance,
  onOpenAddMember,
  onRunPayout,
  onOpenWithdraw,
  onNavigateTab,
  isHinglish,
  onSelectMember,
}) => {
  // Leader profile (default MLM-1001)
  const leader = members.find((m) => m.id === 'MLM-1001') || members[0];

  // Calculations for stats
  const totalBv = leader.leftBv + leader.rightBv;
  const matchedBv = Math.min(leader.leftBv, leader.rightBv);
  const carryForwardBv = Math.abs(leader.leftBv - leader.rightBv);
  const powerLeg = leader.leftBv >= leader.rightBv ? 'Left' : 'Right';
  const directCount = leader.directCount || 4;

  // Percentage match for donut gauge
  const matchPercent = totalBv > 0 ? Math.min(100, Math.round((matchedBv * 2 / totalBv) * 100)) : 68;

  // Recent members list (4 members)
  const recentMembers = members.slice(1, 5);

  // Time tracker demo toggle
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [timerDisplay, setTimerDisplay] = useState<string>('01:24:08');

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isHinglish 
              ? 'Binary network, daily volume, aur payout streams ko aasani se manage karein.'
              : 'Plan, prioritize, and accomplish your binary network goals with ease.'}
          </p>
        </div>

        {/* Top Right Action Pill Buttons (Styled identical to the reference image) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddMember}
            className="flex items-center gap-2 bg-[#155e37] hover:bg-[#114c2c] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span>{isHinglish ? '+ Naya Member' : '+ Add Member'}</span>
          </button>

          <button
            onClick={onRunPayout}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 text-[#155e37]" />
            <span>{isHinglish ? 'Run Payout Cutoff' : 'Run Payout'}</span>
          </button>
        </div>
      </div>

      {/* ROW 1: 4 Top Stat Cards (Directly matching the 4 cards in the screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: HERO DEEP FOREST GREEN CARD (Total Projects -> Total BV) */}
        <div 
          onClick={() => onNavigateTab('tree')}
          className="bg-[#155e37] rounded-[22px] p-5 text-white shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition group relative overflow-hidden"
        >
          {/* Subtle wavy pattern background */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-32 h-32">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0,50 Q25,20 50,50 T100,50 Q75,80 50,50 T0,50" />
              <path d="M0,30 Q25,0 50,30 T100,30" />
              <path d="M0,70 Q25,40 50,70 T100,70" />
            </svg>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-emerald-100/90">
              {isHinglish ? 'Total Network BV' : 'Total Volume (BV)'}
            </span>
            <div className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-sm group-hover:rotate-45 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-slate-900" strokeWidth={2.5} />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
              {formatBV(totalBv)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              ↗
            </span>
            <span>{isHinglish ? '+15% pichhle cycle se jyada' : 'Increased from last cycle'}</span>
          </div>
        </div>

        {/* Card 2: Ended Projects -> Matched BV */}
        <div 
          onClick={() => onNavigateTab('simulator')}
          className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 hover:shadow-md transition group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              {isHinglish ? 'Matched BV (1:1)' : 'Matched BV (Pairs)'}
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-100 transition">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              {formatBV(matchedBv)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <span>{isHinglish ? '10% Matching Comm. Paid' : 'Balanced Binary Pairs'}</span>
          </div>
        </div>

        {/* Card 3: Running Projects -> Carry Forward BV */}
        <div 
          onClick={() => onNavigateTab('tree')}
          className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 hover:shadow-md transition group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              {isHinglish ? 'Carry Forward BV' : 'Carry Forward'}
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-100 transition">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              {formatBV(carryForwardBv)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
              ⚡
            </span>
            <span>{isHinglish ? `Stored in ${powerLeg} Leg` : `Active in ${powerLeg} Leg`}</span>
          </div>
        </div>

        {/* Card 4: Pending Project -> Direct Referrals */}
        <div 
          onClick={() => onNavigateTab('members')}
          className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 hover:shadow-md transition group"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              {isHinglish ? 'Direct Referrals' : 'Direct Sponsors'}
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-100 transition">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
              {directCount}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
              ★
            </span>
            <span>{isHinglish ? '10% Direct Bonus Active' : 'Qualified for Level Bonus'}</span>
          </div>
        </div>
      </div>

      {/* ROW 2: Middle 3 Cards (Project Analytics + Reminders + Project List) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Project Analytics (Volume Chart with custom pill bars & striped inactive days) - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isHinglish ? 'Binary Volume Analytics' : 'Volume Analytics'}
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Weekly Cycle
              </span>
            </div>

            {/* Custom Pill Bars Chart matching the exact visual in the screenshot */}
            <div className="h-44 flex items-end justify-between px-2 pt-6 pb-2 relative">
              {/* Day 1: Sunday (Striped inactive pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-24 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div className="w-full h-full bg-striped opacity-60" />
                </div>
                <span className="text-xs font-medium text-slate-400">S</span>
              </div>

              {/* Day 2: Monday (Solid Deep Green pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-32 rounded-full bg-[#155e37] shadow-sm flex items-center justify-center" />
                <span className="text-xs font-bold text-slate-800">M</span>
              </div>

              {/* Day 3: Tuesday (Mint Green pill with 74% Tooltip Pill) */}
              <div className="flex flex-col items-center gap-2 relative">
                {/* Floating Tooltip Pill */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-sm rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-800 whitespace-nowrap">
                  74%
                </div>
                <div className="w-8 sm:w-10 h-28 rounded-full bg-[#34d399] shadow-sm" />
                <span className="text-xs font-bold text-slate-800">T</span>
              </div>

              {/* Day 4: Wednesday (Dark Forest Green pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-36 rounded-full bg-[#0d3f23] shadow-sm" />
                <span className="text-xs font-bold text-slate-800">W</span>
              </div>

              {/* Day 5: Thursday (Striped pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-26 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div className="w-full h-full bg-striped opacity-60" />
                </div>
                <span className="text-xs font-medium text-slate-400">T</span>
              </div>

              {/* Day 6: Friday (Striped pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-22 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div className="w-full h-full bg-striped opacity-60" />
                </div>
                <span className="text-xs font-medium text-slate-400">F</span>
              </div>

              {/* Day 7: Saturday (Striped pill) */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 sm:w-10 h-28 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                  <div className="w-full h-full bg-striped opacity-60" />
                </div>
                <span className="text-xs font-medium text-slate-400">S</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Left: <strong className="text-slate-800 font-mono">{formatBV(leader.leftBv)}</strong></span>
            <span>Right: <strong className="text-slate-800 font-mono">{formatBV(leader.rightBv)}</strong></span>
            <span className="text-emerald-700 font-semibold">{isHinglish ? '1:1 Balanced' : 'Optimal'}</span>
          </div>
        </div>

        {/* Card 2: Reminders -> Daily Binary Cutoff & Meeting Card - 4 cols */}
        <div className="lg:col-span-4 bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isHinglish ? 'Cutoff Reminder' : 'Reminders'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {isHinglish ? 'Daily Binary Pair Matching Cutoff' : 'Binary Pair Matching Cutoff'}
            </h3>
            
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Time : 11:59 pm Daily (Midnight)
            </p>

            <div className="mt-4 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80 text-xs text-emerald-900 space-y-1">
              <div className="flex justify-between">
                <span>{isHinglish ? 'Estimated Matching:' : 'Pending Match:'}</span>
                <strong className="font-mono text-[#155e37]">{formatCurrency(matchedBv * 0.1)}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{isHinglish ? 'Daily Capping Limit:' : 'Daily Cap:'}</span>
                <span className="font-mono">₹{settings.defaultDailyCapping}/day</span>
              </div>
            </div>
          </div>

          <button
            onClick={onRunPayout}
            className="mt-5 w-full bg-[#155e37] hover:bg-[#114c2c] text-white py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>{isHinglish ? '⚡ Run Cutoff Payout' : 'Start Payout Calculation'}</span>
          </button>
        </div>

        {/* Card 3: Project -> Team Packages & Leaders List - 3 cols */}
        <div className="lg:col-span-3 bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {isHinglish ? 'Join Packages' : 'Packages'}
              </h3>
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-full transition"
              >
                <Plus className="w-3 h-3" />
                <span>New</span>
              </button>
            </div>

            {/* List with colorful icons matching image */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    //
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">Starter Pack</p>
                    <p className="text-[10px] text-slate-400">₹1,000 • 1,000 BV</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">10% Cap</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    ⎔
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">Silver Pack</p>
                    <p className="text-[10px] text-slate-400">₹5,000 • 5,000 BV</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold">Popular</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                    ✦
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">Gold Pack</p>
                    <p className="text-[10px] text-slate-400">₹10,000 • 10,000 BV</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">1.0% ROI</span>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                    ◈
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">Diamond VIP</p>
                    <p className="text-[10px] text-slate-400">₹25,000 • 25,000 BV</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-600 font-semibold">Max Cap</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('incomes')}
            className="mt-3 w-full text-center text-xs font-bold text-[#155e37] hover:underline py-1"
          >
            {isHinglish ? 'Sabhi 7 Incomes Dekhein →' : 'View All Incomes →'}
          </button>
        </div>
      </div>

      {/* ROW 3: Bottom 3 Cards (Team Collaboration + Binary Progress Gauge + Time Tracker Dark Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Team Collaboration (Recent members with avatars & status pills) - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isHinglish ? 'Team Downline Joinees' : 'Team Collaboration'}
              </h3>
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1 rounded-full transition"
              >
                <Plus className="w-3.5 h-3.5 text-slate-700" />
                <span>Add Member</span>
              </button>
            </div>

            {/* Members rows with avatars and badges */}
            <div className="space-y-3.5">
              {recentMembers.map((member, index) => {
                const statusPills = [
                  { label: 'Completed', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { label: 'In Progress', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { label: 'Pending', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
                  { label: 'In Progress', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                ];
                const badge = statusPills[index % statusPills.length];

                return (
                  <div 
                    key={member.id}
                    onClick={() => onSelectMember(member)}
                    className="flex items-center justify-between text-xs p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle with initials / emoji */}
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{member.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {member.position === 'L' ? 'Left Leg' : 'Right Leg'} • Sponsor: {member.sponsorId}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('members')}
            className="mt-4 pt-3 border-t border-slate-100 w-full text-center text-xs font-bold text-[#155e37] hover:underline"
          >
            {isHinglish ? 'Puri Team Directory Dekhein →' : 'View Full Team Directory →'}
          </button>
        </div>

        {/* Card 2: Project Progress -> Binary Match Ratio Gauge (41% donut/semi-circle arc) - 4 cols */}
        <div className="lg:col-span-4 bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              {isHinglish ? 'Binary Leg Matching Ratio' : 'Project Progress'}
            </h3>

            {/* Semi-circular gauge visual matching the 41% gauge in the screenshot */}
            <div className="flex flex-col items-center justify-center pt-2 pb-1 relative">
              <svg className="w-48 h-28" viewBox="0 0 100 55">
                {/* Background Arc (Gray Striped) */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                {/* Foreground Matched Arc (Deep Forest Green) */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#155e37"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray="126"
                  strokeDashoffset={126 - (126 * (matchPercent / 100))}
                  className="transition-all duration-700"
                />
              </svg>

              {/* Center Big Percentage Label */}
              <div className="absolute top-12 flex flex-col items-center">
                <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {matchPercent}%
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {isHinglish ? 'Volume Matched' : 'Project Ended'}
                </span>
              </div>
            </div>

            {/* Bottom 3 Legend Dots matching the screenshot */}
            <div className="flex items-center justify-center gap-4 text-xs mt-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#155e37]" />
                <span className="text-slate-600 text-[11px] font-medium">Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                <span className="text-slate-600 text-[11px] font-medium">In Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="text-slate-600 text-[11px] font-medium">Pending</span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[11px] text-slate-400">
              Left: {formatBV(leader.leftBv)} | Right: {formatBV(leader.rightBv)}
            </span>
          </div>
        </div>

        {/* Card 3: Time Tracker -> Dark Forest Green Wallet Card (with digital clock / balance & round controls) - 3 cols */}
        <div className="lg:col-span-3 bg-[#0d2f1f] rounded-[22px] p-5 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Organic green abstract wave lines in background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,100 C50,150 150,50 200,100 L200,200 L0,200 Z" fill="#22c55e" />
              <path d="M0,130 C70,90 130,170 200,130 L200,200 L0,200 Z" fill="#15803d" />
            </svg>
          </div>

          <div className="relative z-10">
            <span className="text-xs font-semibold text-emerald-200">
              {isHinglish ? 'E-Wallet & Time Tracker' : 'Time Tracker'}
            </span>

            {/* Big Digital Display (matching the 01:24:08 style in the screenshot!) */}
            <div className="my-5 text-center">
              <div className="text-3xl font-mono font-extrabold tracking-wider text-white">
                {timerDisplay}
              </div>
              <div className="text-xs text-emerald-300/80 font-mono mt-1">
                Balance: {formatCurrency(walletBalance)}
              </div>
            </div>

            {/* Circular Controls: Pause / Withdraw & Stop button */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md hover:bg-slate-100 transition active:scale-95"
                title={isTimerRunning ? 'Pause Tracker' : 'Start Tracker'}
              >
                {isTimerRunning ? (
                  <Pause className="w-4 h-4 fill-slate-900 text-slate-900" />
                ) : (
                  <Play className="w-4 h-4 fill-slate-900 text-slate-900 ml-0.5" />
                )}
              </button>

              <button
                onClick={onOpenWithdraw}
                className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-md transition active:scale-95"
                title="Bank Withdrawal"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>
          </div>

          <button
            onClick={onOpenWithdraw}
            className="relative z-10 mt-4 w-full py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100 text-xs font-bold border border-emerald-400/30 transition text-center"
          >
            {isHinglish ? 'Bank Withdraw Karein →' : 'Withdraw to Bank →'}
          </button>
        </div>
      </div>
    </div>
  );
};
