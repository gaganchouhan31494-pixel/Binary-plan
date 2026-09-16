import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Member, Package, PlanSettings } from '../types';
import { formatCurrency, formatBV } from '../utils/mlmCalculator';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  packages: Package[];
  settings: PlanSettings;
  initialParentId?: string;
  initialPosition?: 'L' | 'R';
  onAddMember: (newMember: Member, packageBv: number) => void;
  isHinglish: boolean;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  members,
  packages,
  settings,
  initialParentId,
  initialPosition,
  onAddMember,
  isHinglish,
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [sponsorId, setSponsorId] = useState<string>('MLM-1001');
  const [placementParentId, setPlacementParentId] = useState<string>('MLM-1001');
  const [position, setPosition] = useState<'L' | 'R'>('L');
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[1].id); // Silver default

  // Update when opened from tree vacancy slot
  useEffect(() => {
    if (initialParentId) {
      setPlacementParentId(initialParentId);
    }
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialParentId, initialPosition]);

  if (!isOpen) return null;

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];
  const isSpillover = sponsorId !== placementParentId;

  // Check if chosen position is already occupied
  const isSlotOccupied = members.some(
    (m) => m.placementParentId === placementParentId && m.position === position
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (isSlotOccupied) {
      alert(
        isHinglish
          ? 'Ye slot pehle se bhara hua hai! Kripya doosra slot ya position chunein.'
          : 'This position is already occupied. Please select another slot.'
      );
      return;
    }

    const newId = `MLM-${1000 + members.length + 1}`;
    const newMember: Member = {
      id: newId,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone: phone.trim() || '+91 98000 00000',
      sponsorId,
      placementParentId,
      position,
      packageId: selectedPkgId,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
      leftBv: 0,
      rightBv: 0,
      carriedLeftBv: 0,
      carriedRightBv: 0,
      totalLeftCount: 0,
      totalRightCount: 0,
      directCount: 0,
      rank: 'Distributor',
      walletBalance: 0,
      totalEarnings: 0,
    };

    onAddMember(newMember, selectedPkg.bv);
    onClose();
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isHinglish ? 'Naya Member Binary Tree Me Jodein' : 'Register New Binary Member'}
              </h3>
              <p className="text-xs text-slate-400">
                {isHinglish ? 'Tree me Left ya Right leg placement karein' : 'Direct or Spillover Placement'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isHinglish ? 'Pura Naam *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isHinglish ? 'Mobile Number' : 'Phone Number'}
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isHinglish ? 'Email Address (Apekshit)' : 'Email Address'}
            </label>
            <input
              type="email"
              placeholder="ramesh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Sponsor & Placement Parent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isHinglish ? 'Direct Sponsor ID (Jinhone Sponsor Kiya)' : 'Sponsor ID'}
              </label>
              <select
                value={sponsorId}
                onChange={(e) => setSponsorId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isHinglish ? 'Tree Placement Parent (Kiske Neeche)' : 'Placement Parent'}
              </label>
              <select
                value={placementParentId}
                onChange={(e) => setPlacementParentId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Leg Position Selection (L or R) */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              {isHinglish ? 'Placement Leg Position (Left ya Right)' : 'Leg Position'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPosition('L')}
                className={`py-2 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                  position === 'L'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-md shadow-blue-900/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>⬅️ LEFT LEG</span>
              </button>

              <button
                type="button"
                onClick={() => setPosition('R')}
                className={`py-2 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                  position === 'R'
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-md shadow-purple-900/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>RIGHT LEG ➡️</span>
              </button>
            </div>

            {isSlotOccupied && (
              <div className="mt-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-1.5 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isHinglish
                    ? 'Savdhaan: Chuna hua slot pehle se occupied hai!'
                    : 'Warning: Selected placement slot is already occupied.'}
                </span>
              </div>
            )}

            {isSpillover && !isSlotOccupied && (
              <div className="mt-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>
                  {isHinglish
                    ? 'Spillover Mode: Sponsor aur Placement alag hain, downline ko power support milega!'
                    : 'Spillover placement active: Team member will receive volume support!'}
                </span>
              </div>
            )}
          </div>

          {/* Joining Package Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              {isHinglish ? 'Joining Activation Package' : 'Package Selection'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedPkgId === pkg.id
                      ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{pkg.name}</span>
                    <span className="font-mono text-emerald-400 text-xs font-bold">
                      {formatCurrency(pkg.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                    <span>BV: {formatBV(pkg.bv)}</span>
                    <span>Cap: {formatCurrency(pkg.dailyCapping)}/d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Benefits Preview */}
          <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-[11px] space-y-1">
            <span className="text-slate-400 font-semibold block">
              {isHinglish ? 'Is Joining Se Turant Fayda:' : 'Immediate Volume Impact:'}
            </span>
            <div className="flex justify-between text-slate-300">
              <span>{isHinglish ? 'Direct Sponsor Bonus (10%):' : 'Direct Bonus:'}</span>
              <span className="font-mono text-emerald-400 font-bold">
                {formatCurrency((selectedPkg.bv * settings.directReferralPercent) / 100)}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>{isHinglish ? 'Upline Leg Me BV Credit:' : 'BV Credited to Leg:'}</span>
              <span className="font-mono text-blue-300 font-bold">+{formatBV(selectedPkg.bv)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
            >
              {isHinglish ? 'Cancel' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSlotOccupied}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-950"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isHinglish ? 'Confirm & Join Member' : 'Activate Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
