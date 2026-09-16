export type LegPosition = 'L' | 'R';

export interface Package {
  id: string;
  name: string;
  price: number;
  bv: number; // Business Volume (Point Value)
  dailyCapping: number; // Max binary payout per day
  roiDailyPercent: number; // Daily cashback / ROI %
  roiDays: number; // Number of days ROI is paid
  color: string;
  badge: string;
}

export interface Member {
  id: string; // e.g. "MLM-1001"
  name: string;
  email: string;
  phone: string;
  sponsorId: string; // Direct sponsor ID
  placementParentId: string | null; // Immediate tree parent
  position: LegPosition | null; // Left or Right of parent
  packageId: string;
  joinDate: string;
  isActive: boolean;
  leftBv: number;
  rightBv: number;
  carriedLeftBv: number;
  carriedRightBv: number;
  totalLeftCount: number;
  totalRightCount: number;
  directCount: number;
  rank: string;
  walletBalance: number;
  totalEarnings: number;
}

export type IncomeType = 
  | 'DIRECT' 
  | 'BINARY_MATCH' 
  | 'LEVEL' 
  | 'DAILY_ROI' 
  | 'RANK_REWARD' 
  | 'ROYALTY_POOL' 
  | 'SPILLOVER';

export interface IncomeTransaction {
  id: string;
  memberId: string;
  memberName: string;
  type: IncomeType;
  amount: number;
  bvReference?: number;
  description: string;
  date: string;
  status: 'PROCESSED' | 'PENDING' | 'HELD';
  tdsDeduction: number;
  adminDeduction: number;
  netPayable: number;
}

export interface RankReward {
  rank: string;
  requiredMatchedBv: number;
  rewardTitle: string;
  rewardItem: string;
  cashEquivalent: number;
  iconName: string;
  badgeColor: string;
}

export interface LevelConfig {
  level: number;
  percent: number;
  minDirectRequired: number;
}

export interface PlanSettings {
  companyName: string;
  currencySymbol: string;
  binaryMatchingPercent: number; // e.g. 10%
  binaryRatio: '1:1' | '2:1_1:2';
  directReferralPercent: number; // e.g. 10%
  defaultDailyCapping: number; // e.g. 5000
  tdsPercent: number; // e.g. 5%
  adminFeePercent: number; // e.g. 10%
  royaltyPoolPercent: number; // e.g. 3% of company turnover
  estimatedMonthlyCompanyTurnover: number;
  allowSpillover: boolean;
  packages: Package[];
  levels: LevelConfig[];
  ranks: RankReward[];
}

export interface SimulationResult {
  leftBv: number;
  rightBv: number;
  matchedBv: number;
  carryForwardLeft: number;
  carryForwardRight: number;
  powerLeg: 'LEFT' | 'RIGHT' | 'BALANCED';
  weakerLeg: 'LEFT' | 'RIGHT' | 'BALANCED';
  
  directIncome: number;
  binaryIncomeGross: number;
  binaryIncomeCapped: number;
  isCapped: boolean;
  levelIncome: number;
  roiIncome: number;
  rankRewardIncome: number;
  royaltyIncome: number;
  
  totalGrossIncome: number;
  tdsAmount: number;
  adminAmount: number;
  totalDeductions: number;
  netBankPayout: number;
}
