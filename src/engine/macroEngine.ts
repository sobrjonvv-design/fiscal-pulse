import { MacroIndicators, BudgetAllocation, ShockOption, ShockOptionEffect } from '../types';

export interface RoundResolution {
  nextState: MacroIndicators;
  totalTaxRevenue: number;
  totalInflows: number;
  totalExpenditure: number;
  mandatoryInterestDue: number;
  effectiveInterestRate: number;
  fiscalBalance: number;
  capitalDelta: number;
  capitalDeltaPct: number;
  fiscalStatus: 'SURPLUS' | 'DEFICIT';
  score: number;
  explanations: string[];
}

export interface BudgetPreview {
  totalTaxRevenue: number;
  totalInflows: number;
  totalExpenditure: number;
  mandatoryInterestDue: number;
  effectiveInterestRate: number;
  fiscalBalance: number;
  estimatedNetCash: number;
  fiscalStatus: 'SURPLUS' | 'DEFICIT';
}

export interface MasteryScoreReport {
  overallScore: number; // 0 - 100
  letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  fiscalDisciplineScore: number; // 0 - 25
  capitalGrowthScore: number;    // 0 - 25
  inflationControlScore: number; // 0 - 25
  debtSustainabilityScore: number; // 0 - 25
  summaryRemark: string;
}

const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, Number(val.toFixed(2))));

/**
 * Laffer curve effective yield calculation.
 * Diminishing tax returns and deadweight loss above optimal rate threshold.
 */
function calculateEffectiveTaxYield(rate: number, optimalRate: number, elasticity: number): number {
  const normRate = rate / 100;
  const normOptimal = optimalRate / 100;
  if (normRate <= normOptimal) {
    return normRate;
  }
  const excess = normRate - normOptimal;
  const lafferPenalty = Math.pow(excess, 1.55) * elasticity;
  return Math.max(0.03, normRate - lafferPenalty);
}

/**
 * Real-time pre-flight calculation of taxes, interest, and budget balance for UI sliders.
 */
export function calculateBudgetPreview(
  current: MacroIndicators,
  alloc: BudgetAllocation
): BudgetPreview {
  const compliance = current.complianceFactor;

  // Tax Yields with Laffer curve logic
  const corpEff = calculateEffectiveTaxYield(alloc.corporateTax, 22, 1.35);
  const incEff = calculateEffectiveTaxYield(alloc.incomeTax, 28, 1.20);
  const vatEff = calculateEffectiveTaxYield(alloc.vat, 16, 1.15);

  const corpRev = current.gdp * 0.25 * corpEff * compliance;
  const incRev = current.gdp * 0.40 * incEff * compliance;
  const vatRev = current.gdp * 0.35 * vatEff * compliance;

  const totalTaxRevenue = Number((corpRev + incRev + vatRev).toFixed(1));
  const totalInflows = Number((totalTaxRevenue + alloc.sovereignBorrowing).toFixed(1));

  // Sovereign Debt Servicing & Risk Premium
  const nominalDebt = (current.debtToGdp / 100) * current.gdp;
  const debtRiskPremium =
    current.debtToGdp > 90
      ? (current.debtToGdp - 90) * 0.075
      : current.debtToGdp > 60
      ? (current.debtToGdp - 60) * 0.030
      : 0;

  const effectiveInterestRate = clamp(current.baseInterestRate + debtRiskPremium, 1.5, 18.0);
  const mandatoryInterestDue = Number(((nominalDebt * (effectiveInterestRate / 100)) * 0.50).toFixed(1));

  const totalExpenditure = Number(
    (
      alloc.infrastructure +
      alloc.educationRd +
      alloc.healthcareSocial +
      alloc.industrialSubsidies +
      alloc.debtServicing
    ).toFixed(1)
  );

  // Fiscal Balance is Tax Revenue minus Expenditures (Structural Sovereign Account)
  const fiscalBalance = Number((totalTaxRevenue - totalExpenditure).toFixed(1));
  // Liquid cash change incorporates new borrowing
  const estimatedNetCash = Number((totalInflows - totalExpenditure).toFixed(1));
  const fiscalStatus = fiscalBalance >= 0 ? 'SURPLUS' : 'DEFICIT';

  return {
    totalTaxRevenue,
    totalInflows,
    totalExpenditure,
    mandatoryInterestDue,
    effectiveInterestRate,
    fiscalBalance,
    estimatedNetCash,
    fiscalStatus,
  };
}

