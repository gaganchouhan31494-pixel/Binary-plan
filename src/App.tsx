import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_PLAN_SETTINGS, 
  INITIAL_MEMBERS, 
  INITIAL_TRANSACTIONS 
} from './data/initialData';
import { Member, PlanSettings, IncomeTransaction, Package } from './types';
import { Navbar, AppTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { GenealogyTree } from './components/GenealogyTree';
import { BinarySimulator } from './components/BinarySimulator';
import { IncomeStreamsOverview } from './components/IncomeStreamsOverview';
import { PayoutLedger } from './components/PayoutLedger';
import { MemberDirectory } from './components/MemberDirectory';
import { AddMemberModal } from './components/AddMemberModal';
import { PlanSettingsModal } from './components/PlanSettingsModal';
import { MemberDetailModal } from './components/MemberDetailModal';
import { WithdrawModal } from './components/WithdrawModal';
import { formatCurrency, formatBV } from './utils/mlmCalculator';

export default function App() {
  const [settings, setSettings] = useState<PlanSettings>(INITIAL_PLAN_SETTINGS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState<IncomeTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [isHinglish, setIsHinglish] = useState<boolean>(true); // default Hinglish for user's prompt context

  // Modals state
  const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [slotPreset, setSlotPreset] = useState<{ parentId: string; position: 'L' | 'R' } | undefined>(undefined);
  const [cutoffSuccessMessage, setCutoffSuccessMessage] = useState<string | null>(null);

  // Active user / leader (MLM-1001)
  const leader = members.find((m) => m.id === 'MLM-1001') || members[0];

  // Open add member from tree slot click
  const handleSelectSlot = (parentId: string, position: 'L' | 'R') => {
    setSlotPreset({ parentId, position });
    setIsAddMemberOpen(true);
  };

  // Add new member and propagate BV up the tree
  const handleAddMember = (newMember: Member, packageBv: number) => {
    let updatedMembers = [...members, newMember];

    // 1. Credit direct referral income to sponsor
    const directBonus = (packageBv * settings.directReferralPercent) / 100;
    const tds = (directBonus * settings.tdsPercent) / 100;
    const admin = (directBonus * settings.adminFeePercent) / 100;
    const netBonus = directBonus - tds - admin;

    updatedMembers = updatedMembers.map((m) => {
      if (m.id === newMember.sponsorId) {
        return {
          ...m,
          directCount: m.directCount + 1,
          walletBalance: m.walletBalance + netBonus,
          totalEarnings: m.totalEarnings + directBonus,
        };
      }
      return m;
    });

    // 2. Propagate BV upwards through placement parent branch
    let currentParentId = newMember.placementParentId;
    let currentPos = newMember.position;

    while (currentParentId) {
      const parent = updatedMembers.find((m) => m.id === currentParentId);
      if (!parent) break;

      updatedMembers = updatedMembers.map((m) => {
        if (m.id === currentParentId) {
          if (currentPos === 'L') {
            return {
              ...m,
              leftBv: m.leftBv + packageBv,
              totalLeftCount: m.totalLeftCount + 1,
            };
          } else if (currentPos === 'R') {
            return {
              ...m,
              rightBv: m.rightBv + packageBv,
              totalRightCount: m.totalRightCount + 1,
            };
          }
        }
        return m;
      });

      // Move one level up
      currentPos = parent.position;
      currentParentId = parent.placementParentId;
    }

    setMembers(updatedMembers);

    // 3. Add transaction for sponsor
    const sponsor = updatedMembers.find((m) => m.id === newMember.sponsorId);
    const newTxn: IncomeTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      memberId: newMember.sponsorId,
      memberName: sponsor?.name || 'Sponsor',
      type: 'DIRECT',
      amount: directBonus,
      bvReference: packageBv,
      description: `Direct Sponsor Bonus from ${newMember.name} (${newMember.id})`,
      date: new Date().toISOString().split('T')[0],
      status: 'PROCESSED',
      tdsDeduction: tds,
      adminDeduction: admin,
      netPayable: netBonus,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  // Run Cycle Cutoff & Calculate Binary Payout
  const handleRunPayout = () => {
    let newTxns: IncomeTransaction[] = [];
    let updatedMembers = [...members];
    let totalPaidInCutoff = 0;

    updatedMembers = updatedMembers.map((m) => {
      const matched = Math.min(m.leftBv, m.rightBv);
      if (matched > 0) {
        const pkg = settings.packages.find((p) => p.id === m.packageId) || settings.packages[0];
        const grossPayout = (matched * settings.binaryMatchingPercent) / 100;
        const cappedPayout = Math.min(grossPayout, pkg.dailyCapping);
        const tds = (cappedPayout * settings.tdsPercent) / 100;
        const admin = (cappedPayout * settings.adminFeePercent) / 100;
        const netPayout = cappedPayout - tds - admin;

        totalPaidInCutoff += netPayout;

        // Carry forward remaining volume
        const carryLeft = Math.max(0, m.leftBv - matched);
        const carryRight = Math.max(0, m.rightBv - matched);

        newTxns.push({
          id: `CUTOFF-${Date.now().toString().slice(-4)}-${m.id}`,
          memberId: m.id,
          memberName: m.name,
          type: 'BINARY_MATCH',
          amount: cappedPayout,
          bvReference: matched,
          description: `Cycle Cutoff 1:1 Match on ${formatBV(matched)} (Carry L: ${formatBV(carryLeft)}, R: ${formatBV(carryRight)})`,
          date: new Date().toISOString().split('T')[0],
          status: 'PROCESSED',
          tdsDeduction: tds,
          adminDeduction: admin,
          netPayable: netPayout,
        });

        return {
          ...m,
          leftBv: carryLeft,
          rightBv: carryRight,
          carriedLeftBv: carryLeft,
          carriedRightBv: carryRight,
          walletBalance: m.walletBalance + netPayout,
          totalEarnings: m.totalEarnings + cappedPayout,
        };
      }
      return m;
    });

    if (newTxns.length > 0) {
      setMembers(updatedMembers);
      setTransactions((prev) => [...newTxns, ...prev]);

      setCutoffSuccessMessage(
        isHinglish
          ? `Cutoff Safal Raha! ${newTxns.length} members ko kul ${formatCurrency(totalPaidInCutoff)} matching payout release hua.`
          : `Cutoff Executed! ${formatCurrency(totalPaidInCutoff)} distributed across ${newTxns.length} qualified members.`
      );

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {
        // ignore
      }

      setTimeout(() => setCutoffSuccessMessage(null), 6000);
    } else {
      alert(
        isHinglish
          ? 'Abhi kisi bhi member ke dono legs (Left aur Right) me matching volume uplabdh nahi hai.'
          : 'No members currently have volume in both Left and Right legs to match.'
      );
    }
  };

  // Withdraw from wallet
  const handleConfirmWithdraw = (amount: number, accountDetails: string) => {
    const tds = (amount * settings.tdsPercent) / 100;
    const admin = (amount * settings.adminFeePercent) / 100;
    const net = amount - tds - admin;

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === leader.id) {
          return {
            ...m,
            walletBalance: Math.max(0, m.walletBalance - amount),
          };
        }
        return m;
      })
    );

    const withdrawTxn: IncomeTransaction = {
      id: `WTH-${Date.now().toString().slice(-4)}`,
      memberId: leader.id,
      memberName: leader.name,
      type: 'BINARY_MATCH', // ledger record
      amount: amount,
      description: `Bank Withdrawal to ${accountDetails}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PROCESSED',
      tdsDeduction: tds,
      adminDeduction: admin,
      netPayable: net,
    };

    setTransactions((prev) => [withdrawTxn, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-slate-900 flex flex-col selection:bg-[#155e37] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAddMember={() => {
          setSlotPreset(undefined);
          setIsAddMemberOpen(true);
        }}
        onRunPayout={handleRunPayout}
        walletBalance={leader.walletBalance}
        isHinglish={isHinglish}
        setIsHinglish={setIsHinglish}
      />

      {/* Floating Announcement Banner if cutoff just ran */}
      {cutoffSuccessMessage && (
        <div className="bg-[#155e37] text-white px-4 py-2.5 text-center text-xs font-bold shadow-md animate-bounce">
          🎉 {cutoffSuccessMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            members={members}
            settings={settings}
            transactions={transactions}
            walletBalance={leader.walletBalance}
            onOpenAddMember={() => {
              setSlotPreset(undefined);
              setIsAddMemberOpen(true);
            }}
            onRunPayout={handleRunPayout}
            onOpenWithdraw={() => setIsWithdrawOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            isHinglish={isHinglish}
            onSelectMember={(m) => setSelectedMember(m)}
          />
        )}

        {activeTab === 'tree' && (
          <GenealogyTree
            members={members}
            packages={settings.packages}
            settings={settings}
            onSelectSlot={handleSelectSlot}
            onSelectMember={(m) => setSelectedMember(m)}
            isHinglish={isHinglish}
          />
        )}

        {activeTab === 'simulator' && (
          <BinarySimulator settings={settings} isHinglish={isHinglish} />
        )}

        {activeTab === 'incomes' && (
          <IncomeStreamsOverview settings={settings} isHinglish={isHinglish} />
        )}

        {activeTab === 'ledger' && (
          <PayoutLedger
            transactions={transactions}
            settings={settings}
            walletBalance={leader.walletBalance}
            onOpenWithdrawModal={() => setIsWithdrawOpen(true)}
            isHinglish={isHinglish}
          />
        )}

        {activeTab === 'members' && (
          <MemberDirectory
            members={members}
            packages={settings.packages}
            settings={settings}
            onSelectMember={(m) => setSelectedMember(m)}
            isHinglish={isHinglish}
          />
        )}
      </main>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => {
          setIsAddMemberOpen(false);
          setSlotPreset(undefined);
        }}
        members={members}
        packages={settings.packages}
        settings={settings}
        initialParentId={slotPreset?.parentId}
        initialPosition={slotPreset?.position}
        onAddMember={handleAddMember}
        isHinglish={isHinglish}
      />

      <PlanSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
        isHinglish={isHinglish}
      />

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        packages={settings.packages}
        settings={settings}
        onMakeRoot={(id) => {
          setSelectedMember(null);
          setActiveTab('tree');
        }}
        isHinglish={isHinglish}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        walletBalance={leader.walletBalance}
        settings={settings}
        onConfirmWithdraw={handleConfirmWithdraw}
        isHinglish={isHinglish}
      />
    </div>
  );
}
