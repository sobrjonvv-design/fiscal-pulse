import { CountryCase } from '../types';

export const COUNTRY_CASES: CountryCase[] = [
  {
    id: 'singapore_1965',
    codeNumber: '01',
    name: 'Singapore',
    era: '1965–1970',
    subtitle: 'The Resource-Poor Start-up',
    currencySymbol: 'SGD ($M)',
    briefing:
      'Separated from Malaysia in August 1965 with zero natural resources, a tiny domestic market, and 14% unemployment. The imminent departure of British military garrisons (accounting for 20% of GDP and 40,000 direct civilian jobs) threatens economic collapse unless export manufacturing takes off immediately.',
    challenge:
      'Build infrastructure and human capital to attract FDI without depleting scarce treasury reserves.',
    initialStats: {
      year: 1965,
      round: 1,
      treasury: 500,
      initialTreasury: 500,
      gdp: 1000,
      gdpGrowth: 2.5,
      debtToGdp: 15.0,
      inflation: 1.5,
      unemployment: 14.0,
      approval: 62.0,
      budgetBalance: -15,
      complianceFactor: 0.94,
      baseInterestRate: 4.5,
      humanCapitalStock: 2.0,
    },
    defaultAllocations: {
      corporateTax: 24,
      incomeTax: 20,
      vat: 8,
      sovereignBorrowing: 35,
      infrastructure: 75,
      educationRd: 45,
      healthcareSocial: 30,
      industrialSubsidies: 35,
      debtServicing: 12,
    },
    rounds: [
      {
        round: 1,
        fiscalYearLabel: '1965 (FY 1)',
        title: 'Separation & Malaysian Tariff Wall',
        context:
          'Kuala Lumpur cancels common market agreements and introduces customs tariffs on Singapore-assembled goods. Entrepot merchants face catastrophic trade barriers.',
        options: [
          {
            id: 'A',
            label: 'Pioneer Industries Ordinance & Tax Holidays for Global Exporters',
            description:
              'Offer 5-year corporate tax exemptions to international MNCs and invest $40M into the Economic Development Board (EDB) to rapidly bulldoze the Jurong industrial swamps.',
            rationale:
              'Directly pivoted Singapore from import-substitution to global export manufacturing, absorbing idle dock labor.',
            effects: {
              treasuryDelta: -40,
              gdpGrowthDelta: 3.2,
              unemploymentDelta: -1.8,
              humanCapitalDelta: 1.5,
              approvalDelta: 5.0,
            },
          },
          {
            id: 'B',
            label: 'Retaliatory Import Tariffs on Regional Goods',
            description:
              'Impose 30% countervailing tariffs to shelter domestic artisans and preserve immediate customs revenue.',
            rationale:
              'Protected inefficient domestic workshops but triggered regional trade retaliation and higher consumer import prices.',
            effects: {
              treasuryDelta: 25,
              gdpGrowthDelta: -1.2,
              inflationDelta: 2.1,
              unemploymentDelta: 0.8,
              approvalDelta: -4.0,
            },
          },
          {
            id: 'C',
            label: 'Emergency Cash Transfers to Unemployed Dockers',
            description:
              'Issue universal $50M state relief subsidies to unemployed port laborers without industrial restructuring.',
            rationale:
              'Boosted household consumption and short-term popularity, but drained scarce capital without generating productive assets.',
            effects: {
              treasuryDelta: -50,
              gdpGrowthDelta: 0.4,
              unemploymentDelta: -0.4,
              approvalDelta: 7.0,
            },
          },
        ],
      },
      {
        round: 2,
        fiscalYearLabel: '1966 (FY 2)',
        title: 'Jurong Deep-Water Port Expansion & Housing Board Mobilization',
        context:
          'The newly established Jurong Industrial Estate requires deep-water berthing, bulk cargo conveyors, and high-density worker housing to convince American and European investors.',
        options: [
          {
            id: 'A',
            label: 'Issue Local Infrastructure Bonds & Mobilize Central Provident Fund (CPF)',
            description:
              'Channel domestic retirement savings into HDB housing estates and port cranes, keeping external debt zero.',
            rationale:
              'Created high-multiplier construction employment while providing workers with asset ownership and stability.',
            effects: {
              treasuryDelta: -30,
              gdpGrowthDelta: 2.8,
              unemploymentDelta: -2.0,
              humanCapitalDelta: 1.8,
              approvalDelta: 6.0,
            },
          },
          {
            id: 'B',
            label: 'High-Interest Foreign Sovereign Loan Syndication',
            description:
              'Borrow $120M from European private bankers to outsource turnkey construction to foreign contractors.',
            rationale:
              'Accelerated delivery but sharply raised sovereign debt servicing commitments and foreign exchange exposure.',
            effects: {
              treasuryDelta: 70,
              debtToGdpDelta: 8.5,
              gdpGrowthDelta: 1.6,
              approvalDelta: 1.0,
            },
          },
          {
            id: 'C',
            label: 'Postpone Deep-Water Port Dredging to Balance the Annual Budget',
            description:
              'Halt capital dredging and instruct foreign investors to lighter cargo from offshore roadsteads.',
            rationale:
              'Preserved current cash balances but led Shell and Mobil to defer planned refinery expansions.',
            effects: {
              treasuryDelta: 35,
              gdpGrowthDelta: -2.2,
              unemploymentDelta: 1.4,
              approvalDelta: -6.0,
            },
          },
        ],
      },
      {
        round: 3,
        fiscalYearLabel: '1967 (FY 3)',
        title: 'Sterling Devaluation & Independent Currency Board',
        context:
          'The British pound sterling is suddenly devalued by 14.3%. Singapore must decide whether to peg to sterling, allow devaluation, or issue an independent gold-backed Singapore Dollar.',
        options: [
          {
            id: 'A',
            label: 'Establish Currency Board with 100% External Asset Backing',
            description:
              'Refuse to devalue against the US dollar; back every Singapore dollar 100% with foreign reserves and gold.',
            rationale:
              'Enforced strict monetary discipline, eliminated currency risk for foreign investors, and anchored price stability.',
            effects: {
              treasuryDelta: -25,
              gdpGrowthDelta: 2.1,
              inflationDelta: -1.2,
              approvalDelta: 4.0,
            },
          },
          {
            id: 'B',
            label: 'Follow Sterling Down with a 15% Competitive Devaluation',
            description:
              'Devalue the local currency to boost port labor cost competitiveness.',
            rationale:
              'Made domestic labor cheap in foreign terms, but triggered immediate imported inflation on rice, fuel, and equipment.',
            effects: {
              treasuryDelta: 15,
              gdpGrowthDelta: 0.9,
              inflationDelta: 3.8,
              approvalDelta: -5.0,
            },
          },
          {
            id: 'C',
            label: 'Establish Central Bank with Monetized Treasury Overdraft Facility',
            description:
              'Grant the treasury unrestricted legal authority to monetize fiscal deficits via central bank printing.',
            rationale:
              'Provided unlimited domestic liquidity but spooked international financial institutions regarding inflation risk.',
            effects: {
              treasuryDelta: 60,
              inflationDelta: 6.5,
              gdpGrowthDelta: -1.0,
              approvalDelta: -8.0,
            },
          },
        ],
      },
      {
        round: 4,
        fiscalYearLabel: '1968 (FY 4)',
        title: 'British "East of Suez" Accelerated Military Base Pullout',
        context:
          'Prime Minister Harold Wilson announces the complete withdrawal of all British military forces by 1971. Singapore loses 20% of aggregate GDP and 40,000 base jobs in one stroke.',
        options: [
          {
            id: 'A',
            label: 'Enact Employment Act 1968 & Convert Naval Base to Sembawang Shipyard',
            description:
              'Standardize working hours, curb wildcat industrial strikes, and commercialize Royal Navy ship repair yards.',
            rationale:
              'A landmark reform: industrial disputes fell 90%, maritime repair boomed, and foreign investors gained confidence in factory uptime.',
            effects: {
              treasuryDelta: -35,
              gdpGrowthDelta: 3.6,
              unemploymentDelta: -2.8,
              humanCapitalDelta: 2.2,
              approvalDelta: 4.5,
            },
          },
          {
            id: 'B',
            label: 'Subsidize Redundant Base Employees on Indefinite State Retainers',
            description:
              'Absorb all 40,000 civilian base workers directly into the government civil service payroll.',
            rationale:
              'Prevented political unrest and kept unemployment numbers low, but permanently bloated recurrent fiscal overhead.',
            effects: {
              treasuryDelta: -85,
              gdpGrowthDelta: -0.6,
              debtToGdpDelta: 6.0,
              unemploymentDelta: -1.2,
              approvalDelta: 3.0,
            },
          },
          {
            id: 'C',
            label: 'Implement Strict Fiscal Austerity to Offset Lost Base Revenue',
            description:
              'Slash infrastructure and public health spending by 40% to match the sudden drop in military base spending.',
            rationale:
              'Preserved treasury capital, but the fiscal contraction deepened the recession and drove youth unemployment to 18%.',
            effects: {
              treasuryDelta: 45,
              gdpGrowthDelta: -3.5,
              unemploymentDelta: 3.5,
              approvalDelta: -12.0,
            },
          },
        ],
      },
      {
        round: 5,
        fiscalYearLabel: '1969–1970 (FY 5)',
        title: 'Multinational Electronics Wave & Joint Technical Apprenticeships',
        context:
          'US semiconductor pioneers (Texas Instruments, National Semiconductor, Hewlett-Packard) seek Asian manufacturing hubs. Singapore faces severe technical labor shortages.',
        options: [
          {
            id: 'A',
            label: 'Co-Fund Joint Industry-State Technical Training Institutes',
            description:
              'Partner with Philips, Rollei, and Tata to establish specialized technical polytechnics with state bursaries.',
            rationale:
              'Permanently upgraded workforce skill density, transforming Singapore into Southeast Asia’s precision electronics leader.',
            effects: {
              treasuryDelta: -45,
              gdpGrowthDelta: 4.2,
              unemploymentDelta: -3.4,
              humanCapitalDelta: 4.0,
              approvalDelta: 8.0,
            },
          },
          {
            id: 'B',
            label: 'Focus Exclusively on Low-Wage Unskilled Garment Assembly',
            description:
              'Reject expensive STEM polytechnic investments and keep minimum wages depressed to attract textile factories.',
            rationale:
              'Provided immediate manual jobs for uneducated workers, but left the economy vulnerable to low-cost regional competitors.',
            effects: {
              treasuryDelta: 10,
              gdpGrowthDelta: 1.1,
              unemploymentDelta: -1.5,
              humanCapitalDelta: -1.0,
              approvalDelta: -1.0,
            },
          },
          {
            id: 'C',
            label: 'Impose Windfall Expatriate Payroll Tax on Multinational Factories',
            description:
              'Levy a $500/month tax on every foreign engineer and executive working in Singapore industrial zones.',
            rationale:
              'Generated quick tax cash for the treasury, but caused Texas Instruments to redirect major fab investments to Penang.',
            effects: {
              treasuryDelta: 35,
              gdpGrowthDelta: -2.4,
              unemploymentDelta: 1.2,
              approvalDelta: -5.0,
            },
          },
        ],
      },
    ],
    historicalOutcome: {
      summary:
        'By 1970, Singapore had weathered separation and British withdrawal, quadrupled export manufacturing, reduced unemployment from 14% to 5.2%, and built a robust sovereign balance sheet anchored by CPF asset formation and EDB industrial estates.',
      gdp: 1850,
      gdpGrowth: 9.8,
      debtToGdp: 22.0,
      inflation: 2.1,
      unemployment: 5.2,
      treasury: 780,
      historicalCapitalTrajectory: [500, 540, 595, 660, 720, 780],
    },
  },
  {
    id: 'norway_1975',
    codeNumber: '02',
    name: 'Norway',
    era: '1975–1980',
    subtitle: 'Managing the Oil Boom',
    currencySymbol: 'NOK ($M equiv.)',
    briefing:
      'With the Ekofisk and Statfjord North Sea oil fields producing massive revenue, Norway faces the classic "Dutch Disease": surging petrodollars threaten to inflate domestic wages, appreciate the Krone, squeeze traditional manufacturing (shipbuilding, pulp mills), and overheat the welfare state.',
    challenge:
      'Prevent Dutch Disease and double-digit inflation while accumulating sovereign capital for future generations.',
    initialStats: {
      year: 1975,
      round: 1,
      treasury: 4200,
      initialTreasury: 4200,
      gdp: 15000,
      gdpGrowth: 4.8,
      debtToGdp: 28.0,
      inflation: 8.5,
      unemployment: 2.5,
      approval: 74.0,
      budgetBalance: 240,
      complianceFactor: 0.98,
      baseInterestRate: 5.5,
      humanCapitalStock: 3.5,
    },
    defaultAllocations: {
      corporateTax: 28,
      incomeTax: 35,
      vat: 20,
      sovereignBorrowing: 0,
      infrastructure: 750,
      educationRd: 680,
      healthcareSocial: 950,
      industrialSubsidies: 320,
      debtServicing: 210,
    },
    rounds: [
      {
        round: 1,
        fiscalYearLabel: '1975 (FY 1)',
        title: 'Ekofisk Petrodollar Influx & Statoil State Participation',
        context:
          'Royalties and petroleum taxes pour into Oslo. International oil majors demand open exploration rights, while unions demand an immediate petro-wage dividend.',
        options: [
          {
            id: 'A',
            label: '78% Petroleum Resource Rent Tax & Mandatory 50% Statoil Equity',
            description:
              'Capture economic rents for the national treasury, enforce technology transfer to Norwegian maritime firms, and limit domestic petrodollar injections.',
            rationale:
              'Established public ownership of hydrocarbon resources while insulating the domestic mainland economy from raw cash injections.',
            effects: {
              treasuryDelta: 380,
              gdpGrowthDelta: 1.4,
              humanCapitalDelta: 2.0,
              approvalDelta: 5.0,
            },
          },
          {
            id: 'B',
            label: 'Pass-Through All Oil Revenues into Universal Household Tax Rebates',
            description:
              'Cut personal income taxes to zero and mail annual oil royalty checks to every Norwegian citizen.',
            rationale:
              'Extremely popular politically, but triggered immediate domestic spending frenzy, sending consumer inflation past 14%.',
            effects: {
              treasuryDelta: -250,
              gdpGrowthDelta: 2.8,
              inflationDelta: 5.5,
              approvalDelta: 10.0,
            },
          },
          {
            id: 'C',
            label: 'Nationalize All Offshore Rigs & Displace International Operators',
            description:
              'Bar foreign oil majors and spend $600M from the treasury building domestic exploration capacity.',
            rationale:
              'Delayed drilling operations by 3 years due to technology shortages and increased offshore accident risk.',
            effects: {
              treasuryDelta: -600,
              gdpGrowthDelta: -1.6,
              debtToGdpDelta: 4.0,
              approvalDelta: -4.0,
            },
          },
        ],
      },
      {
        round: 2,
        fiscalYearLabel: '1976 (FY 2)',
        title: 'Dutch Disease & Traditional Export Squeeze',
        context:
          'Norwegian mainland wage growth hits 16% as offshore platforms bid away engineers. Traditional coastal shipbuilders and pulp exporters face bankruptcy as costs soar.',
        options: [
          {
            id: 'A',
            label: 'Restrain Mainland Subsidies & Fund Non-Oil High-Tech Automation R&D',
            description:
              'Refuse open-ended bailouts for obsolete mainland factories; instead fund robotics, subsea engineering, and hydro-power.',
            rationale:
              'Cushioned the industrial transition, forcing traditional manufacturing to move up the value chain into high-margin subsea tech.',
            effects: {
              treasuryDelta: -120,
              gdpGrowthDelta: 1.8,
              inflationDelta: -1.8,
              humanCapitalDelta: 2.8,
              approvalDelta: 2.0,
            },
          },
          {
            id: 'B',
            label: 'Blanket Operating Subsidies to All Uncompetitive Mainland Factories',
            description:
              'Use petroleum tax windfalls to permanently subsidize unprofitable shipyards and paper mills.',
            rationale:
              'Preserved local community jobs, but locked labor into loss-making sectors and worsened national productivity sclerosis.',
            effects: {
              treasuryDelta: -420,
              gdpGrowthDelta: 0.3,
              inflationDelta: 2.2,
              unemploymentDelta: -0.6,
              approvalDelta: 6.0,
            },
          },
          {
            id: 'C',
            label: 'Devalue Krone by 12% to Protect Exporters',
            description:
              'Artificially devalue the Krone in foreign exchange markets to maintain exporter margins.',
            rationale:
              'Helped exporters briefly, but ignited a fierce wage-price spiral as imported consumer goods soared in price.',
            effects: {
              treasuryDelta: -50,
              gdpGrowthDelta: 0.8,
              inflationDelta: 4.2,
              approvalDelta: -3.0,
            },
          },
        ],
      },
      {
        round: 3,
        fiscalYearLabel: '1977 (FY 3)',
        title: 'Domestic Credit Overheating & Wage-Price Spiral',
        context:
          'Bank lending expands 24% year-on-year. Real estate prices in Oslo and Stavanger explode, and core CPI breaches 10.5%.',
        options: [
          {
            id: 'A',
            label: 'Credit Controls, Commercial Bank Reserve Hikes & Fiscal Tightening',
            description:
              'Impose strict lending ceilings, raise central bank rates to 8%, and trim public consumption growth.',
            rationale:
              'Successfully cooled speculative property bubbles and brought credit expansion back in line with real productivity.',
            effects: {
              treasuryDelta: 180,
              gdpGrowthDelta: -0.9,
              inflationDelta: -3.2,
              approvalDelta: -4.0,
            },
          },
          {
            id: 'B',
            label: 'Maintain Cheap Interest Rates & Double Public Construction Works',
            description:
              'Ignore credit growth and build new fjord highways and community centers across all 19 counties.',
            rationale:
              'Pushed domestic GDP to unsustainable capacity constraints, worsening severe labor shortages and inflation.',
            effects: {
              treasuryDelta: -340,
              gdpGrowthDelta: 2.4,
              inflationDelta: 4.8,
              unemploymentDelta: -0.8,
              approvalDelta: 5.0,
            },
          },
          {
            id: 'C',
            label: 'Price Ceilings & Mandatory Retail Food Subsidies',
            description:
              'Legislate legal price caps on milk, butter, and fish, compensating grocers from oil revenues.',
            rationale:
              'Artificially suppressed the CPI index on paper, but created black markets and drained $280M annually in recurring subsidies.',
            effects: {
              treasuryDelta: -280,
              gdpGrowthDelta: -0.4,
              inflationDelta: -1.0,
              approvalDelta: 3.0,
            },
          },
        ],
      },
      {
        round: 4,
        fiscalYearLabel: '1978 (FY 4)',
        title: 'The Kleppe Package & Tripartite Income Accord',
        context:
          'Finance Minister Per Kleppe proposes a historic national compromise: coordinated wage moderation in exchange for state tax relief, child allowances, and stable pensions.',
        options: [
          {
            id: 'A',
            label: 'Adopt Comprehensive Tripartite Solidarity Wage Accord',
            description:
              'Trade moderate personal income tax cuts and family benefits for an agreed 15-month statutory wage freeze.',
            rationale:
              'Succeeded in breaking the wage-price spiral without triggering destructive national labor strikes.',
            effects: {
              treasuryDelta: -90,
              gdpGrowthDelta: 2.2,
              inflationDelta: -4.0,
              unemploymentDelta: -0.3,
              approvalDelta: 7.0,
            },
          },
          {
            id: 'B',
            label: 'Break Unions & Mandate Unilateral Public Sector Pay Cuts',
            description:
              'Refuse tripartite negotiation; pass emergency decree cutting state salaries by 8%.',
            rationale:
              'Triggered a paralyzed offshore logistics strike, shutting down Ekofisk drilling for two months.',
            effects: {
              treasuryDelta: -210,
              gdpGrowthDelta: -2.8,
              unemploymentDelta: 1.2,
              approvalDelta: -14.0,
            },
          },
          {
            id: 'C',
            label: 'Concede Full 18% Union Wage Demand via Higher Deficits',
            description:
              'Accede to all union wage demands and fund the public payroll through treasury reserves.',
            rationale:
              'Preserved labor peace, but completely destroyed remaining mainland export cost competitiveness.',
            effects: {
              treasuryDelta: -380,
              gdpGrowthDelta: 0.5,
              inflationDelta: 5.0,
              approvalDelta: 4.0,
            },
          },
        ],
      },
      {
        round: 5,
        fiscalYearLabel: '1979–1980 (FY 5)',
        title: 'Second Global Oil Shock & Foundation of Sovereign Sterilization',
        context:
          'The Iranian Revolution causes world oil prices to more than double from $14 to $35/barrel. Norway receives a torrential petrodollar flood.',
        options: [
          {
            id: 'A',
            label: 'Sterilize Windfalls in Foreign Securities: The Precursor to the Sovereign Wealth Fund',
            description:
              'Mandate that 80% of surplus oil taxes be invested in diversified foreign bonds and equities outside Norway, capping domestic budget drawdown.',
            rationale:
              'The foundational institutional decision: prevented domestic overheating, protected the Krone from hyper-appreciation, and birthed the world’s wealthiest sovereign pension fund.',
            effects: {
              treasuryDelta: 750,
              gdpGrowthDelta: 1.6,
              inflationDelta: -2.0,
              debtToGdpDelta: -5.0,
              approvalDelta: 8.0,
            },
          },
          {
            id: 'B',
            label: 'Spend All Additional Windfalls on Massive Domestic Public Works',
            description:
              'Fund high-speed rail lines, universal luxury public sports centers, and early retirement at age 55.',
            rationale:
              'Created immense domestic political euphoria, but permanently locked the state budget into high recurring expenditures when oil prices collapsed in 1986.',
            effects: {
              treasuryDelta: -450,
              gdpGrowthDelta: 3.2,
              inflationDelta: 5.8,
              approvalDelta: 9.0,
            },
          },
          {
            id: 'C',
            label: 'Cap Offshore Petroleum Production by 50% as Conservation Measure',
            description:
              'Halt new drilling licenses and cap export volumes to keep hydrocarbons in the ground.',
            rationale:
              'Conserved resources for future generations, but forfeited peak world market prices and slashed treasury revenues.',
            effects: {
              treasuryDelta: -320,
              gdpGrowthDelta: -1.8,
              unemploymentDelta: 1.0,
              approvalDelta: -6.0,
            },
          },
        ],
      },
    ],
    historicalOutcome: {
      summary:
        'Norway successfully avoided the full devastation of Dutch Disease through tripartite wage discipline and the visionary decision to sterilize surplus petroleum revenues in foreign assets, preserving mainland manufacturing and laying the groundwork for the $1.6T Government Pension Fund Global.',
      gdp: 21500,
      gdpGrowth: 4.5,
      debtToGdp: 21.0,
      inflation: 4.8,
      unemployment: 1.9,
      treasury: 5850,
      historicalCapitalTrajectory: [4200, 4520, 4780, 5050, 5380, 5850],
    },
  },
  {
    id: 'greece_2009',
    codeNumber: '03',
    name: 'Greece',
    era: '2009–2014',
    subtitle: 'Sovereign Debt Crisis',
    currencySymbol: 'EUR ($M equiv.)',
    briefing:
      'In October 2009, newly elected Prime Minister Papandreou reveals that Greece’s real fiscal deficit is not 3.7% but an astronomical 12.7% of GDP (later revised to 15.4%). With sovereign debt at 127% of GDP, pervasive tax evasion, and Eurozone membership preventing monetary devaluation, bond markets close.',
    challenge:
      'Navigate the razor’s edge between suicidal austerity and catastrophic sovereign default, reforming tax compliance while preventing social collapse.',
    initialStats: {
      year: 2009,
      round: 1,
      treasury: 250,
      initialTreasury: 250,
      gdp: 33000,
      gdpGrowth: -3.2,
      debtToGdp: 127.0,
      inflation: 4.2,
      unemployment: 12.5,
      approval: 46.0,
      budgetBalance: -4200,
      complianceFactor: 0.65,
      baseInterestRate: 8.2,
      humanCapitalStock: 2.2,
    },
    defaultAllocations: {
      corporateTax: 24,
      incomeTax: 32,
      vat: 19,
      sovereignBorrowing: 3500,
      infrastructure: 1200,
      educationRd: 1400,
      healthcareSocial: 3200,
      industrialSubsidies: 450,
      debtServicing: 2800,
    },
    rounds: [
      {
        round: 1,
        fiscalYearLabel: '2009 (FY 1)',
        title: 'Deficit Revelation & Sovereign Bond Yield Spike',
        context:
          'Global rating agencies downgrade Greek sovereign bonds to BBB/Junk. Ten-year bond yields spike past 11%, cutting Greece off from private refinancing.',
        options: [
          {
            id: 'A',
            label: 'Independent Statistics Agency (ELSTAT) + Digitize Tax Audits & Broaden Base',
            description:
              'Restore statistical transparency, launch satellite and banking registry cross-checks on luxury property evasion, and request official EU/IMF bridge liquidity.',
            rationale:
              'Attacked the root systemic cause (tax evasion) without instantly crushing aggregate demand, lifting tax compliance +8%.',
            effects: {
              treasuryDelta: 850,
              complianceDelta: 0.08,
              gdpGrowthDelta: -1.4,
              debtToGdpDelta: 3.5,
              approvalDelta: -3.0,
            },
          },
          {
            id: 'B',
            label: 'Front-Loaded Brutal Austerity: Slash 13th/14th Month Pensions & Hike VAT to 23%',
            description:
              'Implement immediate across-the-board 20% spending cuts to appease bondholders without tax system overhaul.',
            rationale:
              'The textbook Keynesian austerity trap: contracting consumer spending caused GDP to shrink 6%, causing Debt-to-GDP to paradoxically rise faster.',
            effects: {
              treasuryDelta: 350,
              gdpGrowthDelta: -5.8,
              unemploymentDelta: 4.2,
              debtToGdpDelta: 12.0,
              approvalDelta: -16.0,
            },
          },
          {
            id: 'C',
            label: 'Unilateral Debt Moratorium & Reintroduce Devalued Drachma ("Grexit")',
            description:
              'Repudiate foreign debt and leave the Eurozone overnight, printing domestic Drachmas.',
            rationale:
              'Triggered an instant run on all domestic banks, wiped out corporate working capital, and caused imported fuel and medical costs to hyper-inflate 40%.',
            effects: {
              treasuryDelta: -250,
              gdpGrowthDelta: -9.5,
              inflationDelta: 16.0,
              debtToGdpDelta: -25.0,
              unemploymentDelta: 7.0,
              approvalDelta: -22.0,
            },
          },
        ],
      },
      {
        round: 2,
        fiscalYearLabel: '2010 (FY 2)',
        title: 'First EU/IMF Troika Memorandum ($110B Bailout)',
        context:
          'The Troika demands severe structural benchmarks: dismantling collective bargaining, deregulating professions, and selling $50B in state assets.',
        options: [
          {
            id: 'A',
            label: 'Sign Memorandum with Strict Protection for Low-Income Health & Streamline Business Licensing',
            description:
              'Accept emergency loans while insulating minimum safety nets, digitizing export paperwork, and cutting pharmaceutical procurement corruption.',
            rationale:
              'Secured low-interest emergency financing while eradicating massive procurement waste in state hospitals.',
            effects: {
              treasuryDelta: 920,
              gdpGrowthDelta: -2.1,
              complianceDelta: 0.06,
              unemploymentDelta: 2.2,
              approvalDelta: -5.0,
            },
          },
          {
            id: 'B',
            label: 'Reject Bailout Conditions & Attempt High-Interest Bilateral Loans from Russia/China',
            description:
              'Break off negotiations with Brussels and seek alternative sovereign financing abroad.',
            rationale:
              'Bilateral partners refused to commit without collateral, leaving the state treasury within 14 days of default on public payrolls.',
            effects: {
              treasuryDelta: -450,
              gdpGrowthDelta: -4.5,
              debtToGdpDelta: 8.0,
              approvalDelta: -10.0,
            },
          },
          {
            id: 'C',
            label: 'Impose Retrospective Emergency Real Estate Tax (ENFIA) on Electric Utility Bills',
            description:
              'Tack emergency property levies onto household electricity bills, cutting power for non-payment.',
            rationale:
              'Raised emergency liquidity fast, but inflicted immense suffering on impoverished households and sparked fierce social protests.',
            effects: {
              treasuryDelta: 650,
              gdpGrowthDelta: -3.8,
              approvalDelta: -18.0,
            },
          },
        ],
      },
      {
        round: 3,
        fiscalYearLabel: '2011 (FY 3)',
        title: 'Sinking Tax Compliance & PSI Sovereign Haircut Negotiations',
        context:
          'Two years of contraction have pushed Debt-to-GDP to 170%. It is mathematically impossible to repay private bondholders in full. Private banks hold $206B of debt.',
        options: [
          {
            id: 'A',
            label: 'Negotiate 53.5% Voluntary PSI Debt Haircut & Mandatory Electronic POS Terminals',
            description:
              'Enforce a massive 53.5% nominal haircut on private bondholders while mandating credit card payments across all retail shops to catch VAT fraud.',
            rationale:
              'Wiped out over $100B in sovereign debt obligations and revolutionized VAT collection compliance permanently.',
            effects: {
              treasuryDelta: 1200,
              debtToGdpDelta: -32.0,
              complianceDelta: 0.12,
              gdpGrowthDelta: 1.2,
              approvalDelta: 5.0,
            },
          },
          {
            id: 'B',
            label: 'Refuse PSI Restructuring & Pledge Piraeus Port and State Islands to Pay Par Value',
            description:
              'Borrow more to pay private hedge funds 100 cents on the dollar, pledging national crown assets as collateral.',
            rationale:
              'Entrenched the unsustainable debt overhang, guaranteeing a deeper second crisis 18 months later.',
            effects: {
              treasuryDelta: -800,
              debtToGdpDelta: 18.0,
              gdpGrowthDelta: -3.2,
              approvalDelta: -14.0,
            },
          },
          {
            id: 'C',
            label: 'Confiscate 20% of Domestic Bank Deposits to Pay Foreign Creditors',
            description:
              'Execute an internal "bail-in" seizing cash from domestic corporate and household bank accounts.',
            rationale:
              'Crushed all domestic SME working capital, sparking an unprecedented wave of private enterprise bankruptcies.',
            effects: {
              treasuryDelta: 850,
              gdpGrowthDelta: -7.0,
              unemploymentDelta: 5.5,
              approvalDelta: -28.0,
            },
          },
        ],
      },
      {
        round: 4,
        fiscalYearLabel: '2012 (FY 4)',
        title: 'The 2012 PSI Execution & Youth Unemployment Peak',
        context:
          'Following the PSI restructuring, Greek commercial banks lose their equity capital and must be recapitalized. Youth unemployment surpasses 55%.',
        options: [
          {
            id: 'A',
            label: 'Hellenic Financial Stability Fund Bank Recapitalization & EU Structural Youth Tech Vouchers',
            description:
              'Recapitalize systemic banks using dedicated ESM funds while deploying EU regional subsidies for youth tech apprenticeships and agritech exports.',
            rationale:
              'Restored liquidity to solvent domestic lenders and began checking the severe brain drain of young engineers.',
            effects: {
              treasuryDelta: 550,
              gdpGrowthDelta: 1.8,
              unemploymentDelta: -2.5,
              humanCapitalDelta: 2.2,
              approvalDelta: 6.0,
            },
          },
          {
            id: 'B',
            label: 'Raise Statutory Corporate Income Tax to 42% on Surviving Firms',
            description:
              'Hike tax rates on formal domestic corporations to plug remaining social security deficits.',
            rationale:
              'Classic Laffer Curve disaster: hundreds of Greek companies relocated headquarters to Bulgaria and Cyprus overnight.',
            effects: {
              treasuryDelta: -250,
              complianceDelta: -0.09,
              gdpGrowthDelta: -2.8,
              unemploymentDelta: 1.8,
              approvalDelta: -9.0,
            },
          },
          {
            id: 'C',
            label: 'Expand Public Bureaucracy Patronage via Emergency T-Bills',
            description:
              'Issue short-term 9% T-bills to re-hire laid-off municipal clerks.',
            rationale:
              'Sank the primary budget balance, jeopardizing official bailout disbursements.',
            effects: {
              treasuryDelta: -650,
              debtToGdpDelta: 6.5,
              gdpGrowthDelta: 0.4,
              approvalDelta: 3.0,
            },
          },
        ],
      },
      {
        round: 5,
        fiscalYearLabel: '2013–2014 (FY 5)',
        title: 'Primary Surplus Turnaround & Return to Bond Markets',
        context:
          'After four grueling years, the primary budget balance turns positive for the first time in a decade. International tourism rebounds strongly.',
        options: [
          {
            id: 'A',
            label: 'Lock in Primary Surplus, Lower Non-Wage Labor Costs & Issue 5-Year Sovereign Bond',
            description:
              'Maintain fiscal discipline, lower employer social security levies to stimulate private hiring, and test private debt markets.',
            rationale:
              'Greece successfully sold $3B in 5-year bonds at 4.75%, marking the formal end of complete private capital market exile.',
            effects: {
              treasuryDelta: 680,
              gdpGrowthDelta: 2.6,
              debtToGdpDelta: -8.0,
              unemploymentDelta: -2.2,
              approvalDelta: 8.0,
            },
          },
          {
            id: 'B',
            label: 'Immediately Disburse the Surplus as Pre-Election Civil Service Bonuses',
            description:
              'Spend the entire newly achieved primary surplus on election-year bonuses and subsidies.',
            rationale:
              'Reignited sovereign bond market anxiety that Greece was reverting to old clientelist fiscal habits.',
            effects: {
              treasuryDelta: -550,
              gdpGrowthDelta: 1.2,
              debtToGdpDelta: 4.0,
              approvalDelta: 6.0,
            },
          },
          {
            id: 'C',
            label: 'Default on Troika Official Loans and Demand 100% Debt Cancellation',
            description:
              'Refuse to service European Stability Mechanism and IMF loans.',
            rationale:
              'Triggered immediate threats of ECB liquidity cutoff to the banking system and renewed Grexit panic.',
            effects: {
              treasuryDelta: -950,
              gdpGrowthDelta: -5.2,
              unemploymentDelta: 3.5,
              approvalDelta: -15.0,
            },
          },
        ],
      },
    ],
    historicalOutcome: {
      summary:
        'Between 2009 and 2014, Greece endured one of the most painful macroeconomic adjustments in peacetime history: GDP contracted 26%, unemployment soared to 27%, but the 2012 PSI debt haircut and comprehensive digital tax enforcement eventually secured sustainable primary surpluses.',
      gdp: 24500,
      gdpGrowth: 0.7,
      debtToGdp: 177.0,
      inflation: -0.9,
      unemployment: 25.8,
      treasury: 680,
      historicalCapitalTrajectory: [250, 180, 290, 410, 520, 680],
    },
  },
  {
    id: 'germany_1948',
    codeNumber: '04',
    name: 'Post-WWII Germany',
    era: '1948–1953',
    subtitle: 'Wirtschaftswunder Reconstruction',
    currencySymbol: 'DEM ($M equiv.)',
    briefing:
      'In 1948, the three Western Allied occupation zones lie in ruins. Industrial production is below 50% of pre-war levels, rail networks and bridges are destroyed, millions of expellee refugees from Eastern Europe crowd bombed-out cities, and the worthless Reichsmark has reduced the economy to cigarette barter.',
    challenge:
      'Allocate industrial subsidies and infrastructure rebuilding to spark export-led growth without triggering Weimar-style hyperinflation.',
    initialStats: {
      year: 1948,
      round: 1,
      treasury: 800,
      initialTreasury: 800,
      gdp: 8500,
      gdpGrowth: 3.0,
      debtToGdp: 22.0,
      inflation: 6.0,
      unemployment: 11.0,
      approval: 55.0,
      budgetBalance: -80,
      complianceFactor: 0.88,
      baseInterestRate: 4.8,
      humanCapitalStock: 4.2,
    },
    defaultAllocations: {
      corporateTax: 30,
      incomeTax: 32,
      vat: 12,
      sovereignBorrowing: 60,
      infrastructure: 280,
      educationRd: 190,
      healthcareSocial: 240,
      industrialSubsidies: 160,
      debtServicing: 40,
    },
    rounds: [
      {
        round: 1,
        fiscalYearLabel: '1948 (FY 1)',
        title: 'Ludwig Erhard’s Bold Currency Reform & Price Deregulation',
        context:
          'On June 20, 1948, the Deutsche Mark (DM) is introduced, wiping out 93% of nominal Reichsmark savings. Economics Director Ludwig Erhard abolishes price controls and rationing overnight against Allied orders.',
        options: [
          {
            id: 'A',
            label: 'Abolish Price Controls & Enforce Strict Independent Central Bank Discipline',
            description:
              'Deregulate prices immediately to allow market price discovery while the Bank deutscher Länder holds money supply strictly constrained.',
            rationale:
              'The foundational spark of the German Miracle: goods flooded empty shop windows overnight, black markets vanished, and worker absenteeism dropped from 25% to zero.',
            effects: {
              treasuryDelta: 160,
              gdpGrowthDelta: 5.2,
              inflationDelta: -2.5,
              unemploymentDelta: -1.8,
              complianceDelta: 0.08,
              approvalDelta: 8.0,
            },
          },
          {
            id: 'B',
            label: 'Retain Wartime Price Ceilings & Ration Coupons to Protect Savers',
            description:
              'Keep strict government price controls in place and punish merchants charging higher market prices.',
            rationale:
              'Prolonged crippling goods shortages and kept industrial materials hoarded in black-market barter networks.',
            effects: {
              treasuryDelta: -90,
              gdpGrowthDelta: -2.4,
              inflationDelta: 3.5,
              unemploymentDelta: 1.5,
              approvalDelta: -7.0,
            },
          },
          {
            id: 'C',
            label: 'Print New Deutsche Marks Generously to Fully Reimburse Wiped-Out Bank Deposits',
            description:
              'Issue new D-Marks 1:1 to compensate middle-class citizens whose lifetime Reichsmark savings were wiped out.',
            rationale:
              'Ignited immediate post-war hyperinflation panic, destroying domestic confidence in the fledgling new currency.',
            effects: {
              treasuryDelta: -250,
              inflationDelta: 12.0,
              gdpGrowthDelta: -1.2,
              approvalDelta: -11.0,
            },
          },
        ],
      },
      {
        round: 2,
        fiscalYearLabel: '1949 (FY 2)',
        title: 'Marshall Plan (ERP) Counterpart Funds & KfW Reconstruction Bank',
        context:
          'US Marshall Plan aid arrives. The new Federal Republic must decide whether to consume the aid as food and fuel grants or build a self-sustaining revolving capital fund.',
        options: [
          {
            id: 'A',
            label: 'Establish Kreditanstalt für Wiederaufbau (KfW) as Revolving Industrial Loan Fund',
            description:
              'Channel Marshall Plan ERP Counterpart Funds through KfW to finance bottleneck infrastructure: coal mines, electric grids, rail links, and Mittelstand machinery makers.',
            rationale:
              'Created an extraordinary multi-decade capital multiplier: loan repayments were continuously re-lent to expanding German industrial firms.',
            effects: {
              treasuryDelta: 240,
              gdpGrowthDelta: 4.4,
              unemploymentDelta: -2.2,
              humanCapitalDelta: 2.8,
              approvalDelta: 7.0,
            },
          },
          {
            id: 'B',
            label: 'Spend Marshall Aid as One-Off Consumer Cash Bonuses to Citizens',
            description:
              'Disburse all incoming dollar aid as direct non-repayable household consumer grants.',
            rationale:
              'Boosted immediate post-war consumer happiness, but left power plants and coal mines crippled once the aid expired.',
            effects: {
              treasuryDelta: -140,
              gdpGrowthDelta: 0.8,
              unemploymentDelta: -0.4,
              approvalDelta: 5.0,
            },
          },
          {
            id: 'C',
            label: 'Nationalize Ruhr Heavy Industry Without Rebuilding Grid Bottlenecks',
            description:
              'Spend counterpart funds buying out private Ruhr coal and steel shareholders into state ownership.',
            rationale:
              'Drained precious public capital into shareholder buyouts while failing to repair physical transport arteries.',
            effects: {
              treasuryDelta: -320,
              gdpGrowthDelta: -1.9,
              unemploymentDelta: 1.0,
              approvalDelta: -6.0,
            },
          },
        ],
      },
      {
        round: 3,
        fiscalYearLabel: '1950 (FY 3)',
        title: 'Integration of 10 Million Expellee Refugees & Housing Reconstruction',
        context:
          'Ten million ethnic German refugees from Silesia, Prussia, and the Sudetenland live in makeshift camps, straining municipal social budgets but offering massive labor potential.',
        options: [
          {
            id: 'A',
            label: 'Equalization of Burdens Act (Lastenausgleich) & Low-Cost Social Housing Tax Credits',
            description:
              'Levy a 50% capital levy on un-damaged real estate spread over 30 years to finance refugee housing and SME business start-up loans.',
            rationale:
              'A masterpiece of social market engineering: rapidly integrated 10 million skilled workers into industrial centers and spurred a massive construction boom.',
            effects: {
              treasuryDelta: 180,
              gdpGrowthDelta: 4.8,
              unemploymentDelta: -3.0,
              humanCapitalDelta: 3.2,
              approvalDelta: 8.0,
            },
          },
          {
            id: 'B',
            label: 'Encourage Mass Emigration of Refugees to the Americas and Australia',
            description:
              'Pay passage subsidies for young refugees to emigrate abroad to reduce domestic unemployment pressure.',
            rationale:
              'Permanently surrendered millions of skilled craftsmen and engineers just as the German industrial engine needed labor.',
            effects: {
              treasuryDelta: -110,
              gdpGrowthDelta: -1.5,
              unemploymentDelta: -1.8,
              humanCapitalDelta: -3.0,
              approvalDelta: -4.0,
            },
          },
          {
            id: 'C',
            label: 'Confine Refugees to Permanent Rural Agricultural Enclaves',
            description:
              'Ban refugees from moving to industrial cities and mandate agrarian self-sufficiency.',
            rationale:
              'Created pockets of persistent rural poverty while Ruhr and Bavarian factories suffered acute worker shortages.',
            effects: {
              treasuryDelta: -180,
              gdpGrowthDelta: -0.8,
              unemploymentDelta: 2.1,
              approvalDelta: -8.0,
            },
          },
        ],
      },
      {
        round: 4,
        fiscalYearLabel: '1951 (FY 4)',
        title: 'The "Korea Boom" Raw Material Shock & European Payments Union Crisis',
        context:
          'Outbreak of the Korean War unleashes insatiable world demand for German machine tools and steel, but surging raw material import prices cause a severe trade deficit.',
        options: [
          {
            id: 'A',
            label: 'Accelerated Capital Depreciation Tax Write-Offs & Vocational Dual-Training',
            description:
              'Allow Mittelstand firms to immediately write off 100% of reinvested capital equipment from corporate taxes, paired with the state-backed Dual Apprenticeship system.',
            rationale:
              'Turned West Germany into the high-precision machine workshop of the free world, permanently flipping the trade balance into a structural surplus.',
            effects: {
              treasuryDelta: 220,
              gdpGrowthDelta: 5.6,
              unemploymentDelta: -2.8,
              humanCapitalDelta: 3.5,
              approvalDelta: 7.5,
            },
          },
          {
            id: 'B',
            label: 'Impose Export Embargoes on Machinery to Satisfy Domestic Demand First',
            description:
              'Ban machine tool exports to force domestic prices down.',
            rationale:
              'Missed the greatest post-war global trade boom and alienated European trade partners.',
            effects: {
              treasuryDelta: -150,
              gdpGrowthDelta: -2.8,
              unemploymentDelta: 1.8,
              approvalDelta: -6.0,
            },
          },
          {
            id: 'C',
            label: 'Print Central Bank Credit to Subsidize Raw Material Importers',
            description:
              'Provide direct state cash subsidies to cover high international coal and copper prices.',
            rationale:
              'Fueled domestic inflation and weakened the international value of the Deutsche Mark.',
            effects: {
              treasuryDelta: -260,
              inflationDelta: 5.2,
              gdpGrowthDelta: 0.6,
              approvalDelta: -5.0,
            },
          },
        ],
      },
      {
        round: 5,
        fiscalYearLabel: '1952–1953 (FY 5)',
        title: 'The 1953 London Debt Agreement & Co-Determination (Mitbestimmung)',
        context:
          'Allied creditors demand settlement of pre-war Weimar and post-war external debts totaling DM 30B. Simultaneously, trade unions demand a voice in industrial boardrooms.',
        options: [
          {
            id: 'A',
            label: 'Sign London Debt Accord (50% Relief Tied to Export Surpluses) + Mitbestimmung Pact',
            description:
              'Negotiate 50% principal cancellation with repayments strictly capped at 3% of export earnings; grant labor 50% representation on coal and steel supervisory boards.',
            rationale:
              'Restored AAA sovereign credit rating, cemented 40 years of industrial labor peace, and propelled West Germany into sustained full employment.',
            effects: {
              treasuryDelta: 310,
              gdpGrowthDelta: 4.8,
              debtToGdpDelta: -12.0,
              inflationDelta: -1.8,
              unemploymentDelta: -2.4,
              approvalDelta: 9.0,
            },
          },
          {
            id: 'B',
            label: 'Repudiate All Pre-1945 Debts and Walk Out of the London Conference',
            description:
              'Refuse to recognize pre-war Weimar debts or pay single Pfennig to Allied bondholders.',
            rationale:
              'Allied nations immediately seized German ships in foreign ports and blocked international letters of credit for German exporters.',
            effects: {
              treasuryDelta: -190,
              gdpGrowthDelta: -4.2,
              unemploymentDelta: 3.0,
              approvalDelta: -12.0,
            },
          },
          {
            id: 'C',
            label: 'Ban Labor Unions & Impose State Wage Decrees in Heavy Industry',
            description:
              'Outlaw collective bargaining and suppress industrial codetermination by executive decree.',
            rationale:
              'Triggered a paralyzed general strike across the entire Ruhr industrial heartland.',
            effects: {
              treasuryDelta: -280,
              gdpGrowthDelta: -3.6,
              unemploymentDelta: 2.2,
              approvalDelta: -18.0,
            },
          },
        ],
      },
    ],
    historicalOutcome: {
      summary:
        'By 1953, the combination of Ludwig Erhard’s Social Market deregulation, KfW Marshall Plan revolving capital, refugee integration, and the 1953 London Debt Accord unleashed the "Wirtschaftswunder": industrial output tripled, unemployment fell from 11% to under 3.2%, and Germany became Europe’s primary export powerhouse.',
      gdp: 16800,
      gdpGrowth: 8.5,
      debtToGdp: 16.0,
      inflation: 1.8,
      unemployment: 3.2,
      treasury: 1850,
      historicalCapitalTrajectory: [800, 960, 1150, 1340, 1580, 1850],
    },
  },
];