/**
 * Core Macroeconomic Engine: Advances 1 Fiscal Year (Round).
 * Fully deterministic mathematical engine based on Keynesian Multiplier,
 * Laffer Curve, Crowding-Out, Okun's Law, and Solow-Romer Endogenous Growth Lag.
 */
export function simulateFiscalRound(
  current: MacroIndicators,
  alloc: BudgetAllocation,
  shockOption: ShockOption
): RoundResolution {
  const shockEffect: ShockOptionEffect = shockOption.effects;
  const explanations: string[] = [];

  // 1. Update Compliance Factor
  const nextCompliance = clamp(
    current.complianceFactor + (shockEffect.complianceDelta || 0),
    0.60,
    1.08
  );

  // 2. Compute Tax Revenue & Inflows
  const corpEff = calculateEffectiveTaxYield(alloc.corporateTax, 22, 1.35);
  const incEff = calculateEffectiveTaxYield(alloc.incomeTax, 28, 1.20);
  const vatEff = calculateEffectiveTaxYield(alloc.vat, 16, 1.15);

  const corpRev = current.gdp * 0.25 * corpEff * nextCompliance;
  const incRev = current.gdp * 0.40 * incEff * nextCompliance;
  const vatRev = current.gdp * 0.35 * vatEff * nextCompliance;

  const totalTaxRevenue = Number((corpRev + incRev + vatRev).toFixed(1));
  const totalInflows = Number((totalTaxRevenue + alloc.sovereignBorrowing).toFixed(1));

  // 3. Compute Debt Servicing & Risk Premium
  const nominalDebt = (current.debtToGdp / 100) * current.gdp;
  const debtRiskPremium =
    current.debtToGdp > 90
      ? (current.debtToGdp - 90) * 0.075
      : current.debtToGdp > 60
      ? (current.debtToGdp - 60) * 0.030
      : 0;

  const effectiveInterestRate = clamp(current.baseInterestRate + debtRiskPremium, 1.5, 18.0);
  const mandatoryInterestDue = Number(((nominalDebt * (effectiveInterestRate / 100)) * 0.50).toFixed(1));

  const totalExpenditure = Number(
    (
      alloc.infrastructure +
      alloc.educationRd +
      alloc.healthcareSocial +
      alloc.industrialSubsidies +
      alloc.debtServicing
    ).toFixed(1)
  );

  // 4. Update Sovereign Capital (Treasury)
  // Capital update formula: New Capital = Previous Capital + Total Tax Revenue + Borrowed Funds - Total Expenditures - Debt Interest Underpayment + Shock Impact
  const liquidCashDelta = Number(
    (totalInflows - totalExpenditure + (shockEffect.treasuryDelta || 0)).toFixed(1)
  );
  const nextTreasury = Number((current.treasury + liquidCashDelta).toFixed(1));
  const capitalDelta = Number((nextTreasury - current.treasury).toFixed(1));
  const capitalDeltaPct = Number(((capitalDelta / Math.max(1, current.treasury)) * 100).toFixed(1));

  const structuralFiscalBalance = Number((totalTaxRevenue - totalExpenditure).toFixed(1));
  const fiscalStatus: 'SURPLUS' | 'DEFICIT' = structuralFiscalBalance >= 0 ? 'SURPLUS' : 'DEFICIT';

  // Explanations for Capital & Fiscal Balance
  if (fiscalStatus === 'SURPLUS') {
    explanations.push(
      `Fiscal Surplus Achieved: Tax revenues ($${totalTaxRevenue}M) exceeded total expenditures ($${totalExpenditure}M) by +$${structuralFiscalBalance}M, strengthening sovereign capital reserves.`
    );
  } else {
    explanations.push(
      `Fiscal Deficit Incurred: Expenditures ($${totalExpenditure}M) exceeded tax revenues ($${totalTaxRevenue}M) by -$${Math.abs(structuralFiscalBalance)}M. Liquid capital ${capitalDelta >= 0 ? 'was maintained via borrowing' : `depleted by $${Math.abs(capitalDelta)}M`}.`
    );
  }

  // 5. Debt Servicing Penalty or Credit
  const debtServiceGap = mandatoryInterestDue - alloc.debtServicing;
  let creditPenaltyGdp = 0;
  if (debtServiceGap > 10) {
    creditPenaltyGdp = Math.min(3.8, (debtServiceGap / current.gdp) * 45);
    explanations.push(
      `Sovereign Debt Default Warning: Under-funding mandatory interest ($${alloc.debtServicing}M allocated vs $${mandatoryInterestDue}M required) sparked bond market risk panic, subtracting -${creditPenaltyGdp.toFixed(1)}% from GDP growth.`
    );
  } else if (alloc.debtServicing > mandatoryInterestDue + 20) {
    explanations.push(
      `Sovereign Deleveraging: Allocating $${alloc.debtServicing}M retired principal debt beyond mandatory interest ($${mandatoryInterestDue}M), lowering risk spreads.`
    );
  }

  // 6. Keynesian Multiplier & Spending Impulses
  const infraShare = alloc.infrastructure / current.gdp;
  const eduShare = alloc.educationRd / current.gdp;
  const healthShare = alloc.healthcareSocial / current.gdp;
  const industryShare = alloc.industrialSubsidies / current.gdp;

  // Short-run Multipliers: Infrastructure (1.45x), Subsidies (1.25x), Health/Social (1.05x), Education (0.70x immediate)
  const productiveSpendingImpulse =
    (infraShare * 1.45 + industryShare * 1.25 + healthShare * 1.05 + eduShare * 0.70) * 100 - 10.0;

  // Tax Drag & Laffer Distortion on Private Sector
  const corpDrag =
    (alloc.corporateTax - 20) * 0.08 +
    (alloc.corporateTax > 30 ? (alloc.corporateTax - 30) * 0.10 : 0);
  const incDrag = (alloc.incomeTax - 24) * 0.05;
  const vatDrag = (alloc.vat - 14) * 0.04;
  const totalTaxDrag = corpDrag + incDrag + vatDrag;

  // Crowding-Out from Sovereign Borrowing
  const borrowingShare = alloc.sovereignBorrowing / current.gdp;
  const crowdingOutPenalty =
    borrowingShare > 0.04
      ? (borrowingShare - 0.04) * 28 * (current.debtToGdp > 70 ? 1.5 : 1.0)
      : 0;

  // 7. Delayed Endogenous Growth (Solow-Romer Multiplier Lag in Rounds 3 - 5)
  const newHumanCapital = (eduShare + industryShare * 0.5) * 16 + (shockEffect.humanCapitalDelta || 0);
  const nextHumanCapitalStock = clamp(current.humanCapitalStock + newHumanCapital, 0, 30);

  let delayedEndogenousBonus = 0;
  if (current.round >= 2) {
    delayedEndogenousBonus = Number((current.humanCapitalStock * 0.18).toFixed(1));
    if (delayedEndogenousBonus >= 0.6) {
      explanations.push(
        `Delayed Endogenous Growth Multiplier: Prior-round investments in Education, R&D, and technical infrastructure matured into a +${delayedEndogenousBonus.toFixed(1)}% total factor productivity boost this fiscal year.`
      );
    }
  }

  // Combine GDP Growth components
  const rawGdpGrowth =
    2.5 +
    productiveSpendingImpulse * 0.38 -
    totalTaxDrag -
    crowdingOutPenalty -
    creditPenaltyGdp +
    delayedEndogenousBonus +
    (shockEffect.gdpGrowthDelta || 0);

  const nextGdpGrowth = clamp(rawGdpGrowth, -12.0, 15.0);
  const nextGdp = Number((current.gdp * (1 + nextGdpGrowth / 100)).toFixed(1));

  if (productiveSpendingImpulse * 0.38 > 1.2) {
    explanations.push(
      `Keynesian Expansion: High-multiplier capital spending on Infrastructure and Subsidies injected +${(productiveSpendingImpulse * 0.38).toFixed(1)}% into aggregate demand.`
    );
  } else if (productiveSpendingImpulse * 0.38 < -0.8) {
    explanations.push(
      `Fiscal Contraction: Depressed public expenditure relative to national output exerted a ${(productiveSpendingImpulse * 0.38).toFixed(1)}% Keynesian drag on economic activity.`
    );
  }

  if (totalTaxDrag > 1.0) {
    explanations.push(
      `Laffer Curve & Tax Drag: Elevated marginal tax rates dampened private business investment and household spending (-${totalTaxDrag.toFixed(1)}% GDP drag).`
    );
  }

  if (crowdingOutPenalty > 0.4) {
    explanations.push(
      `Crowding-Out Effect: Heavy sovereign bond issuance ($${alloc.sovereignBorrowing}M) absorbed private banking liquidity, driving up commercial borrowing costs (-${crowdingOutPenalty.toFixed(1)}% GDP).`
    );
  }

  // 8. Sovereign Debt Dynamics
  const principalPaid = Math.max(0, alloc.debtServicing - mandatoryInterestDue);
  const unpaidInterestCapitalized = Math.max(0, mandatoryInterestDue - alloc.debtServicing) * 1.25;
  const nextNominalDebt = Math.max(
    0,
    nominalDebt + alloc.sovereignBorrowing - principalPaid + unpaidInterestCapitalized
  );
  const computedDebtToGdp = (nextNominalDebt / nextGdp) * 100 + (shockEffect.debtToGdpDelta || 0);
  const nextDebtToGdp = clamp(computedDebtToGdp, 0, 250);

  // 9. CPI Inflation Dynamics
  const outputGap = (nextGdpGrowth - 3.0) * 0.30;
  const costPushTax = Math.max(0, (alloc.vat - 15) * 0.12);
  const monetizedDebtPush = borrowingShare > 0.05 ? (borrowingShare - 0.05) * 22 : 0;
  const meanRevert = (current.inflation - 2.5) * -0.22;

  const nextInflation = clamp(
    current.inflation +
      outputGap +
      costPushTax +
      monetizedDebtPush +
      meanRevert +
      (shockEffect.inflationDelta || 0),
    -2.0,
    30.0
  );

  if (costPushTax > 0.5) {
    explanations.push(
      `Cost-Push Inflation: High VAT rate (${alloc.vat}%) was passed onto consumer shelf prices, lifting CPI by +${costPushTax.toFixed(1)}%.`
    );
  }

  // 10. Unemployment Dynamics (Okun's Law)
  const okunChange = -(nextGdpGrowth - 2.8) * 0.45;
  const directJobs = -((infraShare - 0.04) * 12 + (eduShare - 0.04) * 8);
  const nextUnemployment = clamp(
    current.unemployment + okunChange + directJobs + (shockEffect.unemploymentDelta || 0),
    1.2,
    35.0
  );

  // 11. Public Approval Rating
  const socialBenefit = ((healthShare + eduShare) * 100 - 8.0) * 1.2;
  const taxBurden = -((alloc.incomeTax - 22) * 0.22 + (alloc.vat - 14) * 0.30);
  const miseryChange =
    -(nextInflation - current.inflation) * 0.80 -
    (nextUnemployment - current.unemployment) * 1.25;
  const insolvencyPenalty = nextTreasury < 0 ? -8.0 : 0;

  const nextApproval = clamp(
    current.approval +
      socialBenefit +
      taxBurden +
      miseryChange +
      insolvencyPenalty +
      (shockEffect.approvalDelta || 0),
    5,
    98
  );

  if (nextTreasury < 0) {
    explanations.push(
      `Treasury Liquidity Crisis: Sovereign capital reserves turned negative ($${nextTreasury}M), triggering costly emergency overdraft borrowing.`
    );
  }

  // Append shock rationale
  explanations.push(`Historical Crisis Choice [Option ${shockOption.id}]: ${shockOption.rationale}`);

  const nextState: MacroIndicators = {
    year: current.year + 1,
    round: current.round + 1,
    treasury: nextTreasury,
    initialTreasury: current.initialTreasury,
    gdp: nextGdp,
    gdpGrowth: nextGdpGrowth,
    debtToGdp: nextDebtToGdp,
    inflation: nextInflation,
    unemployment: nextUnemployment,
    approval: nextApproval,
    budgetBalance: structuralFiscalBalance,
    complianceFactor: nextCompliance,
    baseInterestRate: effectiveInterestRate,
    humanCapitalStock: nextHumanCapitalStock,
  };

  const scoreReport = calculateMasteryScore(nextState);

  return {
    nextState,
    totalTaxRevenue,
    totalInflows,
    totalExpenditure,
    mandatoryInterestDue,
    effectiveInterestRate,
    fiscalBalance: structuralFiscalBalance,
    capitalDelta,
    capitalDeltaPct,
    fiscalStatus,
    score: scoreReport.overallScore,
    explanations,
  };
}

