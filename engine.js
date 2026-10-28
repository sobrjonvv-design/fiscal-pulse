/* ==========================================================================
   FISCAL PULSE — ECONOMIC SIMULATION & DYNAMIC SCORING ENGINE (v5)
   Handles:
   1. Live budget calculations (revenues, expenditures, debt service, balances)
   2. Target slider proximity scoring (0 to 50 points per round)
   3. Dynamic qualitative feedback generation (Capital flight, cost-of-living,
      sovereign debt default, monetary credit crunch, Solow growth, etc.)
   4. Deterministic macroeconomic round simulation (GDP, inflation, unemployment,
      debt-to-GDP, treasury, approval, human capital)
   Universal Module: Runs in Browser (window.FP_ENGINE) and Node.js (module.exports)
   ========================================================================== */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  if (typeof window !== 'undefined') {
    window.FP_ENGINE = factory();
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.FP_ENGINE = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, Number(val.toFixed(2))));
  }

  // ==========================================================================
  // 1. EFFECTIVE TAX YIELD (Laffer Curve Non-Linear Dynamics)
  // ==========================================================================
  function calculateEffectiveTaxYield(rate, optimalRate, elasticity) {
    const r = rate / 100;
    const opt = optimalRate / 100;
    if (r <= opt) return r;
    const excess = r - opt;
    const evasionPenalty = Math.pow(excess, 1.45) * elasticity;
    return Math.max(0.02, r - evasionPenalty);
  }

  // ==========================================================================
  // 2. LIVE BUDGET PREVIEW
  // ==========================================================================
  function calculateBudgetPreview(stats, sliders, country) {
    const gdp = stats.gdp || 1000;
    const compliance = stats.compliance || 0.92;

    // Tax revenues (% of GDP converted to currency)
    // Singapore/Norway/Greece/Germany base calibration
    const citEff = calculateEffectiveTaxYield(sliders.cit, 22, 1.35);
    const pitEff = calculateEffectiveTaxYield(sliders.pit, 26, 1.20);
    const vatEff = calculateEffectiveTaxYield(sliders.vat, 16, 1.15);

    // Cit tax base is ~18% of GDP, Pit is ~28% of GDP, Vat is ~38% of GDP
    const citRev = Number((gdp * 0.20 * citEff * compliance).toFixed(1));
    const pitRev = Number((gdp * 0.30 * pitEff * compliance).toFixed(1));
    const vatRev = Number((gdp * 0.40 * vatEff * compliance).toFixed(1));
    const totalTaxRevenue = Number((citRev + pitRev + vatRev).toFixed(1));

    // Sovereign Debt & Interest Calculation
    const nominalDebt = (stats.debtToGdp / 100) * gdp;
    // Risk premium rises non-linearly if debt-to-GDP exceeds 60% and 90%
    const baseRate = country && country.monetaryLocked ? 1.0 : sliders.rate;
    let riskSpread = 0;
    if (stats.debtToGdp > 120) {
      riskSpread = (stats.debtToGdp - 120) * 0.08 + 2.5;
    } else if (stats.debtToGdp > 80) {
      riskSpread = (stats.debtToGdp - 80) * 0.04;
    }
    const effectiveBorrowingRate = clamp(baseRate + riskSpread, 1.0, 22.0);

    // Mandatory annual debt interest due
    const debtInterestDue = Number(((nominalDebt * (effectiveBorrowingRate / 100)) * 0.50).toFixed(1));

    // Debt servicing paid based on slider (percentage of mandatory interest)
    const debtServicingPaid = Number((debtInterestDue * (sliders.debtPay / 100)).toFixed(1));

    // Programmatic Expenditures (% of GDP converted to currency)
    const infraExp = Number((gdp * (sliders.infra / 100)).toFixed(1));
    const eduExp = Number((gdp * (sliders.edu / 100)).toFixed(1));
    const healthExp = Number((gdp * (sliders.health / 100)).toFixed(1));
    const subsidyExp = Number((gdp * (sliders.subsidy / 100)).toFixed(1));
    const programmaticSpending = Number((infraExp + eduExp + healthExp + subsidyExp).toFixed(1));

    const totalExpenditure = Number((programmaticSpending + debtServicingPaid).toFixed(1));
    const fiscalBalance = Number((totalTaxRevenue - totalExpenditure).toFixed(1));

    return {
      gdp,
      citRev,
      pitRev,
      vatRev,
      totalTaxRevenue,
      debtInterestDue,
      debtServicingPaid,
      effectiveBorrowingRate,
      riskSpread: Number(riskSpread.toFixed(2)),
      infraExp,
      eduExp,
      healthExp,
      subsidyExp,
      programmaticSpending,
      totalExpenditure,
      fiscalBalance,
      fiscalStatus: fiscalBalance >= 0 ? 'SURPLUS' : 'DEFICIT'
    };
  }

  // ==========================================================================
  // 3. TARGET SLIDER SCORING (0 to 50 Points)
  // ==========================================================================
  function scoreSliderTargets(sliders, targets) {
    if (!targets || Object.keys(targets).length === 0) {
      return { totalSliderScore: 50, breakdown: [] };
    }

    const targetKeys = Object.keys(targets);
    const pointsPerKey = 50 / targetKeys.length;
    let earnedPointsTotal = 0;
    const breakdown = [];

    targetKeys.forEach(key => {
      const target = targets[key];
      const val = sliders[key] !== undefined ? sliders[key] : 0;
      const lo = target.lo;
      const hi = target.hi;

      let scoreRatio = 0;
      let status = 'OPTIMAL';

      if (val >= lo && val <= hi) {
        scoreRatio = 1.0;
        status = 'OPTIMAL';
      } else {
        // Distance outside the optimal corridor
        const dist = val < lo ? lo - val : val - hi;
        // Permitted tolerance depends on the scale of the lever
        let maxTolerance = 4.0;
        if (key === 'debtPay') maxTolerance = 25.0;
        else if (key === 'cit' || key === 'pit' || key === 'vat') maxTolerance = 6.0;
        else if (key === 'rate') maxTolerance = 3.0;

        scoreRatio = Math.max(0, 1 - (dist / maxTolerance));
        status = scoreRatio > 0.5 ? 'ACCEPTABLE' : 'SUBOPTIMAL';
      }

      const pointsEarned = Number((scoreRatio * pointsPerKey).toFixed(1));
      earnedPointsTotal += pointsEarned;

      breakdown.push({
        key,
        userValue: val,
        targetLo: lo,
        targetHi: hi,
        status,
        scoreRatio,
        pointsEarned,
        maxPoints: Number(pointsPerKey.toFixed(1)),
        why: target.why
      });
    });

    const totalSliderScore = clamp(earnedPointsTotal, 0, 50);
    return {
      totalSliderScore: Number(totalSliderScore.toFixed(1)),
      breakdown
    };
  }

  // ==========================================================================
  // 4. DYNAMIC FEEDBACK GENERATOR (Center Modal Qualitative Status)
  // ==========================================================================
  function generateDynamicFeedback(stats, sliders, option, targets, country, roundData) {
    const feedbackCards = [];
    const neighbors = (country && country.neighbors) || 'neighboring countries';

    // 1. Corporate Income Tax (CIT) - Capital Flight & Attractiveness
    if (sliders.cit > 28) {
      feedbackCards.push({
        type: 'DANGER',
        tag: 'CAPITAL FLIGHT ALERT',
        icon: '⚠️',
        headline: `Punitive CIT (${sliders.cit}%): Corporate Exodus Underway`,
        text: `Raising Corporate Income Tax to ${sliders.cit}% eroded competitiveness. Domestic manufacturers and multinational enterprises began shifting headquarters and assembly plants to ${neighbors}, shrinking the taxable base and halting private expansion.`
      });
    } else if (sliders.cit < 14) {
      feedbackCards.push({
        type: 'WARNING',
        tag: 'TAX BASE DEPLETION',
        icon: '📉',
        headline: `Ultra-Low CIT (${sliders.cit}%): Starving Public Investment`,
        text: `While the ${sliders.cit}% rate thrilled foreign venture funds, government tax collections plummeted. Without sufficient public capital to modernize logistics and power grids, foreign firms delayed long-term capital deployment.`
      });
    } else {
      feedbackCards.push({
        type: 'SUCCESS',
        tag: 'COMPETITIVE TAXATION',
        icon: '🏢',
        headline: `Calibrated CIT (${sliders.cit}%): Investment Magnet`,
        text: `A balanced ${sliders.cit}% corporate levy kept the nation highly attractive compared to ${neighbors}, generating reliable treasury revenue while providing robust investor confidence.`
      });
    }

    // 2. Consumption Tax / VAT - Inflation & Purchasing Power
    if (sliders.vat > 18) {
      feedbackCards.push({
        type: 'DANGER',
        tag: 'COST OF LIVING CRISIS',
        icon: '🛒',
        headline: `High VAT (${sliders.vat}%): Squeezing Household Real Incomes`,
        text: `Retail prices spiked as merchants passed the ${sliders.vat}% consumption levy onto groceries and utilities. Consumer spending cooled sharply and trade unions staged nationwide protests demanding cost-of-living adjustments.`
      });
    } else if (sliders.vat <= 8) {
      feedbackCards.push({
        type: 'INFO',
        tag: 'LOW CONSUMPTION TAX',
        icon: '🛍️',
        headline: `Protective VAT (${sliders.vat}%): Stimulating Household Demand`,
        text: `Keeping consumption taxes at ${sliders.vat}% preserved low-income purchasing power and dampened headline CPI inflation, sustaining domestic retail momentum.`
      });
    }

    // 3. Personal Income Tax (PIT) - Brain Drain & Labor Multiplier
    if (sliders.pit > 40) {
      feedbackCards.push({
        type: 'WARNING',
        tag: 'BRAIN DRAIN WARNING',
        icon: '✈️',
        headline: `Punitive PIT (${sliders.pit}%): High-Skilled Talent Emigration`,
        text: `Skilled engineers, doctors, and financial executives faced heavy tax burdens, triggering emigration of top human capital to lower-tax global centers.`
      });
    }

    // 4. Debt Servicing - Sovereign Credit Rating & Risk Spread
    if (sliders.debtPay < 85) {
      feedbackCards.push({
        type: 'DANGER',
        tag: 'SOVEREIGN DEFAULT PANIC',
        icon: '🚨',
        headline: `Debt Servicing Cut (${sliders.debtPay}%): Credit Rating Downgraded`,
        text: `Withholding mandatory interest obligations triggered technical sovereign default. International credit rating agencies downgraded sovereign bonds to Junk status, freezing interbank liquidity and spiking bond yields.`
      });
    } else if (sliders.debtPay >= 100) {
      feedbackCards.push({
        type: 'SUCCESS',
        tag: 'SOVEREIGN CREDIBILITY',
        icon: '🛡️',
        headline: `Unblemished Debt Servicing (${sliders.debtPay}%): Market Access Maintained`,
        text: `Full debt interest repayment reaffirmed sovereign fiscal honour. International bond markets rewarded the treasury with compressed borrowing spreads and sustained credit liquidity.`
      });
    }

    // 5. Monetary Stance (Interest Rate)
    if (country && country.monetaryLocked) {
      feedbackCards.push({
        type: 'INFO',
        tag: 'MONETARY UNION CONSTRAINTS',
        icon: '💶',
        headline: 'Eurozone Single Currency Lock (ECB Rate: 1.0%)',
        text: 'As a Eurozone member state, national central bank interest rate discretion is surrendered to Frankfurt. Macroeconomic adjustment must be achieved strictly through fiscal levers and structural reform.'
      });
    } else if (sliders.rate > 8) {
      feedbackCards.push({
        type: 'WARNING',
        tag: 'MONETARY CREDIT CRUNCH',
        icon: '🔒',
        headline: `Aggressive Rate Hikes (${sliders.rate}%): SME Credit Freezing`,
        text: `Aggressive monetary tightening successfully contained speculative price surges, but commercial banks curtailed working capital loans to small businesses, slowing industrial hiring.`
      });
    } else if (sliders.rate < 2.5 && stats.inflation > 4.5) {
      feedbackCards.push({
        type: 'DANGER',
        tag: 'CURRENCY DEPRECIATION & INFLATION',
        icon: '🔥',
        headline: `Lax Interest Rates (${sliders.rate}%): Fueled Imported Inflation`,
        text: `Holding policy interest rates far below the inflation rate weakened the national currency. Crucial machinery and fuel imports became significantly more expensive.`
      });
    }

    // 6. Infrastructure & Solow Growth Multiplier
    if (targets && targets.infra) {
      if (sliders.infra < targets.infra.lo) {
        feedbackCards.push({
          type: 'WARNING',
          tag: 'INFRASTRUCTURE BOTTLENECK',
          icon: '🚧',
          headline: `Deficient Infrastructure (${sliders.infra}% of GDP): Logistics Gridlock`,
          text: `Underfunding arterial transport, cargo ports, and electrical grids created chronic supply-chain bottlenecks, forcing exporters to suffer costly shipping delays.`
        });
      } else if (sliders.infra >= targets.infra.lo) {
        feedbackCards.push({
          type: 'SUCCESS',
          tag: 'PRODUCTIVE CAPITAL DEEPENING',
          icon: '🏗️',
          headline: `Strategic Infrastructure (${sliders.infra}% of GDP): Keynesian Multiplier Unlocked`,
          text: `Robust capital outlays modernized export logistics corridors, crowded-in private manufacturing plants, and created thousands of high-wage industrial jobs.`
        });
      }
    }

    // 7. Education & R&D (Endogenous Human Capital)
    if (targets && targets.edu) {
      if (sliders.edu >= targets.edu.lo) {
        feedbackCards.push({
          type: 'SUCCESS',
          tag: 'HUMAN CAPITAL UPGRADE',
          icon: '🎓',
          headline: `Education & Polytech Funding (${sliders.edu}% of GDP): Talent Pipeline`,
          text: `Expanded technical vocational polytechnics and R&D grants supplied domestic industry with certified precision engineers, accelerating tech transfer.`
        });
      }
    }

    // 8. Policy Option Strategic Alignment
    feedbackCards.push({
      type: option.points >= 40 ? 'SUCCESS' : option.points >= 20 ? 'WARNING' : 'DANGER',
      tag: `POLICY DECISION [${option.id}]: ${option.points >= 40 ? 'OPTIMAL' : 'SUBOPTIMAL'}`,
      icon: option.points >= 40 ? '🏆' : '⚖️',
      headline: option.label,
      text: option.rationale
    });

    return feedbackCards;
  }

  // ==========================================================================
  // 5. DETERMINISTIC MACROECONOMIC ROUND SIMULATION
  // ==========================================================================
  function simulateFiscalRound(stats, sliders, option, targets, country) {
    const shock = option.effects || {};
    const preview = calculateBudgetPreview(stats, sliders, country);

    // Compliance update
    const complianceDelta = shock.complianceDelta || 0;
    const nextCompliance = clamp((stats.compliance || 0.92) + complianceDelta, 0.60, 1.08);

    // Macroeconomic multiplier calculations
    const infraShare = sliders.infra / 100;
    const eduShare = sliders.edu / 100;
    const healthShare = sliders.health / 100;
    const subsidyShare = sliders.subsidy / 100;

    // Keynesian spending impulse: (Infra 1.4x + Edu 1.1x + Health 0.9x + Subsidy 0.7x)
    const publicSpendingImpulse = (infraShare * 1.40 + eduShare * 1.10 + healthShare * 0.90 + subsidyShare * 0.70) * 10 - 1.2;

    // Tax drag (Excess rates over optimal benchmarks depress growth)
    const citDrag = sliders.cit > 24 ? (sliders.cit - 24) * 0.12 : 0;
    const pitDrag = sliders.pit > 30 ? (sliders.pit - 30) * 0.08 : 0;
    const vatDrag = sliders.vat > 16 ? (sliders.vat - 16) * 0.06 : 0;
    const totalTaxDrag = citDrag + pitDrag + vatDrag;

    // Monetary policy drag or stimulus
    const effectiveRate = country && country.monetaryLocked ? 1.0 : sliders.rate;
    const rateDrag = (effectiveRate - 4.5) * 0.18;

    // Debt default penalty if debt service withheld
    let defaultGrowthPenalty = 0;
    let defaultRiskSpreadPenalty = 0;
    if (sliders.debtPay < 85) {
      defaultGrowthPenalty = (85 - sliders.debtPay) * 0.05;
      defaultRiskSpreadPenalty = (85 - sliders.debtPay) * 0.08;
    }

    // Endogenous human capital stock
    const currentHC = stats.humanCapital || 2.0;
    const newHCAdded = (eduShare * 18) + (shock.humanCapitalDelta || 0);
    const nextHC = clamp(currentHC + newHCAdded, 1.0, 35.0);
    const endogenousLagBonus = stats.round >= 2 ? clamp(currentHC * 0.14, 0, 3.5) : 0;

    // GDP Growth computation
    const baseTrendGrowth = country && country.trendGrowth ? country.trendGrowth : 3.0;
    const rawGdpGrowth = baseTrendGrowth +
      (shock.gdpGrowthDelta || 0) +
      publicSpendingImpulse -
      totalTaxDrag -
      rateDrag -
      defaultGrowthPenalty +
      endogenousLagBonus;

    const nextGdpGrowth = clamp(rawGdpGrowth, -12.0, 16.0);
    const nextGdp = Number((stats.gdp * (1 + nextGdpGrowth / 100)).toFixed(1));

    // Treasury Cash Reserves update
    const netFiscalFlow = preview.fiscalBalance + (shock.treasuryDelta || 0);
    const nextTreasury = Number((stats.treasury + netFiscalFlow).toFixed(1));
    const capitalDelta = Number((nextTreasury - stats.treasury).toFixed(1));
    const initialTreasury = stats.initialTreasury || stats.treasury;
    const capitalGrowthPct = Number((((nextTreasury - initialTreasury) / Math.max(1, initialTreasury)) * 100).toFixed(1));

    // Debt-to-GDP update
    // Borrowing occurs when running a fiscal deficit or from shock delta
    const borrowingNeeded = preview.fiscalBalance < 0 ? Math.abs(preview.fiscalBalance) : 0;
    const nominalDebt = (stats.debtToGdp / 100) * stats.gdp;
    const principalPaid = sliders.debtPay > 100 ? (preview.debtInterestDue * ((sliders.debtPay - 100) / 100)) : 0;
    const nextNominalDebt = Math.max(0, nominalDebt + borrowingNeeded - principalPaid);
    const nextDebtToGdp = clamp((nextNominalDebt / nextGdp) * 100 + (shock.debtToGdpDelta || 0), 0, 240);

    // CPI Inflation update
    const baseInflation = country && country.trendInflation ? country.trendInflation : 2.0;
    const demandInflation = (nextGdpGrowth - 3.0) * 0.22;
    const vatInflation = sliders.vat > 15 ? (sliders.vat - 15) * 0.15 : 0;
    const monetaryEasingInflation = effectiveRate < 3.0 ? (3.0 - effectiveRate) * 0.35 : 0;
    const rawInflation = baseInflation + demandInflation + vatInflation + monetaryEasingInflation + (shock.inflationDelta || 0);
    const nextInflation = clamp(rawInflation, -1.5, 30.0);

    // Unemployment rate update (Okun's Law: 1% GDP growth above trend reduces unemployment by ~0.4%)
    const okunAdjustment = (nextGdpGrowth - 2.5) * 0.40;
    const rawUnemployment = stats.unemployment - okunAdjustment + (shock.unemploymentDelta || 0);
    const nextUnemployment = clamp(rawUnemployment, 1.2, 32.0);

    // Public Approval Rating update
    const taxPopularityPenalty = (sliders.cit - 22) * 0.15 + (sliders.pit - 25) * 0.25 + (sliders.vat - 12) * 0.35;
    const socialSpendingBonus = (healthShare * 100 - 4.0) * 0.8 + (subsidyShare * 100 - 3.0) * 0.6;
    const inflationDiscontent = nextInflation > 5.0 ? (nextInflation - 5.0) * 1.2 : 0;
    const unemploymentDiscontent = nextUnemployment > 8.0 ? (nextUnemployment - 8.0) * 0.9 : 0;
    const rawApproval = stats.approval - taxPopularityPenalty + socialSpendingBonus - inflationDiscontent - unemploymentDiscontent + (shock.approvalDelta || 0);
    const nextApproval = clamp(rawApproval, 5.0, 98.0);

    // Scoring Breakdown for the Round (out of 100 points / 100%)
    const optionScore = option.points || 0; // 0 to 50
    const sliderScoring = scoreSliderTargets(sliders, targets); // 0 to 50
    const roundScorePercent = clamp(optionScore + sliderScoring.totalSliderScore, 0, 100);

    // Qualitative Feedback Cards
    const feedbackCards = generateDynamicFeedback(stats, sliders, option, targets, country);

    const nextStats = {
      round: stats.round + 1,
      treasury: nextTreasury,
      initialTreasury: initialTreasury,
      gdp: nextGdp,
      gdpGrowth: nextGdpGrowth,
      debtToGdp: nextDebtToGdp,
      inflation: nextInflation,
      unemployment: nextUnemployment,
      approval: nextApproval,
      compliance: nextCompliance,
      humanCapital: nextHC,
      budgetBalance: preview.fiscalBalance,
      riskPremium: clamp(stats.riskPremium + defaultRiskSpreadPenalty, 0, 15)
    };

    return {
      nextStats,
      roundScore: {
        optionScore,
        sliderScore: sliderScoring.totalSliderScore,
        roundTotalPercent: roundScorePercent,
        sliderBreakdown: sliderScoring.breakdown
      },
      preview,
      capitalDelta,
      capitalGrowthPct,
      feedbackCards
    };
  }

  // ==========================================================================
  // EXPORT INTERFACE
  // ==========================================================================
  return {
    clamp,
    calculateEffectiveTaxYield,
    calculateBudgetPreview,
    scoreSliderTargets,
    generateDynamicFeedback,
    simulateFiscalRound
  };
});
