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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-[22px] p-6 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#155e37] flex items-center justify-center text-white text-lg font-bold shadow-sm">
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{member.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-[#155e37] font-bold border border-emerald-200">
                  {member.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{pkg?.name}</span>
                <span>•</span>
                <span className="text-[#155e37] font-bold">{member.rank}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact & Sponsor info */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Mobile:' : 'Phone:'}</span>
            </span>
            <span className="font-mono font-bold text-slate-900">{member.phone}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5" />
              <span>Email:</span>
            </span>
            <span className="truncate max-w-[200px] text-slate-800">{member.email}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Direct Sponsor:' : 'Sponsor:'}</span>
            </span>
            <span className="font-mono text-[#155e37] font-bold">{member.sponsorId}</span>
          </div>
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isHinglish ? 'Join Date:' : 'Joined:'}</span>
            </span>
            <span className="text-slate-800">{member.joinDate}</span>
          </div>
        </div>

        {/* Binary Leg Volume Breakdown */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-200">
            <span className="text-blue-700 font-bold block text-[11px] mb-1">
              LEFT LEG BV ({member.totalLeftCount} Members)
            </span>
            <div className="font-mono font-extrabold text-blue-900 text-base">
              {formatBV(member.leftBv)}
            </div>
            {carryLeft > 0 && (
              <span className="text-[10px] text-emerald-700 font-mono font-bold block mt-1">
                Carry: +{formatBV(carryLeft)}
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200">
            <span className="text-purple-700 font-bold block text-[11px] mb-1">
              RIGHT LEG BV ({member.totalRightCount} Members)
            </span>
            <div className="font-mono font-extrabold text-purple-900 text-base">
              {formatBV(member.rightBv)}
            </div>
            {carryRight > 0 && (
              <span className="text-[10px] text-emerald-700 font-mono font-bold block mt-1">
                Carry: +{formatBV(carryRight)}
              </span>
            )}
          </div>
        </div>

        {/* Financial Earnings */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-700">
            <span>{isHinglish ? '1:1 Matched BV:' : 'Matched BV:'}</span>
            <span className="font-mono font-bold text-slate-900">{formatBV(matchedBv)}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>{isHinglish ? 'Binary Matching Earning:' : 'Binary Payout:'}</span>
            <span className="font-mono font-bold text-[#155e37]">{formatCurrency(binaryPayout)}</span>
          </div>
          <div className="flex justify-between text-slate-700 border-t border-slate-200 pt-1.5 font-bold">
            <span>{isHinglish ? 'Kul Aamadni (Lifetime):' : 'Total Earnings:'}</span>
            <span className="font-mono text-[#155e37]">
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
            className="w-full py-2.5 rounded-full bg-[#155e37] hover:bg-[#114b2c] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>{isHinglish ? 'Tree Me Root Banayein' : 'View in Binary Tree'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
