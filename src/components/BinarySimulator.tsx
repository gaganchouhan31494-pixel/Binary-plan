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
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-[#155e37] border border-emerald-200">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {isHinglish ? 'Binary Income Calculator & Simulator' : 'Binary Income Simulator'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isHinglish
                ? 'Left aur Right BV badal kar dekhein: Matching Income, Direct Bonus, Capping aur Net Payout kitna banega!'
                : 'Adjust Left & Right BV and direct referrals to see live calculations of all 6+ income streams.'}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <span className="text-xs text-slate-500 font-semibold mr-1 shrink-0">
              {isHinglish ? 'Presets:' : 'Presets:'}
            </span>
            <button
              onClick={() => applyPreset(10000, 10000, 2, 0)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition border border-slate-200 shrink-0 active:scale-95"
            >
              10k Match
            </button>
            <button
              onClick={() => applyPreset(50000, 40000, 4, 1)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition border border-slate-200 shrink-0 active:scale-95"
            >
              50k Match
            </button>
            <button
              onClick={() => applyPreset(250000, 180000, 8, 2)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition border border-slate-200 shrink-0 active:scale-95"
            >
              2.5L Match
            </button>
            <button
              onClick={() => applyPreset(800000, 800000, 12, 3)}
              className="px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#155e37] text-xs font-bold transition border border-emerald-200 shrink-0 active:scale-95"
            >
              Crown VIP
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
          {/* Left Leg BV */}
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-blue-700">
                {isHinglish ? 'Left Leg BV (Business Volume)' : 'Left Leg BV'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold">
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
              className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step="1000"
                min="0"
                value={leftBv}
                onChange={(e) => setLeftBv(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
              />
              <span className="text-xs text-slate-500 font-semibold">BV</span>
            </div>
          </div>

          {/* Right Leg BV */}
          <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-purple-700">
                {isHinglish ? 'Right Leg BV (Business Volume)' : 'Right Leg BV'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold">
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
              className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step="1000"
                min="0"
                value={rightBv}
                onChange={(e) => setRightBv(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-purple-500 font-bold"
              />
              <span className="text-xs text-slate-500 font-semibold">BV</span>
            </div>
          </div>

          {/* Direct Sponser Count */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-amber-800">
                {isHinglish ? 'Direct Sponsored Members' : 'Direct Referrals'}
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold">
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
              className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min="0"
                max="100"
                value={directCount}
                onChange={(e) => setDirectCount(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-amber-500 font-bold"
              />
              <span className="text-xs text-slate-500 font-semibold">{isHinglish ? 'Log' : 'Nos'}</span>
            </div>
          </div>

          {/* User's Package */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100">
            <label className="block text-xs font-bold text-[#155e37] mb-2">
              {isHinglish ? 'Apna Joining Package' : 'Your Package (Capping)'}
            </label>
            <select
              value={selectedPkgId}
              onChange={(e) => setSelectedPkgId(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-[#155e37]"
            >
              {settings.packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({formatCurrency(pkg.price)} - Cap: {formatCurrency(pkg.dailyCapping)}/day)
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
              <span>{isHinglish ? 'Daily Capping Limit:' : 'Daily Capping:'}</span>
              <span className="font-mono text-[#155e37] font-bold">
                {formatCurrency(selectedPackage.dailyCapping)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Binary Leg Status & Capping Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Matched BV Card */}
        <div className="p-4 bg-white border border-slate-200/80 rounded-[22px] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
            <span>{isHinglish ? '1:1 Matched Business Volume' : '1:1 Matched BV'}</span>
            <ArrowLeftRight className="w-4 h-4 text-[#155e37]" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900">
            {formatBV(result.matchedBv)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isHinglish
              ? `${settings.binaryMatchingPercent}% Commission = ${formatCurrency(result.binaryIncomeGross)}`
              : `${settings.binaryMatchingPercent}% Match = ${formatCurrency(result.binaryIncomeGross)}`}
          </p>
        </div>

        {/* Carry Forward Card */}
        <div className="p-4 bg-white border border-slate-200/80 rounded-[22px] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
            <span>{isHinglish ? 'Carry Forward Agle Cycle ke Liye' : 'Carry Forward Volume'}</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-mono font-extrabold text-[#155e37]">
              {result.carryForwardLeft > 0
                ? formatBV(result.carryForwardLeft)
                : result.carryForwardRight > 0
                ? formatBV(result.carryForwardRight)
                : '0 BV'}
            </div>
            {result.carryForwardLeft > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                LEFT LEG
              </span>
            )}
            {result.carryForwardRight > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                RIGHT LEG
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isHinglish
              ? 'Unmatched BV waste nahi hota, next cycle me judega.'
              : 'Unmatched volume carries forward safely to next cycle.'}
          </p>
        </div>

        {/* Capping Status Card */}
        <div
          className={`p-4 rounded-[22px] border ${
            result.isCapped
              ? 'bg-amber-50/50 border-amber-200'
              : 'bg-emerald-50/50 border-emerald-200'
          } shadow-sm`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-semibold">
            <span className={result.isCapped ? 'text-amber-800' : 'text-[#155e37]'}>
              {isHinglish ? 'Daily Binary Capping Status' : 'Daily Capping Limit'}
            </span>
            {result.isCapped ? (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-[#155e37]" />
            )}
          </div>
          <div className="text-2xl font-mono font-extrabold text-slate-900">
            {formatCurrency(result.binaryIncomeCapped)}
          </div>
          <p className="text-xs mt-1 text-slate-600">
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
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{isHinglish ? 'Sari Incomes Ka Live Breakdown' : 'All Income Streams Breakdown'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Direct Income */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '1. Direct Referral Income' : '1. Direct Referral Bonus'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-[#155e37] font-bold">
                  {settings.directReferralPercent}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHinglish
                  ? `${directCount} Direct × ${formatCurrency(selectedPackage.price)} × 10%`
                  : `${directCount} Direct referrals × package BV`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-extrabold text-[#155e37]">
                {formatCurrency(result.directIncome)}
              </span>
            </div>
          </div>

          {/* 2. Binary Matching */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '2. Binary Matching / Pair Income' : '2. Binary Pair Match'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  {settings.binaryMatchingPercent}% (1:1)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHinglish
                  ? `${formatBV(result.matchedBv)} Matched BV × 10% (After Capping)`
                  : `${formatBV(result.matchedBv)} Matched Volume`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-extrabold text-[#155e37]">
                {formatCurrency(result.binaryIncomeCapped)}
              </span>
            </div>
          </div>

          {/* 3. Level Generation Income */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '3. Generation Level Income' : '3. Generation Level Bonus'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                  Level 1-7
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHinglish
                  ? 'Downline team sales par 5%, 3%, 2%, 1% commission'
                  : 'Commission overrides on levels 1 to 7'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Total Aamadni:' : 'Amount:'}</span>
              <span className="text-base font-mono font-extrabold text-[#155e37]">
                {formatCurrency(result.levelIncome)}
              </span>
            </div>
          </div>

          {/* 4. Daily ROI / Cashback */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '4. Daily Non-Working ROI' : '4. Daily Package ROI'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                  {selectedPackage.roiDailyPercent}% / Day
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHinglish
                  ? `${formatCurrency(selectedPackage.price)} par roj ₹${(selectedPackage.price * selectedPackage.roiDailyPercent) / 100} (${selectedPackage.roiDays} Din)`
                  : `Daily cashback on ${selectedPackage.name}`}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Daily Credit:' : 'Daily:'}</span>
              <span className="text-base font-mono font-extrabold text-[#155e37]">
                {formatCurrency(result.roiIncome)}
              </span>
            </div>
          </div>

          {/* 5. Rank & Rewards */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '5. Rank & Rewards Milestone' : '5. Rank Rewards'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                  Milestone
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {result.rankRewardIncome > 0
                  ? isHinglish
                    ? 'Badhai ho! Aapka matched BV reward ke liye qualify hua.'
                    : 'Qualified for milestone rank cash reward!'
                  : isHinglish
                  ? '10,000 BV matching par Star Rank (Watch / ₹2,500) shuru hota hai.'
                  : 'Unlocks starting at 10,000 matched BV.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Reward Value:' : 'Reward:'}</span>
              <span className="text-base font-mono font-extrabold text-amber-700">
                {formatCurrency(result.rankRewardIncome)}
              </span>
            </div>
          </div>

          {/* 6. Royalty Leadership Pool */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  {isHinglish ? '6. Royalty Leadership Pool' : '6. Royalty Club Pool'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  3% Turnover
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {result.royaltyIncome > 0
                  ? isHinglish
                    ? 'Diamond Leader qualified! Company monthly BV pool hissa.'
                    : 'Qualified for monthly company turnover pool share!'
                  : isHinglish
                  ? '5,00,000 BV matching par 3% company pool me hissa.'
                  : 'Unlocks at 500,000 matched BV.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">{isHinglish ? 'Pool Share:' : 'Pool Share:'}</span>
              <span className="text-base font-mono font-extrabold text-rose-700">
                {formatCurrency(result.royaltyIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* FINAL PAYOUT SETTLEMENT SUMMARY TABLE */}
        <div className="mt-6 p-4 sm:p-6 rounded-[22px] bg-[#155e37] text-white shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/20">
            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                {isHinglish ? 'Final Payout Statement' : 'Payout Settlement'}
              </span>
              <h4 className="text-xl font-extrabold text-white mt-0.5">
                {isHinglish ? 'Shuddh Bank Khate Ka Payout (Net Payable)' : 'Net Bank Transfer Amount'}
              </h4>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-emerald-100 block font-medium">{isHinglish ? 'Net Payout:' : 'Net Payout:'}</span>
              <span className="text-3xl font-mono font-extrabold text-white">
                {formatCurrency(result.netBankPayout)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-emerald-100 block font-medium">{isHinglish ? 'Kul Gross Aamadni' : 'Gross Earnings'}</span>
              <span className="font-mono font-extrabold text-white text-sm">
                {formatCurrency(result.totalGrossIncome)}
              </span>
            </div>
            <div>
              <span className="text-emerald-100 block font-medium">
                {isHinglish ? `TDS Katauti (${settings.tdsPercent}%)` : `TDS (${settings.tdsPercent}%)`}
              </span>
              <span className="font-mono font-bold text-rose-200 text-sm">
                - {formatCurrency(result.tdsAmount)}
              </span>
            </div>
            <div>
              <span className="text-emerald-100 block font-medium">
                {isHinglish ? `Admin Charge (${settings.adminFeePercent}%)` : `Admin Fee (${settings.adminFeePercent}%)`}
              </span>
              <span className="font-mono font-bold text-rose-200 text-sm">
                - {formatCurrency(result.adminAmount)}
              </span>
            </div>
            <div>
              <span className="text-emerald-100 block font-medium">{isHinglish ? 'Kul Katauti (Deductions)' : 'Total Deductions'}</span>
              <span className="font-mono font-bold text-amber-200 text-sm">
                {formatCurrency(result.totalDeductions)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
