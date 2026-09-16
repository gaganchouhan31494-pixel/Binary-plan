import React, { useState } from 'react';
import { 
  User, 
  UserPlus, 
  ArrowLeftRight, 
  Search, 
  RotateCcw, 
  ChevronRight, 
  Info, 
  Award, 
  CheckCircle2, 
  TrendingUp,
  Layers,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Member, Package, PlanSettings } from '../types';
import { formatBV, formatCurrency } from '../utils/mlmCalculator';

interface GenealogyTreeProps {
  members: Member[];
  packages: Package[];
  settings: PlanSettings;
  onSelectSlot: (parentId: string, position: 'L' | 'R') => void;
  onSelectMember: (member: Member) => void;
  isHinglish: boolean;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({
  members,
  packages,
  settings,
  onSelectSlot,
  onSelectMember,
  isHinglish,
}) => {
  // Current view root
  const [rootId, setRootId] = useState<string>('MLM-1001');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'canvas' | 'cards'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentRoot = members.find((m) => m.id === rootId) || members[0];

  // Helper to find child by parent ID and position
  const getChild = (parentId: string, pos: 'L' | 'R'): Member | undefined => {
    return members.find((m) => m.placementParentId === parentId && m.position === pos);
  };

  // Search filtered results
  const searchResults = searchQuery.trim()
    ? members.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getPackage = (pkgId: string) => packages.find((p) => p.id === pkgId);

  // Render a tree node or an empty vacancy slot
  const renderNode = (
    member: Member | undefined,
    parentId: string,
    position: 'L' | 'R',
    levelDepth: number
  ) => {
    if (!member) {
      return (
        <div className="flex flex-col items-center">
          <div
            onClick={() => onSelectSlot(parentId, position)}
            className="group cursor-pointer w-32 xs:w-36 sm:w-44 p-2 sm:p-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 hover:bg-emerald-50/60 hover:border-[#155e37] transition-all flex flex-col items-center text-center shadow-xs active:scale-95"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200/60 group-hover:bg-[#155e37] group-hover:text-white text-slate-500 flex items-center justify-center mb-1 transition">
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 group-hover:text-[#155e37]">
              {position === 'L' ? (isHinglish ? '+ Left Slot' : '+ Vacant Left') : (isHinglish ? '+ Right Slot' : '+ Vacant Right')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400">
              {isHinglish ? 'Naya Member' : 'Click to Add'}
            </span>
          </div>
        </div>
      );
    }

    const pkg = getPackage(member.packageId);
    const matchedBv = Math.min(member.leftBv, member.rightBv);
    const carryLeft = Math.max(0, member.leftBv - matchedBv);
    const carryRight = Math.max(0, member.rightBv - matchedBv);
    const isCurrentRoot = member.id === rootId;

    return (
      <div className="flex flex-col items-center group relative">
        <div
          onClick={() => onSelectMember(member)}
          className={`cursor-pointer w-36 xs:w-40 sm:w-48 p-2 sm:p-3 rounded-xl border transition-all duration-200 shadow-xs active:scale-95 ${
            isCurrentRoot
              ? 'bg-white border-2 border-[#155e37] ring-4 ring-[#155e37]/15 shadow-md'
              : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
          }`}
        >
          {/* Header with Position & Package */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span
              className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded ${
                member.position === 'L'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : member.position === 'R'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-emerald-50 text-[#155e37] border border-emerald-200'
              }`}
            >
              {member.position ? (member.position === 'L' ? 'LEFT' : 'RIGHT') : 'ROOT'}
            </span>

            <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[75px] sm:max-w-[90px]">
              {pkg?.badge || 'Basic'}
            </span>
          </div>

          {/* Member Name & ID */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shrink-0">
              {member.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">{member.name}</p>
              <p className="text-[9px] sm:text-[10px] font-mono text-[#155e37] font-semibold truncate">{member.id}</p>
            </div>
          </div>

          {/* Left & Right BV Stats */}
          <div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-50 rounded-lg text-[9px] sm:text-[10px] border border-slate-200/70 mb-1.5">
            <div className="text-left border-r border-slate-200 pr-1">
              <span className="text-slate-500 block font-medium">L-BV</span>
              <span className="font-mono font-bold text-blue-600">
                {(member.leftBv / 1000).toFixed(0)}k
              </span>
              {carryLeft > 0 && (
                <span className="block text-[8px] text-emerald-600 font-mono font-bold">
                  +{(carryLeft / 1000).toFixed(0)}k
                </span>
              )}
            </div>
            <div className="text-right pl-1">
              <span className="text-slate-500 block font-medium">R-BV</span>
              <span className="font-mono font-bold text-purple-600">
                {(member.rightBv / 1000).toFixed(0)}k
              </span>
              {carryRight > 0 && (
                <span className="block text-[8px] text-emerald-600 font-mono font-bold">
                  +{(carryRight / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          </div>

          {/* Actions on card */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px] sm:text-[10px]">
            <span className="text-slate-500 font-medium">
              {member.totalLeftCount + member.totalRightCount} {isHinglish ? 'Team' : 'Team'}
            </span>

            {!isCurrentRoot && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRootId(member.id);
                }}
                className="text-[#155e37] font-bold hover:underline flex items-center gap-0.5"
                title="View sub-tree starting from this member"
              >
                <span>{isHinglish ? 'Focus' : 'Zoom'}</span>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Immediate children of current root
  const leftChild1 = getChild(currentRoot.id, 'L');
  const rightChild1 = getChild(currentRoot.id, 'R');

  // Grandchildren
  const leftGrandLeft = leftChild1 ? getChild(leftChild1.id, 'L') : undefined;
  const leftGrandRight = leftChild1 ? getChild(leftChild1.id, 'R') : undefined;

  const rightGrandLeft = rightChild1 ? getChild(rightChild1.id, 'L') : undefined;
  const rightGrandRight = rightChild1 ? getChild(rightChild1.id, 'R') : undefined;

  // Root stats
  const rootMatchedBv = Math.min(currentRoot.leftBv, currentRoot.rightBv);
  const rootCarryLeft = Math.max(0, currentRoot.leftBv - rootMatchedBv);
  const rootCarryRight = Math.max(0, currentRoot.rightBv - rootMatchedBv);
  const rootBinaryIncome = (rootMatchedBv * settings.binaryMatchingPercent) / 100;

  return (
    <div className="space-y-6">
      {/* Top Banner: Member Tree Volume & Carry Forward Summary */}
      <div className="bg-white border border-slate-200/80 rounded-[22px] p-4 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>{currentRoot.name}</span>
                <span className="font-mono text-sm px-2 py-0.5 rounded-full bg-emerald-50 text-[#155e37] border border-emerald-200 font-bold">
                  {currentRoot.id}
                </span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-[#155e37]">
                {currentRoot.rank}
              </span>
              {currentRoot.id !== 'MLM-1001' && (
                <button
                  onClick={() => setRootId('MLM-1001')}
                  className="flex items-center gap-1 text-xs text-[#155e37] hover:underline bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isHinglish ? 'Top Root Par Jayein' : 'Back to Top Root'}</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isHinglish
                ? `Binary Plan: 1:1 Matching (${settings.binaryMatchingPercent}%) | Capping: ₹${settings.defaultDailyCapping}/Day | Carry Forward Active`
                : `1:1 Binary Tree Structure | Power & Weaker Leg Tracking | Spillover Activated`}
            </p>
          </div>

          {/* Quick Search Member in Tree */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isHinglish ? "Member ID ya Naam search karein..." : "Search member ID or name..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155e37] transition"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-10 left-0 right-0 z-20 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setRootId(m.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">{m.name}</span>
                      <span className="text-slate-400 font-mono ml-2">({m.id})</span>
                    </div>
                    <span className="text-[10px] text-[#155e37] font-semibold">{m.rank}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Key Binary Business Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-4">
          <div className="p-2.5 sm:p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-blue-700 font-semibold mb-1">
              <span>{isHinglish ? 'Left Leg' : 'Left BV'}</span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                {currentRoot.totalLeftCount} {isHinglish ? 'Log' : 'P'}
              </span>
            </div>
            <div className="text-base sm:text-lg font-mono font-extrabold text-slate-900">
              {formatBV(currentRoot.leftBv)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 flex items-center justify-between">
              <span>{isHinglish ? 'Carry:' : 'Carry:'}</span>
              <span className="font-mono text-emerald-700 font-bold">{formatBV(rootCarryLeft)}</span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-purple-50/50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-purple-700 font-semibold mb-1">
              <span>{isHinglish ? 'Right Leg' : 'Right BV'}</span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-mono font-bold">
                {currentRoot.totalRightCount} {isHinglish ? 'Log' : 'P'}
              </span>
            </div>
            <div className="text-base sm:text-lg font-mono font-extrabold text-slate-900">
              {formatBV(currentRoot.rightBv)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 flex items-center justify-between">
              <span>{isHinglish ? 'Carry:' : 'Carry:'}</span>
              <span className="font-mono text-emerald-700 font-bold">{formatBV(rootCarryRight)}</span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#155e37] font-semibold mb-1">
              <span>{isHinglish ? 'Matched (1:1)' : 'Matched BV'}</span>
              <ArrowLeftRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#155e37]" />
            </div>
            <div className="text-base sm:text-lg font-mono font-extrabold text-[#155e37]">
              {formatBV(rootMatchedBv)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 flex items-center justify-between">
              <span>{isHinglish ? 'Payout:' : 'Payout:'}</span>
              <span className="font-mono text-slate-900 font-bold">{formatCurrency(rootBinaryIncome)}</span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-amber-50/50 rounded-xl border border-amber-100">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-amber-800 font-semibold mb-1">
              <span>{isHinglish ? 'Directs' : 'Referrals'}</span>
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
            </div>
            <div className="text-base sm:text-lg font-mono font-extrabold text-slate-900">
              {currentRoot.directCount} {isHinglish ? 'Direct' : 'Directs'}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 flex items-center justify-between">
              <span>{isHinglish ? 'Direct Inc:' : 'Income:'}</span>
              <span className="font-mono text-amber-700 font-bold">
                {formatCurrency(currentRoot.directCount * 1000)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2.5 sm:p-3 rounded-[18px] border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">
            {isHinglish ? 'View Mode:' : 'Display:'}
          </span>
          <div className="inline-flex rounded-full bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                viewMode === 'canvas'
                  ? 'bg-[#155e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌳 {isHinglish ? 'Graphical Tree' : 'Tree Canvas'}
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                viewMode === 'cards'
                  ? 'bg-[#155e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📱 {isHinglish ? 'Mobile Cards View' : 'Team Cards'}
            </button>
          </div>
        </div>

          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="hidden sm:inline font-medium">{isHinglish ? 'Zoom:' : 'Zoom:'}</span>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.65, Number((z - 0.1).toFixed(2))))}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono border border-slate-200 font-bold"
                title="Zoom Out"
              >
                -
              </button>
              <span className="font-mono text-[11px] text-slate-700 w-10 text-center font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono border border-slate-200 font-bold"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 border border-slate-200 ml-1 font-semibold"
              >
                Reset
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition ml-2 ${
                  isFullscreen
                    ? 'bg-[#155e37] text-white border-[#155e37] shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen Canvas'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
              </button>
            </div>
          )}
        </div>

        {/* VIEW MODE 1: GRAPHICAL CANVAS */}
        {viewMode === 'canvas' && (
          <div className={`${
            isFullscreen
              ? 'fixed inset-0 z-50 bg-[#f4f5f7] p-4 sm:p-8 overflow-auto flex flex-col'
              : 'bg-white border border-slate-200/80 rounded-[22px] p-3 sm:p-8 overflow-x-auto shadow-sm'
          }`}>
            {/* Fullscreen Header banner if active */}
            {isFullscreen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-base">🌳 {currentRoot.name} ({currentRoot.id})</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-[#155e37] border border-emerald-200 font-bold">
                    {currentRoot.rank}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.65, Number((z - 0.1).toFixed(2))))}
                    className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs text-slate-700 font-bold">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(1.2, Number((z + 0.1).toFixed(2))))}
                    className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition ml-3"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit Fullscreen</span>
                  </button>
                </div>
              </div>
            )}
          {/* Mobile Swipe Guidance Banner */}
          <div className="md:hidden flex items-center justify-between px-3 py-1.5 mb-4 bg-indigo-950/50 border border-indigo-800/60 rounded-xl text-[11px] text-indigo-300">
            <span>👈 {isHinglish ? 'Left-Right swipe karke poora tree dekhein' : 'Swipe left/right to view full tree'} 👉</span>
            <span className="text-[10px] text-slate-400">1:1 Binary</span>
          </div>

          <div
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="min-w-[680px] xs:min-w-[720px] sm:min-w-[760px] flex flex-col items-center select-none py-2 transition-transform duration-150"
          >
            {/* LEVEL 0: ROOT NODE */}
            <div className="relative mb-8">
              {renderNode(currentRoot, currentRoot.id, 'L', 0)}

              {/* Vertical connector from Root down */}
              <div className="absolute left-1/2 -bottom-8 w-0.5 h-8 bg-indigo-500/60 -translate-x-1/2" />
            </div>

            {/* LEVEL 1: LEFT & RIGHT NODES */}
            <div className="relative w-full max-w-2xl mb-8">
              {/* Horizontal connecting bar between Left & Right */}
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-indigo-500/60" />
              
              {/* Vertical stems dropping to Level 1 nodes */}
              <div className="absolute top-0 left-1/4 w-0.5 h-6 bg-indigo-500/60" />
              <div className="absolute top-0 right-1/4 w-0.5 h-6 bg-indigo-500/60" />

              <div className="pt-6 grid grid-cols-2 gap-6 sm:gap-8">
                {/* Left Branch */}
                <div className="flex flex-col items-center relative">
                  {renderNode(leftChild1, currentRoot.id, 'L', 1)}
                  {leftChild1 && (
                    <div className="absolute left-1/2 -bottom-8 w-0.5 h-8 bg-blue-500/60 -translate-x-1/2" />
                  )}
                </div>

                {/* Right Branch */}
                <div className="flex flex-col items-center relative">
                  {renderNode(rightChild1, currentRoot.id, 'R', 1)}
                  {rightChild1 && (
                    <div className="absolute left-1/2 -bottom-8 w-0.5 h-8 bg-purple-500/60 -translate-x-1/2" />
                  )}
                </div>
              </div>
            </div>

            {/* LEVEL 2: 4 GRANDCHILDREN NODES */}
            <div className="relative w-full max-w-4xl">
              {/* Left Sub-bar */}
              <div className="absolute top-0 left-[12.5%] right-[62.5%] h-0.5 bg-blue-500/60" />
              <div className="absolute top-0 left-[12.5%] w-0.5 h-6 bg-blue-500/60" />
              <div className="absolute top-0 right-[62.5%] w-0.5 h-6 bg-blue-500/60" />

              {/* Right Sub-bar */}
              <div className="absolute top-0 left-[62.5%] right-[12.5%] h-0.5 bg-purple-500/60" />
              <div className="absolute top-0 left-[62.5%] w-0.5 h-6 bg-purple-500/60" />
              <div className="absolute top-0 right-[12.5%] w-0.5 h-6 bg-purple-500/60" />

              <div className="pt-6 grid grid-cols-4 gap-3 sm:gap-6">
                {/* Left-Left */}
                <div className="flex justify-center">
                  {renderNode(
                    leftGrandLeft,
                    leftChild1?.id || currentRoot.id,
                    'L',
                    2
                  )}
                </div>

                {/* Left-Right */}
                <div className="flex justify-center">
                  {renderNode(
                    leftGrandRight,
                    leftChild1?.id || currentRoot.id,
                    'R',
                    2
                  )}
                </div>

                {/* Right-Left */}
                <div className="flex justify-center">
                  {renderNode(
                    rightGrandLeft,
                    rightChild1?.id || currentRoot.id,
                    'L',
                    2
                  )}
                </div>

                {/* Right-Right */}
                <div className="flex justify-center">
                  {renderNode(
                    rightGrandRight,
                    rightChild1?.id || currentRoot.id,
                    'R',
                    2
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tree Instructions & Legend */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="font-bold text-slate-700">{isHinglish ? 'Legend:' : 'Legend:'}</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 font-medium">Left Leg</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-slate-600 font-medium">Right Leg</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-slate-600 font-medium">Active</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 border border-dashed border-slate-400 rounded" />
                <span className="text-slate-600 font-medium">Vacant Slot</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#155e37] font-semibold">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isHinglish
                  ? 'Khali slot par tap karke naya member register karein!'
                  : 'Tap empty slot to add member under that position!'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: MOBILE-FRIENDLY HIERARCHICAL TEAM CARDS */}
      {viewMode === 'cards' && (
        <div className="space-y-4">
          {/* Active Root Card */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {currentRoot.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base">{currentRoot.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#155e37] font-mono font-bold border border-emerald-200">
                      {currentRoot.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentRoot.rank} • {getPackage(currentRoot.packageId)?.name} ({formatCurrency(getPackage(currentRoot.packageId)?.price || 0)})
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectMember(currentRoot)}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shrink-0"
              >
                {isHinglish ? 'Details' : 'Profile'}
              </button>
            </div>

            {/* Matched Volume Indicator Bar */}
            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5 font-semibold">
                <span>{isHinglish ? '1:1 Matching Balance Ratio' : '1:1 Volume Match'}</span>
                <span className="font-mono text-[#155e37] font-bold">{formatBV(rootMatchedBv)} BV Matched</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div 
                  className="bg-blue-500 h-full transition-all"
                  style={{
                    width: `${
                      currentRoot.leftBv + currentRoot.rightBv > 0
                        ? (currentRoot.leftBv / (currentRoot.leftBv + currentRoot.rightBv)) * 100
                        : 50
                    }%`
                  }}
                  title="Left BV Share"
                />
                <div 
                  className="bg-purple-500 h-full transition-all"
                  style={{
                    width: `${
                      currentRoot.leftBv + currentRoot.rightBv > 0
                        ? (currentRoot.rightBv / (currentRoot.leftBv + currentRoot.rightBv)) * 100
                        : 50
                    }%`
                  }}
                  title="Right BV Share"
                />
              </div>
              <div className="flex justify-between text-[10px] mt-1.5 text-slate-500 font-mono">
                <span className="text-blue-600 font-bold">Left: {formatBV(currentRoot.leftBv)} ({currentRoot.totalLeftCount} Members)</span>
                <span className="text-purple-600 font-bold">Right: {formatBV(currentRoot.rightBv)} ({currentRoot.totalRightCount} Members)</span>
              </div>
            </div>
          </div>

          {/* Two Branches: LEFT LEG & RIGHT LEG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT LEG CARD */}
            <div className="p-4 sm:p-5 rounded-[22px] bg-white border border-blue-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {isHinglish ? 'Left Leg (Power/Weaker)' : 'Left Leg Branch'}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {formatBV(currentRoot.leftBv)} BV
                </span>
              </div>

              {/* Direct Left Child or Vacancy */}
              {leftChild1 ? (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center text-xs">
                        {leftChild1.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{leftChild1.name}</p>
                        <p className="text-[10px] font-mono text-indigo-400">{leftChild1.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setRootId(leftChild1.id)}
                        className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium transition"
                      >
                        {isHinglish ? 'Deep View' : 'Explore'}
                      </button>
                      <button
                        onClick={() => onSelectMember(leftChild1)}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-850 text-[10px]">
                    <div className="text-slate-400">
                      Sub-Left: <strong className="text-blue-300 font-mono">{formatBV(leftChild1.leftBv)}</strong>
                    </div>
                    <div className="text-slate-400 text-right">
                      Sub-Right: <strong className="text-purple-300 font-mono">{formatBV(leftChild1.rightBv)}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onSelectSlot(currentRoot.id, 'L')}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-blue-900/60 hover:border-blue-500 bg-blue-950/20 text-blue-300 flex items-center justify-center gap-2 text-xs font-semibold transition active:scale-98"
                >
                  <UserPlus className="w-4 h-4 text-blue-400" />
                  <span>{isHinglish ? '+ Left Leg Me Naya Member Jodein' : '+ Register Left Member'}</span>
                </button>
              )}

              {/* Sub-grand children slots */}
              {leftChild1 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    {isHinglish ? 'Left Leg Downline Slots (Level 2):' : 'Level 2 Downline Slots:'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {leftGrandLeft ? (
                      <div 
                        onClick={() => setRootId(leftGrandLeft.id)}
                        className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] cursor-pointer hover:border-slate-700"
                      >
                        <span className="text-blue-400 font-semibold block truncate">L-L: {leftGrandLeft.name}</span>
                        <span className="text-slate-500 font-mono">{leftGrandLeft.id}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectSlot(leftChild1.id, 'L')}
                        className="p-2 rounded-lg border border-dashed border-slate-700 bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 text-[10px] text-center"
                      >
                        + Vacant L-L
                      </button>
                    )}

                    {leftGrandRight ? (
                      <div 
                        onClick={() => setRootId(leftGrandRight.id)}
                        className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] cursor-pointer hover:border-slate-700"
                      >
                        <span className="text-purple-400 font-semibold block truncate">L-R: {leftGrandRight.name}</span>
                        <span className="text-slate-500 font-mono">{leftGrandRight.id}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectSlot(leftChild1.id, 'R')}
                        className="p-2 rounded-lg border border-dashed border-slate-700 bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 text-[10px] text-center"
                      >
                        + Vacant L-R
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT LEG CARD */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-900/50 shadow-lg space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0" />
                  <h4 className="font-bold text-white text-sm">
                    {isHinglish ? 'Right Leg (Power/Weaker)' : 'Right Leg Branch'}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {formatBV(currentRoot.rightBv)} BV
                </span>
              </div>

              {/* Direct Right Child or Vacancy */}
              {rightChild1 ? (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-purple-500/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs">
                        {rightChild1.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">{rightChild1.name}</p>
                        <p className="text-[10px] font-mono text-indigo-400">{rightChild1.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setRootId(rightChild1.id)}
                        className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium transition"
                      >
                        {isHinglish ? 'Deep View' : 'Explore'}
                      </button>
                      <button
                        onClick={() => onSelectMember(rightChild1)}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-850 text-[10px]">
                    <div className="text-slate-400">
                      Sub-Left: <strong className="text-blue-300 font-mono">{formatBV(rightChild1.leftBv)}</strong>
                    </div>
                    <div className="text-slate-400 text-right">
                      Sub-Right: <strong className="text-purple-300 font-mono">{formatBV(rightChild1.rightBv)}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onSelectSlot(currentRoot.id, 'R')}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-purple-900/60 hover:border-purple-500 bg-purple-950/20 text-purple-300 flex items-center justify-center gap-2 text-xs font-semibold transition active:scale-98"
                >
                  <UserPlus className="w-4 h-4 text-purple-400" />
                  <span>{isHinglish ? '+ Right Leg Me Naya Member Jodein' : '+ Register Right Member'}</span>
                </button>
              )}

              {/* Sub-grand children slots */}
              {rightChild1 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    {isHinglish ? 'Right Leg Downline Slots (Level 2):' : 'Level 2 Downline Slots:'}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {rightGrandLeft ? (
                      <div 
                        onClick={() => setRootId(rightGrandLeft.id)}
                        className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] cursor-pointer hover:border-slate-700"
                      >
                        <span className="text-blue-400 font-semibold block truncate">R-L: {rightGrandLeft.name}</span>
                        <span className="text-slate-500 font-mono">{rightGrandLeft.id}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectSlot(rightChild1.id, 'L')}
                        className="p-2 rounded-lg border border-dashed border-slate-700 bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 text-[10px] text-center"
                      >
                        + Vacant R-L
                      </button>
                    )}

                    {rightGrandRight ? (
                      <div 
                        onClick={() => setRootId(rightGrandRight.id)}
                        className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] cursor-pointer hover:border-slate-700"
                      >
                        <span className="text-purple-400 font-semibold block truncate">R-R: {rightGrandRight.name}</span>
                        <span className="text-slate-500 font-mono">{rightGrandRight.id}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectSlot(rightChild1.id, 'R')}
                        className="p-2 rounded-lg border border-dashed border-slate-700 bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 text-[10px] text-center"
                      >
                        + Vacant R-R
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
