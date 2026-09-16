import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowLeftRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Zap, 
  HelpCircle,
  Sparkles,
  Layers,
  Percent
} from 'lucide-react';
import { PlanSettings, Package, SimulationResult } from '../types';
import { calculateSimulation, formatCurrency, formatBV } from '../utils/mlmCalculator';

interface BinarySimulatorProps {
  settings: PlanSettings;
  isHinglish: boolean;
}

export const BinarySimulator: React.FC<BinarySimulatorProps> = ({
  settings,
  isHinglish,
}) => {
  // Simulator state
  const [leftBv, setLeftBv] = useState<number>(45000);
  const [rightBv, setRightBv] = useState<number>(30000);
  const [directCount, setDirectCount] = useState<number>(4);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(settings.packages[1].id); // Silver default
  const [teamLevelSalesBv, setTeamLevelSalesBv] = useState<number>(30000);

  const selectedPackage = settings.packages.find((p) => p.id === selectedPkgId) || settings.packages[0];

  // Dynamic calculation
  const result: SimulationResult = useMemo(() => {
    return calculateSimulation(
      leftBv,
      rightBv,
      directCount,
      selectedPackage,
      settings,
      teamLevelSalesBv
    );
  }, [leftBv, rightBv, directCount, selectedPackage, settings, teamLevelSalesBv]);

  // Preset scenarios
  const applyPreset = (l: number, r: number, directs: number, pkgIndex: number) => {
    setLeftBv(l);
    setRightBv(r);
    setDirectCount(directs);
    setSelectedPkgId(settings.packages[pkgIndex].id);
    setTeamLevelSalesBv(Math.round((l + r) * 0.4));
  };

  return (
    <div className="space-y-6">
      {/* Header card with presets */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isHinglish ? 'Binary Income Calculator & Simulator' : 'Binary Income Simulator'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isHinglish
                ? 'Left aur Right BV badal kar dekhein: Matching Income, Direct Bonus, Capping aur Net Payout kitna banega!'
                : 'Adjust Left & Right BV and direct referrals to see live calculations of all 6+ income streams.'}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">
              {isHinglish ? 'Presets:' : 'Presets:'}
            </span>
            <button
              onClick={() => applyPreset(10000, 10000, 2, 0)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700 shrink-0 active:scale-95"
            >
              10k Match
            </button>
            <button
              onClick={() => applyPreset(50000, 40000, 4, 1)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700 shrink-0 active:scale-95"
            >
              50k Match
            </button>
            <button
              onClick={() => applyPreset(250000, 180000, 8, 2)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition border border-slate-700 shrink-0 active:scale-95"
            >
              2.5L Match
            </button>
            <button
              onClick={() => applyPreset(800000, 800000, 12, 3)}
              className="px-2.5 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-200 text-xs transition border border-indigo-700/60 shrink-0 active:scale-95"
            >
              Crown VIP
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
          {/* Left Leg BV */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-900/40">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-blue-400">
                {isHinglish ? 'Left Leg BV (Business Volume)' : 'Left Leg BV'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                {formatBV(leftBv)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={leftBv}
              onChange={(e) => setLeftBv(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step="1000"
                min="0"
                value={leftBv}
                onChange={(e) => setLeftBv(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-800 font-mono text-white focus:outline-none focus:border-blue-500"
              />
              <span className="text-xs text-slate-500">BV</span>
            </div>
          </div>

          {/* Right Leg BV */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-900/40">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-purple-400">
                {isHinglish ? 'Right Leg BV (Business Volume)' : 'Right Leg BV'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {formatBV(rightBv)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={rightBv}
              onChange={(e) => setRightBv(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step="1000"
                min="0"
                value={rightBv}
                onChange={(e) => setRightBv(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-800 font-mono text-white focus:outline-none focus:border-purple-500"
              />
              <span className="text-xs text-slate-500">BV</span>
            </div>
          </div>

          {/* Direct Sponser Count */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-900/40">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-amber-400">
                {isHinglish ? 'Direct Sponsored Members' : 'Direct Referrals'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                {directCount} {isHinglish ? 'Direct' : 'Members'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={directCount}
              onChange={(e) => setDirectCount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min="0"
                max="100"
                value={directCount}
                onChange={(e) => setDirectCount(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-800 font-mono text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-xs text-slate-500">{isHinglish ? 'Log' : 'Nos'}</span>
            </div>
          </div>

          {/* User's Package */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-900/40">
            <label className="block text-xs font-semibold text-emerald-400 mb-2">
              {isHinglish ? 'Apna Joining Package' : 'Your Package (Capping)'}
            </label>
            <select
              value={selectedPkgId}
              onChange={(e) => setSelectedPkgId(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            >
              {settings.packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({formatCurrency(pkg.price)} - Cap: {formatCurrency(pkg.dailyCapping)}/day)
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 mt-2 flex justify-between">
              <span>{isHinglish ? 'Daily Capping Limit:' : 'Daily Capping:'}</span>
              <span className="font-mono text-emerald-400 font-bold">
                {formatCurrency(selectedPackage.dailyCapping)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Binary Leg Status & Capping Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Matched BV Card */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isHinglish ? '1:1 Matched Business Volume' : '1:1 Matched BV'}</span>
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {formatBV(result.matchedBv)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHinglish
              ? `${settings.binaryMatchingPercent}% Commission = ${formatCurrency(result.binaryIncomeGross)}`
              : `${settings.binaryMatchingPercent}% Match = ${formatCurrency(result.binaryIncomeGross)}`}
          </p>
        </div>

        {/* Carry Forward Card */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{isHinglish ? 'Carry Forward Agle Cycle ke Liye' : 'Carry Forward Volume'}</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-mono font-bold text-emerald-400">
              {result.carryForwardLeft > 0
                ? formatBV(result.carryForwardLeft)
                : result.carryForwardRight > 0
                ? formatBV(result.carryForwardRight)
                : '0 BV'}
            </div>
            {result.carryForwardLeft > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
                LEFT LEG
              </span>
            )}
            {result.carryForwardRight > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-medium">
                RIGHT LEG
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHinglish
              ? 'Unmatched BV waste nahi hota, next cycle me judega.'
              : 'Unmatched volume carries forward safely to next cycle.'}
          </p>
        </div>

        {/* Capping Status Card */}
        <div
          className={`p-4 rounded-xl border ${
            result.isCapped
              ? 'bg-amber-950/20 border-amber-800/60'
              : 'bg-emerald-950/20 border-emerald-800/60'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={result.isCapped ? 'text-amber-300' : 'text-emerald-300'}>
              {isHinglish ? 'Daily Binary Capping Status' : 'Daily Capping Limit'}
            </span>
            {result.isCapped ? (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {formatCurrency(result.binaryIncomeCapped)}
          </div>
          <p className="text-xs mt-1 text-slate-300">
            {result.isCapped
              ? isHinglish
                ? `Capped! Gross ${formatCurrency(result.binaryIncomeGross)} tha, par package cap ₹${selectedPackage.dailyCapping} mila.`
                : `Capped at package limit: ${formatCurrency(selectedPackage.dailyCapping)}`
              : isHinglish
              ? `Safe (Capping limit: ${formatCurrency(selectedPackage.dailyCapping)}/day)`
              : `Safe within daily cap of ${formatCurrency(selectedPackage.dailyCapping)}`}
          </p>
        </div>
      </div>

      {/* DETAILED 6+ INCOMES BREAKDOWN */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{isHinglish ? 'Sari Incomes Ka Live Breakdown' : 'All Income Streams Breakdown'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Direct Income */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-indigo-300">
                  {isHinglish ? '1. Direct Referral Income' : '1. Direct Referral Bonus'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {settings.directReferralPercent}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isHinglish
                  ? `${directCount} Direct × ${formatCurrency(selectedPackage.price)} × 10%`
                  : `${directCount} Direct referrals × package BV`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                {formatCurrency(result.directIncome)}
              </span>
            </div>
          </div>

          {/* 2. Binary Matching */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-300">
                  {isHinglish ? '2. Binary Matching / Pair Income' : '2. Binary Pair Match'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  {settings.binaryMatchingPercent}% (1:1)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isHinglish
                  ? `${formatBV(result.matchedBv)} Matched BV × 10% (After Capping)`
                  : `${formatBV(result.matchedBv)} Matched Volume`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                {formatCurrency(result.binaryIncomeCapped)}
              </span>
            </div>
          </div>

          {/* 3. Level Generation Income */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-purple-300">
                  {isHinglish ? '3. Generation Level Income' : '3. Generation Level Bonus'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Level 1-7
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isHinglish
                  ? 'Downline team sales par 5%, 3%, 2%, 1% commission'
                  : 'Commission overrides on levels 1 to 7'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                {formatCurrency(result.levelIncome)}
              </span>
            </div>
          </div>

          {/* 4. Daily ROI / Cashback */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-teal-300">
                  {isHinglish ? '4. Daily Non-Working ROI' : '4. Daily Package ROI'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300">
                  {selectedPackage.roiDailyPercent}% / Day
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isHinglish
                  ? `${formatCurrency(selectedPackage.price)} par roj ₹${(selectedPackage.price * selectedPackage.roiDailyPercent) / 100} (${selectedPackage.roiDays} Din)`
                  : `Daily cashback on ${selectedPackage.name}`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Daily Credit:' : 'Daily:'}</span>
              <span className="text-base font-mono font-bold text-emerald-400">
                {formatCurrency(result.roiIncome)}
              </span>
            </div>
          </div>

          {/* 5. Rank & Rewards */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-amber-300">
                  {isHinglish ? '5. Rank & Rewards Milestone' : '5. Rank Rewards'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Milestone
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {result.rankRewardIncome > 0
                  ? isHinglish
                    ? 'Badhai ho! Aapka matched BV reward ke liye qualify hua.'
                    : 'Qualified for milestone rank cash reward!'
                  : isHinglish
                  ? '10,000 BV matching par Star Rank (Watch / ₹2,500) shuru hota hai.'
                  : 'Unlocks starting at 10,000 matched BV.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Reward Value:' : 'Reward:'}</span>
              <span className="text-base font-mono font-bold text-amber-400">
                {formatCurrency(result.rankRewardIncome)}
              </span>
            </div>
          </div>

          {/* 6. Royalty Leadership Pool */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-rose-300">
                  {isHinglish ? '6. Royalty Leadership Pool' : '6. Royalty Club Pool'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  3% Turnover
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {result.royaltyIncome > 0
                  ? isHinglish
                    ? 'Diamond Leader qualified! Company monthly BV pool hissa.'
                    : 'Qualified for monthly company turnover pool share!'
                  : isHinglish
                  ? '5,00,000 BV matching par 3% company pool me hissa.'
                  : 'Unlocks at 500,000 matched BV.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">{isHinglish ? 'Pool Share:' : 'Pool Share:'}</span>
              <span className="text-base font-mono font-bold text-rose-400">
                {formatCurrency(result.royaltyIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* FINAL PAYOUT SETTLEMENT SUMMARY TABLE */}
        <div className="mt-6 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-900/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-indigo-900/40">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {isHinglish ? 'Final Payout Statement' : 'Payout Settlement'}
              </span>
              <h4 className="text-xl font-bold text-white mt-0.5">
                {isHinglish ? 'Shuddh Bank Khate Ka Payout (Net Payable)' : 'Net Bank Transfer Amount'}
              </h4>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400 block">{isHinglish ? 'Net Payout:' : 'Net Payout:'}</span>
              <span className="text-3xl font-mono font-extrabold text-emerald-400">
                {formatCurrency(result.netBankPayout)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-400 block">{isHinglish ? 'Kul Gross Aamadni' : 'Gross Earnings'}</span>
              <span className="font-mono font-bold text-white text-sm">
                {formatCurrency(result.totalGrossIncome)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">
                {isHinglish ? `TDS Katauti (${settings.tdsPercent}%)` : `TDS (${settings.tdsPercent}%)`}
              </span>
              <span className="font-mono font-semibold text-rose-400 text-sm">
                - {formatCurrency(result.tdsAmount)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">
                {isHinglish ? `Admin Charge (${settings.adminFeePercent}%)` : `Admin Fee (${settings.adminFeePercent}%)`}
              </span>
              <span className="font-mono font-semibold text-rose-400 text-sm">
                - {formatCurrency(result.adminAmount)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">{isHinglish ? 'Kul Katauti (Deductions)' : 'Total Deductions'}</span>
              <span className="font-mono font-semibold text-amber-300 text-sm">
                {formatCurrency(result.totalDeductions)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
