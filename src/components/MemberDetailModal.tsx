import React from 'react';
import { 
  User, 
  X, 
  Award, 
  Phone, 
  Mail, 
  ArrowLeftRight, 
  TrendingUp, 
  Wallet, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { Member, Package, PlanSettings } from '../types';
import { formatCurrency, formatBV } from '../utils/mlmCalculator';

interface MemberDetailModalProps {
  member: Member | null;
  onClose: () => void;
  packages: Package[];
  settings: PlanSettings;
  onMakeRoot: (id: string) => void;
  isHinglish: boolean;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  onClose,
  packages,
  settings,
  onMakeRoot,
  isHinglish,
}) => {
  if (!member) return null;

  const pkg = packages.find((p) => p.id === member.packageId);
  const matchedBv = Math.min(member.leftBv, member.rightBv);
  const carryLeft = Math.max(0, member.leftBv - matchedBv);
  const carryRight = Math.max(0, member.rightBv - matchedBv);
  const binaryPayout = (matchedBv * settings.binaryMatchingPercent) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {member.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{pkg?.name}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{member.rank}</span>
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

        {/* Contact & Sponsor info */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Mobile:' : 'Phone:'}</span>
            </span>
            <span className="font-mono">{member.phone}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Email:</span>
            </span>
            <span className="truncate max-w-[200px]">{member.email}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Direct Sponsor:' : 'Sponsor:'}</span>
            </span>
            <span className="font-mono text-indigo-400">{member.sponsorId}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Join Date:' : 'Joined:'}</span>
            </span>
            <span>{member.joinDate}</span>
          </div>
        </div>

        {/* Binary Leg Volume Breakdown */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-blue-900/40">
            <span className="text-blue-400 font-semibold block text-[11px] mb-1">
              LEFT LEG BV ({member.totalLeftCount} Members)
            </span>
            <div className="font-mono font-bold text-white text-base">
              {formatBV(member.leftBv)}
            </div>
            {carryLeft > 0 && (
              <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                Carry: +{formatBV(carryLeft)}
              </span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-purple-900/40">
            <span className="text-purple-400 font-semibold block text-[11px] mb-1">
              RIGHT LEG BV ({member.totalRightCount} Members)
            </span>
            <div className="font-mono font-bold text-white text-base">
              {formatBV(member.rightBv)}
            </div>
            {carryRight > 0 && (
              <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                Carry: +{formatBV(carryRight)}
              </span>
            )}
          </div>
        </div>

        {/* Financial Earnings */}
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span>{isHinglish ? '1:1 Matched BV:' : 'Matched BV:'}</span>
            <span className="font-mono font-bold text-white">{formatBV(matchedBv)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>{isHinglish ? 'Binary Matching Earning:' : 'Binary Payout:'}</span>
            <span className="font-mono font-bold text-emerald-400">{formatCurrency(binaryPayout)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>{isHinglish ? 'Kul Aamadni (Lifetime):' : 'Total Earnings:'}</span>
            <span className="font-mono font-bold text-indigo-300">
              {formatCurrency(member.totalEarnings)}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onMakeRoot(member.id);
              onClose();
            }}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow"
          >
            <Layers className="w-4 h-4" />
            <span>{isHinglish ? 'Tree Me Root Banayein' : 'View in Binary Tree'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
