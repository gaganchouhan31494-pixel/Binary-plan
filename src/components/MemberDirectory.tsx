import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowLeftRight, 
  CheckCircle2, 
  Award, 
  Phone, 
  Mail,
  UserCheck
} from 'lucide-react';
import { Member, Package, PlanSettings } from '../types';
import { formatBV, formatCurrency } from '../utils/mlmCalculator';

interface MemberDirectoryProps {
  members: Member[];
  packages: Package[];
  settings: PlanSettings;
  onSelectMember: (m: Member) => void;
  isHinglish: boolean;
}

export const MemberDirectory: React.FC<MemberDirectoryProps> = ({
  members,
  packages,
  settings,
  onSelectMember,
  isHinglish,
}) => {
  const [search, setSearch] = useState<string>('');
  const [legFilter, setLegFilter] = useState<'ALL' | 'L' | 'R'>('ALL');
  const [pkgFilter, setPkgFilter] = useState<string>('ALL');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);
    const matchesLeg = legFilter === 'ALL' || m.position === legFilter;
    const matchesPkg = pkgFilter === 'ALL' || m.packageId === pkgFilter;
    return matchesSearch && matchesLeg && matchesPkg;
  });

  const getPackage = (pkgId: string) => packages.find((p) => p.id === pkgId);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-50 text-[#155e37] border border-emerald-200">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {isHinglish ? 'Binary Downline Team Directory' : 'Binary Team Directory'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHinglish
                ? 'Aapki poori downline team ki list — Left Leg aur Right Leg members, BV volume aur rank ke sath.'
                : 'Complete registry of all binary distributors, leg placements, accumulated BV and earnings.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold">
              Total: {members.length} {isHinglish ? 'Members' : 'Distributors'}
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHinglish ? "Search Member ID, Naam ya Phone..." : "Search member name, ID..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155e37]"
            />
          </div>

          {/* Leg Filter */}
          <div>
            <select
              value={legFilter}
              onChange={(e) => setLegFilter(e.target.value as 'ALL' | 'L' | 'R')}
              className="w-full px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#155e37]"
            >
              <option value="ALL">{isHinglish ? 'Sabhi Legs (Left + Right)' : 'All Legs (L & R)'}</option>
              <option value="L">{isHinglish ? 'Kewal Left Leg Members' : 'Left Leg Only'}</option>
              <option value="R">{isHinglish ? 'Kewal Right Leg Members' : 'Right Leg Only'}</option>
            </select>
          </div>

          {/* Package Filter */}
          <div>
            <select
              value={pkgFilter}
              onChange={(e) => setPkgFilter(e.target.value)}
              className="w-full px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#155e37]"
            >
              <option value="ALL">{isHinglish ? 'Sabhi Packages' : 'All Packages'}</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} ({formatCurrency(pkg.price)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Cards View (md:hidden) */}
        <div className="md:hidden mt-4 space-y-3">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              {isHinglish ? 'Koi member nahi mila.' : 'No members found.'}
            </div>
          ) : (
            filteredMembers.map((m) => {
              const pkg = getPackage(m.packageId);
              return (
                <div
                  key={m.id}
                  onClick={() => onSelectMember(m)}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition cursor-pointer space-y-2.5 shadow-sm active:scale-98"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#155e37] flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs truncate">{m.name}</div>
                        <div className="text-[10px] font-mono text-[#155e37] font-semibold">{m.id}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          m.position === 'L'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : m.position === 'R'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-[#155e37] border border-emerald-200'
                        }`}
                      >
                        {m.position ? (m.position === 'L' ? 'LEFT' : 'RIGHT') : 'ROOT'}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                        {m.rank}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2 bg-white rounded-xl border border-slate-200 text-[10px]">
                    <div>
                      <span className="text-slate-400 block">Package:</span>
                      <span className="text-slate-800 font-semibold truncate block">{pkg?.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block">Sponsor:</span>
                      <span className="font-mono text-slate-700">{m.sponsorId}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px]">
                    <div className="flex items-center gap-3">
                      <span>
                        L: <strong className="font-mono text-blue-700">{formatBV(m.leftBv)}</strong>
                      </span>
                      <span>
                        R: <strong className="font-mono text-purple-700">{formatBV(m.rightBv)}</strong>
                      </span>
                    </div>
                    <div className="text-right font-mono font-bold text-[#155e37]">
                      Earned: {formatCurrency(m.totalEarnings)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Member Table (hidden on md) */}
        <div className="hidden md:block mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Member Info</th>
                <th className="py-2.5 px-3">Placement & Leg</th>
                <th className="py-2.5 px-3">Sponsor ID</th>
                <th className="py-2.5 px-3">Package</th>
                <th className="py-2.5 px-3 text-right">Left BV</th>
                <th className="py-2.5 px-3 text-right">Right BV</th>
                <th className="py-2.5 px-3 text-right">Total Earned</th>
                <th className="py-2.5 px-3 text-center">Rank</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-400 font-sans">
                    {isHinglish ? 'Koi member nahi mila.' : 'No members found.'}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => {
                  const pkg = getPackage(m.packageId);
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{m.name}</div>
                        <div className="text-[10px] font-mono text-[#155e37] font-semibold">{m.id}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.position === 'L'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : m.position === 'R'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {m.position ? (m.position === 'L' ? 'LEFT LEG' : 'RIGHT LEG') : 'ROOT'}
                        </span>
                        {m.placementParentId && (
                          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                            Under: {m.placementParentId}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                        {m.sponsorId}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {pkg?.name}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-blue-700 whitespace-nowrap">
                        {formatBV(m.leftBv)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-purple-700 whitespace-nowrap">
                        {formatBV(m.rightBv)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#155e37] whitespace-nowrap">
                        {formatCurrency(m.totalEarnings)}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                          {m.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => onSelectMember(m)}
                          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition"
                        >
                          {isHinglish ? 'Details' : 'View'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