/**
 * Computes the 0 - 100 Mastery Score across 4 pillars:
 * 1. Fiscal Discipline (25 pts)
 * 2. Capital Growth (25 pts)
 * 3. Inflation Control (25 pts)
 * 4. Debt Sustainability (25 pts)
 */
export function calculateMasteryScore(state: MacroIndicators): MasteryScoreReport {
  // 1. Fiscal Discipline (0 - 25)
  let fiscalDiscipline = 25;
  if (state.budgetBalance < 0) {
    const deficitShareOfGdp = (Math.abs(state.budgetBalance) / state.gdp) * 100;
    fiscalDiscipline = Math.max(4, 25 - deficitShareOfGdp * 2.2);
  }

  // 2. Capital Growth (0 - 25)
  const capitalGrowthRatio = state.treasury / state.initialTreasury;
  let capitalGrowthScore = 0;
  if (capitalGrowthRatio >= 1.5) capitalGrowthScore = 25;
  else if (capitalGrowthRatio >= 1.2) capitalGrowthScore = 22;
  else if (capitalGrowthRatio >= 1.0) capitalGrowthScore = 18;
  else if (capitalGrowthRatio >= 0.7) capitalGrowthScore = 12;
  else if (capitalGrowthRatio >= 0.3) capitalGrowthScore = 6;
  else capitalGrowthScore = 2;

  // 3. Inflation Control (0 - 25)
  const inflationGap = Math.abs(state.inflation - 2.5);
  const inflationControlScore = Math.max(3, Math.round(25 - inflationGap * 3.0));

  // 4. Debt Sustainability (0 - 25)
  let debtSustainabilityScore = 25;
  if (state.debtToGdp > 90) {
    debtSustainabilityScore = Math.max(3, 25 - (state.debtToGdp - 90) * 0.35);
  } else if (state.debtToGdp > 60) {
    debtSustainabilityScore = Math.max(14, 25 - (state.debtToGdp - 60) * 0.25);
  }

  const overallScore = Math.min(
    100,
    Math.max(
      10,
      Math.round(
        fiscalDiscipline + capitalGrowthScore + inflationControlScore + debtSustainabilityScore
      )
    )
  );

  let letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
  if (overallScore >= 92) letterGrade = 'A+';
  else if (overallScore >= 84) letterGrade = 'A';
  else if (overallScore >= 72) letterGrade = 'B';
  else if (overallScore >= 60) letterGrade = 'C';
  else if (overallScore >= 45) letterGrade = 'D';
  else letterGrade = 'F';

  let summaryRemark = '';
  if (overallScore >= 84) {
    summaryRemark =
      'Distinguished Statesperson: Exemplary fiscal stewardship, expanding sovereign capital while preserving price stability and debt solvency.';
  } else if (overallScore >= 72) {
    summaryRemark =
      'Competent Technocrat: Balanced macroeconomic performance with sound capital accumulation, though with minor structural deficits or inflation friction.';
  } else if (overallScore >= 60) {
    summaryRemark =
      'Fiscal Muddler: Maintained basic state solvency, but constrained growth through excessive tax drag or elevated sovereign debt burdens.';
  } else {
    summaryRemark =
      'Sovereign Distress: Capital reserves experienced severe depletion or debt spiraled beyond sustainable limits.';
  }

  return {
    overallScore,
    letterGrade,
    fiscalDisciplineScore: Math.round(fiscalDiscipline),
    capitalGrowthScore,
    inflationControlScore,
    debtSustainabilityScore: Math.round(debtSustainabilityScore),
    summaryRemark,
  };
}
