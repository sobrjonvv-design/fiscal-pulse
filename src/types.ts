export interface MacroIndicators {
  year: number;
  round: number;
  treasury: number;          // Current Treasury Capital ($M)
  initialTreasury: number;   // Baseline Starting Capital ($M)
  gdp: number;               // Current Nominal GDP ($M)
  gdpGrowth: number;         // Real/Nominal Growth Rate (%)
  debtToGdp: number;         // Sovereign Debt as % of GDP
  inflation: number;         // Annual CPI Rate (%)
  unemployment: number;      // Unemployment Rate (%)
  approval: number;          // Public Approval (0-100%)
  budgetBalance: number;     // Annual Surplus / Deficit ($M)
  complianceFactor: number;  // Tax Collection Efficiency (0.60 - 1.05)
  baseInterestRate: number;  // Sovereign Base Yield (%)
  humanCapitalStock: number; // Accumulated Lagged R&D / Education Pool
}

export interface BudgetAllocation {
  // Revenues
  corporateTax: number;       // 10% - 45%
  incomeTax: number;          // 10% - 50%
  vat: number;                // 5% - 25%
  sovereignBorrowing: number; // $0M - $1,000M

  // Expenditures
  infrastructure: number;     // $M
  educationRd: number;        // $M
  healthcareSocial: number;   // $M
  industrialSubsidies: number;// $M
  debtServicing: number;      // $M (Mandatory baseline interest + discretionary principal)
}

export interface ShockOptionEffect {
  treasuryDelta?: number;       // Direct Treasury Cash impact ($M)
  gdpGrowthDelta?: number;      // Direct GDP Growth delta (% pts)
  debtToGdpDelta?: number;      // Debt-to-GDP delta (% pts)
  inflationDelta?: number;      // Inflation delta (% pts)
  unemploymentDelta?: number;   // Unemployment delta (% pts)
  approvalDelta?: number;       // Approval rating delta (pts)
  complianceDelta?: number;     // Tax compliance modifier
  humanCapitalDelta?: number;   // Long-run human capital delta
}

export interface ShockOption {
  id: 'A' | 'B' | 'C';
  label: string;
  description: string;
  rationale: string;
  effects: ShockOptionEffect;
}

export interface HistoricalShock {
  round: number;
  fiscalYearLabel: string;
  title: string;
  context: string;
  options: [ShockOption, ShockOption, ShockOption];
}

export interface HistoricalOutcome {
  summary: string;
  gdp: number;
  gdpGrowth: number;
  debtToGdp: number;
  inflation: number;
  unemployment: number;
  treasury: number;
  historicalCapitalTrajectory: number[]; // 5-year capital trajectory for benchmark chart
}

export interface CountryCase {
  id: string;
  codeNumber: string; // e.g. "01", "02", "03", "04"
  name: string;
  era: string;
  subtitle: string;
  currencySymbol: string;
  briefing: string;
  challenge: string;
  initialStats: MacroIndicators;
  defaultAllocations: BudgetAllocation;
  rounds: HistoricalShock[]; // Exactly 5 rounds
  historicalOutcome: HistoricalOutcome;
}

export interface ClassroomPlayer {
  id: string;
  name: string;
  roomCode: string;
  isHost: boolean;
  isAi: boolean;
  round: number;
  treasury: number;
  capitalDeltaPct: number;
  gdp: number;
  gdpGrowth: number;
  debtToGdp: number;
  fiscalStatus: 'SURPLUS' | 'DEFICIT';
  score: number;
  lastActive: number;
}

export interface RoomState {
  roomCode: string;
  hostId: string;
  caseId: string;
  status: 'LOBBY' | 'PLAYING' | 'FINISHED';
  currentRound: number;
  players: Record<string, ClassroomPlayer>;
  createdAt: number;
}
