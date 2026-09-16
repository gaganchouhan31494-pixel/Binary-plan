import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeftRight, 
  Layers, 
  Clock, 
  Trophy, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { PlanSettings } from '../types';
import { formatCurrency, formatBV } from '../utils/mlmCalculator';

interface IncomeStreamsOverviewProps {
  settings: PlanSettings;
  isHinglish: boolean;
}

export const IncomeStreamsOverview: React.FC<IncomeStreamsOverviewProps> = ({
  settings,
  isHinglish,
}) => {
  const [activeIncomeKey, setActiveIncomeKey] = useState<string>('binary');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-50 text-[#155e37] border border-emerald-200">
                <Crown className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {isHinglish ? 'MLM Binary Plan Ki 7 Mukhya Aamadniyan (Incomes)' : '7 Core MLM Income Streams'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHinglish
                ? 'Is binary plan me har tarah ke distributor ke liye aamadni banayi gayi hai — working, non-working, matching aur leader club!'
                : 'Designed for both active team builders and passive participants with balanced mathematical stability.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#155e37] border border-emerald-200 font-bold">
              1:1 Carry Forward Active
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Income Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. DIRECT REFERRAL INCOME */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono border border-indigo-100">
                {settings.directReferralPercent}% Instant
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '1. Direct Referral Income' : '1. Direct Sponsor Bonus'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? `Aap jitne bhi direct members ko join karayenge, unke joining package BV ka seedha ${settings.directReferralPercent}% aapko milega.`
                : `Earn an instant ${settings.directReferralPercent}% direct referral bonus on the joining package BV of every member you personally sponsor.`}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200/80">
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Starter Package (₹1k):' : 'Starter Package:'}</span>
                <span className="font-mono text-emerald-700 font-bold">{formatCurrency(100)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Silver Package (₹5k):' : 'Silver Package:'}</span>
                <span className="font-mono text-emerald-700 font-bold">{formatCurrency(500)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Diamond Package (₹25k):' : 'Diamond Package:'}</span>
                <span className="font-mono text-emerald-700 font-bold">{formatCurrency(2500)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Frequency: Instant' : 'Payout: Instant'}</span>
            <span className="text-emerald-700 font-bold">{isHinglish ? 'Unlimited Directs' : 'No Limit'}</span>
          </div>
        </div>

        {/* 2. BINARY MATCHING PAIR INCOME */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-mono border border-blue-100">
                {settings.binaryMatchingPercent}% (1:1 Ratio)
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '2. Binary Matching / Pair Income' : '2. Binary Matching Income'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? `Left Leg aur Right Leg me jab 1:1 BV match hota hai, to matched BV ka ${settings.binaryMatchingPercent}% milta hai. Bacha hua volume agle cycle ke liye Carry Forward rehta hai!`
                : `Matched volume between Left and Right legs pays ${settings.binaryMatchingPercent}%. Unmatched volume carries forward indefinitely.`}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200/80">
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Matching Ratio:' : 'Ratio:'}</span>
                <span className="font-mono text-slate-900 font-bold">1:1 (L:R)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Carry Forward:' : 'Carry Forward:'}</span>
                <span className="text-emerald-700 font-bold">{isHinglish ? 'Haan (Lifetime)' : 'Yes (Lifetime)'}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Daily Capping:' : 'Daily Capping:'}</span>
                <span className="font-mono text-amber-700 font-bold">Up to {formatCurrency(60000)}/Day</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Frequency: Daily Cutoff' : 'Payout: Daily'}</span>
            <span className="text-blue-700 font-bold">{isHinglish ? 'Core MLM Engine' : 'Core Stream'}</span>
          </div>
        </div>

        {/* 3. GENERATION LEVEL COMMISSION */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-mono border border-purple-100">
                Level 1 to 7
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '3. Generation Level Income' : '3. Generation Level Bonus'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? 'Downline me jitni bhi joining ya upgrade hoti hai, har level se alag alag percentage bonus milta hai.'
                : 'Earn team overrides across up to 7 generational tiers on all new package activations.'}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-200/80 max-h-28 overflow-y-auto">
              {settings.levels.map((lvl) => (
                <div key={lvl.level} className="flex justify-between text-slate-700 text-[11px]">
                  <span>Level {lvl.level}:</span>
                  <span className="font-mono text-purple-700 font-bold">{lvl.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Depth: 7 Levels' : 'Depth: 7 Levels'}</span>
            <span className="text-purple-700 font-bold">{isHinglish ? 'Team Multiplier' : 'Team Override'}</span>
          </div>
        </div>

        {/* 4. DAILY CASHBACK / ROI */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-mono border border-teal-100">
                0.5% - 1% Daily
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '4. Daily Non-Working ROI / Cashback' : '4. Daily Package ROI'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? 'Bina kisi member ko jode bhi member ko daily return milta hai 200 dinon tak!'
                : 'Passive daily cashback paid automatically to all activated package holders for 200 business days.'}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200/80">
              <div className="flex justify-between text-slate-700">
                <span>Starter (₹1,000):</span>
                <span className="font-mono text-teal-700 font-bold">₹5 / Day (₹1,000 total)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Gold (₹10,000):</span>
                <span className="font-mono text-teal-700 font-bold">₹75 / Day (₹15,000 total)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Diamond VIP (₹25,000):</span>
                <span className="font-mono text-teal-700 font-bold">₹250 / Day (₹50,000 total)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Duration: 200 Din' : 'Duration: 200 Days'}</span>
            <span className="text-teal-700 font-bold">{isHinglish ? 'Non-Working' : 'Passive'}</span>
          </div>
        </div>

        {/* 5. RANK & REWARDS */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-mono border border-amber-100">
                Physical / Cash
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '5. Rank & Rewards Milestone' : '5. Rank Rewards Program'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? 'Matched BV milestone par branded physical gifts ya cash reward milte hain:'
                : 'Qualify for milestone rank awards with cash equivalent alternatives upon reaching target pair volumes.'}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200/80 max-h-32 overflow-y-auto">
              {settings.ranks.map((r) => (
                <div key={r.rank} className="flex justify-between items-center text-slate-700 text-[11px]">
                  <span className="font-bold">{r.rank}:</span>
                  <span className="font-mono text-amber-700 font-semibold">
                    {r.rewardTitle} ({formatCurrency(r.cashEquivalent)})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Target: Cumulative Match' : 'Target: Cumulative'}</span>
            <span className="text-amber-700 font-bold">{isHinglish ? 'Rewards Club' : 'Rewards Club'}</span>
          </div>
        </div>

        {/* 6. ROYALTY LEADERSHIP POOL */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-mono border border-rose-100">
                {settings.royaltyPoolPercent}% Company Turnover
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-[#155e37] transition">
              {isHinglish ? '6. Royalty Leadership Pool' : '6. Global Royalty Club'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {isHinglish
                ? `Company ke har mahine ke total turnover ka ${settings.royaltyPoolPercent}% hissa nikaal kar sabhi Diamond aur Crown achievers me barabar baanta jata hai.`
                : `Top rank achievers share a dedicated pool funded by ${settings.royaltyPoolPercent}% of the company's total monthly turnover.`}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200/80">
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Monthly Turnover (Demo):' : 'Turnover Demo:'}</span>
                <span className="font-mono text-slate-900 font-bold">
                  {formatCurrency(settings.estimatedMonthlyCompanyTurnover)}
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Total Royalty Pool (3%):' : '3% Pool Fund:'}</span>
                <span className="font-mono text-rose-700 font-bold">
                  {formatCurrency(
                    (settings.estimatedMonthlyCompanyTurnover * settings.royaltyPoolPercent) / 100
                  )}
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>{isHinglish ? 'Qualification:' : 'Qualification:'}</span>
                <span className="text-emerald-700 font-bold">Diamond VIP</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>{isHinglish ? 'Frequency: Har Mahine' : 'Payout: Monthly'}</span>
            <span className="text-rose-700 font-bold">{isHinglish ? 'Top Leaders' : 'Leadership'}</span>
          </div>
        </div>

        {/* 7. SPILLOVER BENEFIT (AUTO-SPILL) */}
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between shadow-sm group md:col-span-2 lg:col-span-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#155e37] flex items-center justify-center border border-emerald-200 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#155e37] transition">
                    {isHinglish ? '7. Auto-Spillover Support Benefit' : '7. Auto-Spillover Power Leg Advantage'}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#155e37]">
                    Binary System Magic
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  {isHinglish
                    ? 'Binary plan ki sabse badi taakat ye hoti hai ki har member ke paas sirf 2 hi direct leg hoti hain (Left & Right). Jab aapka Upline leader 3rd ya 4th member join karata hai, to wo automatically aapki downline me girta hai (Spillover). Isse aapka ek leg bina mehnat ke power leg ban jata hai!'
                    : 'In a binary plan, each node has strictly two positions. When active upline sponsors recruit beyond 2 directs, extra placements automatically "spill over" down into your binary branches, building your team volume automatically!'}
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs min-w-max">
              <span className="text-slate-600 block text-[11px] font-medium">{isHinglish ? 'Auto Placement Mode' : 'Spill Rule'}</span>
              <span className="font-mono text-[#155e37] font-extrabold">Extreme Left / Weaker Leg</span>
            </div>
          </div>
        </div>
      </div>

      {/* DEDUCTIONS & COMPLIANCE NOTE */}
      <div className="p-4 rounded-[22px] bg-white border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#155e37] shrink-0" />
          <span>
            {isHinglish
              ? `Govt Compliance Rules: TDS Katauti ${settings.tdsPercent}% (PAN Card linked) + System Admin Charge ${settings.adminFeePercent}% sabhi payouts par lagu hota hai.`
              : `Compliance & Deductions: ${settings.tdsPercent}% TDS with PAN verification and ${settings.adminFeePercent}% system administrative fee apply on all gross payouts.`}
          </span>
        </div>
        <span className="font-mono text-slate-800 font-bold shrink-0">
          TDS: {settings.tdsPercent}% | Admin: {settings.adminFeePercent}%
        </span>
      </div>
    </div>
  );
};
