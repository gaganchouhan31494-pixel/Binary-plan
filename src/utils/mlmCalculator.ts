import { Member, PlanSettings, SimulationResult, Package } from '../types';

/**
 * Format Indian / Global Currency
 */
export function formatCurrency(amount: number, symbol = '₹'): string {
  if (isNaN(amount)) return `${symbol}0`;
  const formatted = Math.round(amount).toLocaleString('en-IN');
  return `${symbol}${formatted}`;
}

/**
 * Format Business Volume (BV)
 */
export function formatBV(bv: number): string {
  if (isNaN(bv)) return '0 BV';
  return `${Math.round(bv).toLocaleString('en-IN')} BV`;
}

/**
 * Calculate full simulation based on inputs
 */
export function calculateSimulation(
  leftBv: number,
  rightBv: number,
  directCount: number,
  selectedPackage: Package,
  settings: PlanSettings,
  levelSalesEstimateBv = 0
): SimulationResult {
  const matchedBv = Math.min(leftBv, rightBv);
  const carryForwardLeft = Math.max(0, leftBv - matchedBv);
  const carryForwardRight = Math.max(0, rightBv - matchedBv);

  let powerLeg: 'LEFT' | 'RIGHT' | 'BALANCED' = 'BALANCED';
  let weakerLeg: 'LEFT' | 'RIGHT' | 'BALANCED' = 'BALANCED';
  if (leftBv > rightBv) {
    powerLeg = 'LEFT';
    weakerLeg = 'RIGHT';
  } else if (rightBv > leftBv) {
    powerLeg = 'RIGHT';
    weakerLeg = 'LEFT';
  }

  // 1. Direct Income = directCount * Package BV * directReferralPercent
  const directIncome = (directCount * selectedPackage.bv * settings.directReferralPercent) / 100;

  // 2. Binary Matching Income
  const binaryIncomeGross = (matchedBv * settings.binaryMatchingPercent) / 100;
  const cappingLimit = selectedPackage.dailyCapping || settings.defaultDailyCapping;
  const binaryIncomeCapped = Math.min(binaryIncomeGross, cappingLimit);
  const isCapped = binaryIncomeGross > cappingLimit;

  // 3. Level Income (Generation)
  let levelIncome = 0;
  if (levelSalesEstimateBv > 0) {
    // Distribute across unlocked levels
    settings.levels.forEach((lvl) => {
      if (directCount >= lvl.minDirectRequired) {
        levelIncome += (levelSalesEstimateBv * (lvl.percent / 100)) / settings.levels.length;
      }
    });
  } else {
    // Default estimated from team matched BV if no custom level BV provided
    levelIncome = Math.round(matchedBv * 0.03); // avg 3% across active levels
  }

  // 4. Daily ROI Income
  const roiIncome = (selectedPackage.price * selectedPackage.roiDailyPercent) / 100;

  // 5. Rank & Reward Income (check if matched BV qualifies for any reward)
  let rankRewardIncome = 0;
  const qualifiedRank = [...settings.ranks]
    .reverse()
    .find((r) => matchedBv >= r.requiredMatchedBv);
  if (qualifiedRank) {
    rankRewardIncome = qualifiedRank.cashEquivalent;
  }

  // 6. Royalty Pool Income (if qualified for high tier, e.g. >= 500,000 BV)
  let royaltyIncome = 0;
  if (matchedBv >= 500000) {
    // 3% of company monthly turnover shared among royalty pool
    royaltyIncome = (settings.estimatedMonthlyCompanyTurnover * (settings.royaltyPoolPercent / 100)) / 5; // e.g. 5 pool members
  }

  const totalGrossIncome =
    directIncome + binaryIncomeCapped + levelIncome + roiIncome + rankRewardIncome + royaltyIncome;

  const tdsAmount = (totalGrossIncome * settings.tdsPercent) / 100;
  const adminAmount = (totalGrossIncome * settings.adminFeePercent) / 100;
  const totalDeductions = tdsAmount + adminAmount;
  const netBankPayout = Math.max(0, totalGrossIncome - totalDeductions);

  return {
    leftBv,
    rightBv,
    matchedBv,
    carryForwardLeft,
    carryForwardRight,
    powerLeg,
    weakerLeg,
    directIncome,
    binaryIncomeGross,
    binaryIncomeCapped,
    isCapped,
    levelIncome,
    roiIncome,
    rankRewardIncome,
    royaltyIncome,
    totalGrossIncome,
    tdsAmount,
    adminAmount,
    totalDeductions,
    netBankPayout,
  };
}

/**
 * Get Children of a member in binary tree
 */
export function getTreeChildren(members: Member[], parentId: string) {
  const leftChild = members.find((m) => m.placementParentId === parentId && m.position === 'L');
  const rightChild = members.find((m) => m.placementParentId === parentId && m.position === 'R');
  return { leftChild, rightChild };
}

/**
 * Recalculate BV and team counts for a member from actual tree descendants
 */
export function calculateTreeMetrics(members: Member[], memberId: string) {
  let leftCount = 0;
  let rightCount = 0;
  let leftBv = 0;
  let rightBv = 0;

  const { leftChild, rightChild } = getTreeChildren(members, memberId);

  function countSubtree(nodeId: string): { count: number; bv: number } {
    const node = members.find((m) => m.id === nodeId);
    if (!node) return { count: 0, bv: 0 };

    const packageBv = 5000; // default estimated package BV
    let totalC = 1;
    let totalB = node.leftBv + node.rightBv + packageBv;

    const children = members.filter((m) => m.placementParentId === nodeId);
    children.forEach((c) => {
      const sub = countSubtree(c.id);
      totalC += sub.count;
    });

    return { count: totalC, bv: totalB };
  }

  if (leftChild) {
    const lSub = countSubtree(leftChild.id);
    leftCount = lSub.count;
    leftBv = leftChild.leftBv + leftChild.rightBv + 5000;
  }

  if (rightChild) {
    const rSub = countSubtree(rightChild.id);
    rightCount = rSub.count;
    rightBv = rightChild.leftBv + rightChild.rightBv + 5000;
  }

  return { leftCount, rightCount, leftBv, rightBv };
}
