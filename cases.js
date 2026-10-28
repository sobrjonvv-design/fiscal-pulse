/* ==========================================================================
   FISCAL PULSE — CASE DATA (v5.1)
   4 historical countries x 5 fiscal years.
   Each year: rich briefing, central question, 3 policy options (shuffled optimal),
   and optimal ranges for the budget/monetary levers (scored).
   ========================================================================== */
(function () {
  const casesData = [
  {
    "id": "singapore_1965",
    "codeNumber": "01",
    "name": "Singapore",
    "era": "1965–1970",
    "subtitle": "The Resource-Poor Start-up",
    "neighbors": "Malaysia, Hong Kong and Taiwan",
    "monetaryLocked": false,
    "briefing": "Expelled from Malaysia in 1965 with no natural resources, 14% unemployment and British military bases (20% of GDP) about to leave. Attract foreign investors, build Jurong port and train a skilled workforce — without exhausting scarce reserves.",
    "trendGrowth": 5,
    "trendInflation": 2,
    "bondYield": 5,
    "initialStats": {
      "round": 1,
      "gdp": 1000,
      "gdpGrowth": 2.5,
      "unemployment": 14,
      "inflation": 1.5,
      "debtToGdp": 15,
      "treasury": 500,
      "approval": 62,
      "humanCapital": 2,
      "compliance": 0.94,
      "riskPremium": 0
    },
    "startSliders": {
      "cit": 30,
      "pit": 25,
      "vat": 5,
      "rate": 4,
      "debtPay": 100,
      "infra": 3,
      "edu": 3,
      "health": 4,
      "subsidy": 3
    },
    "rounds": [
      {
        "round": 1,
        "yearLabel": "1965",
        "title": "Separation & The Malaysian Tariff Wall",
        "context": [
          "On 9 August 1965 Singapore is expelled from the Federation of Malaysia. Overnight the island loses the common market it had been promised — a hinterland of 10 million consumers that was supposed to buy its manufactured goods. Kuala Lumpur immediately raises tariffs on Singapore-made products, and Indonesia’s ‘Konfrontasi’ blockade is still choking regional trade.",
          "Singapore has no oil, no farmland and even imports its drinking water from Malaysia. One in seven workers is unemployed, two-thirds of the population live in overcrowded slums, and the old entrepôt trade — buying and reselling regional goods — can no longer employ a population growing by 4% a year.",
          "There are two paths. Protect small domestic workshops behind tariff walls, as most newly independent countries are doing — or bet everything on attracting foreign multinationals that will use Singapore as an export platform to the US and Europe. Multinationals compare tax rates, infrastructure and political stability across Asia before choosing where to build."
        ],
        "facts": [
          "Unemployment: 14%",
          "Domestic market: 1.9 million people",
          "Hong Kong corporate tax: 15%",
          "Natural resources: none"
        ],
        "question": "How should Singapore respond to the loss of the Malaysian market — and how should you set taxes and spending to make the island attractive to foreign investors?",
        "order": "ABC",
        "targets": {
          "cit": {
            "lo": 10,
            "hi": 18,
            "why": "Pioneer-status tax relief: investors compared Singapore with Hong Kong (15%) and Taiwan."
          },
          "vat": {
            "lo": 0,
            "hi": 4,
            "why": "A free port cannot afford consumption taxes that raise living costs and wages."
          },
          "infra": {
            "lo": 5,
            "hi": 8,
            "why": "Jurong needed land reclamation, roads, power and water before factories could arrive."
          },
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "Subsidising uncompetitive workshops wastes scarce reserves — let foreign investment lead."
          },
          "debtPay": {
            "lo": 100,
            "hi": 110,
            "why": "A brand-new state must prove it is creditworthy from day one."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 5,
            "label": "Retaliatory Import Tariffs on Regional Goods",
            "description": "Impose 30% countervailing tariffs to shelter domestic workshops and raise immediate customs revenue.",
            "rationale": "Protected inefficient workshops but triggered regional retaliation and raised consumer import prices on a island that imports almost everything.",
            "effects": {
              "treasuryDelta": 25,
              "gdpGrowthDelta": -1.2,
              "inflationDelta": 2.1,
              "unemploymentDelta": 0.8,
              "approvalDelta": -4
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Pioneer Industries Ordinance & 5-Year FDI Tax Holidays",
            "description": "Offer 5-year corporate tax relief to export-oriented multinationals and allocate $40M to the Economic Development Board to reclaim the Jurong swamps.",
            "rationale": "Transformed Singapore into an export-led manufacturing hub, attracting Texas Instruments and Hewlett-Packard.",
            "effects": {
              "treasuryDelta": -40,
              "gdpGrowthDelta": 3.2,
              "unemploymentDelta": -1.8,
              "humanCapitalDelta": 1.5,
              "approvalDelta": 5
            }
          },
          {
            "id": "C",
            "points": 20,
            "label": "Emergency Cash Relief for Unemployed Dock Workers",
            "description": "Issue $50M of universal relief payments to unemployed port labourers without restructuring the economy.",
            "rationale": "Eased hardship and boosted popularity briefly, but drained scarce reserves without creating any productive asset or permanent job.",
            "effects": {
              "treasuryDelta": -50,
              "gdpGrowthDelta": 0.4,
              "unemploymentDelta": -0.4,
              "approvalDelta": 7
            }
          }
        ]
      },
      {
        "round": 2,
        "yearLabel": "1966",
        "title": "Jurong Port Expansion & Mobilising National Savings",
        "context": [
          "The Economic Development Board has begun converting 6,500 hectares of swamp in Jurong into an industrial estate, but factories are slow to arrive: foreign investors want deep-water berths, reliable electricity and housing for workers before committing. Shell and Mobil are considering large oil refineries — but only if the port can handle supertankers.",
          "The government has almost no foreign borrowing capacity, and European banks offer loans only at 8–9% interest with exchange-rate risk. However, Singapore has a powerful domestic tool: the Central Provident Fund (CPF), a compulsory savings scheme in which workers and employers contribute part of every paycheck.",
          "Housing is also a political time bomb: around 200,000 families live in wooden shacks prone to fire. Building public flats would create construction jobs immediately and give workers a stake in the nation’s future — but it must be financed without draining reserves or creating inflation."
        ],
        "facts": [
          "Jurong estate: 6,500 ha of swamp",
          "Families in slums: ~200,000",
          "Foreign loan rates: 8–9%",
          "CPF: compulsory workplace savings"
        ],
        "question": "How do you finance the port and housing boom — and how much should the budget invest in infrastructure versus welfare this year?",
        "order": "ABC",
        "targets": {
          "infra": {
            "lo": 6,
            "hi": 9,
            "why": "Port, power and housing construction were the binding constraint on new investment."
          },
          "health": {
            "lo": 2,
            "hi": 4,
            "why": "Singapore relied on CPF self-reliance rather than costly welfare transfers."
          },
          "pit": {
            "lo": 15,
            "hi": 25,
            "why": "Moderate income tax kept take-home pay competitive while CPF built national savings."
          },
          "rate": {
            "lo": 4,
            "hi": 6,
            "why": "Moderate interest rates supported construction without stoking inflation."
          },
          "debtPay": {
            "lo": 100,
            "hi": 110,
            "why": "A clean debt record keeps future borrowing cheap."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 20,
            "label": "High-Interest Foreign Sovereign Loan Syndication",
            "description": "Borrow $120M from European private banks and outsource turnkey construction to foreign contractors.",
            "rationale": "Accelerated delivery but sharply increased external debt service and foreign-exchange risk.",
            "effects": {
              "treasuryDelta": 70,
              "debtToGdpDelta": 8.5,
              "gdpGrowthDelta": 1.6,
              "approvalDelta": 1
            }
          },
          {
            "id": "B",
            "points": 5,
            "label": "Postpone Port Dredging to Balance the Budget",
            "description": "Halt capital dredging and ask investors to unload cargo from offshore anchorages using small boats.",
            "rationale": "Preserved short-term cash, but Shell and Mobil deferred their planned refinery investments.",
            "effects": {
              "treasuryDelta": 35,
              "gdpGrowthDelta": -2.2,
              "unemploymentDelta": 1.4,
              "approvalDelta": -6
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Local Infrastructure Bonds & Mobilise the Central Provident Fund (CPF)",
            "description": "Channel domestic retirement savings into public housing estates and port cranes, keeping foreign debt at zero.",
            "rationale": "Created high-multiplier construction jobs while giving workers ownership of their homes — without foreign-currency risk.",
            "effects": {
              "treasuryDelta": -30,
              "gdpGrowthDelta": 2.8,
              "unemploymentDelta": -2,
              "humanCapitalDelta": 1.8,
              "approvalDelta": 6
            }
          }
        ]
      },
      {
        "round": 3,
        "yearLabel": "1967",
        "title": "Sterling Devaluation & The Currency Decision",
        "context": [
          "In November 1967 Britain devalues the pound sterling by 14.3%. Singapore still holds most of its reserves in sterling and its currency is effectively tied to it. Overnight the nation’s savings lose value, and the question becomes urgent: should Singapore follow sterling down, or build an independent, hard currency?",
          "Devaluing would make Singapore’s labour temporarily cheaper for foreign buyers — but the island imports almost everything, from rice and fuel to machinery, so shop prices would jump immediately. Foreign investors are watching closely: a currency that can be devalued at will is a risk to every dollar they bring in.",
          "The alternative is a currency board: every Singapore dollar issued must be backed 100% by gold and foreign reserves, and the government gives up the option to print money. It is a straitjacket — but one that could make the Singapore dollar one of the most trusted currencies in Asia."
        ],
        "facts": [
          "Sterling devaluation: −14.3%",
          "Imported share of food & fuel: ~100%",
          "Reserves held in sterling: majority",
          "Inflation: 1.5%"
        ],
        "question": "Which monetary regime should Singapore adopt — and how should interest rates and spending support confidence in the new currency?",
        "order": "ABC",
        "targets": {
          "rate": {
            "lo": 5,
            "hi": 8,
            "why": "Firm interest rates defended the new currency and attracted reserves."
          },
          "vat": {
            "lo": 0,
            "hi": 4,
            "why": "Avoid adding tax-driven price rises on top of imported inflation."
          },
          "health": {
            "lo": 2,
            "hi": 4,
            "why": "Lean recurrent spending meant the currency board was never under pressure."
          },
          "infra": {
            "lo": 4,
            "hi": 7,
            "why": "Continue productive investment, but at a sustainable pace."
          },
          "debtPay": {
            "lo": 100,
            "hi": 120,
            "why": "Over-delivering on debt builds credibility for a new currency."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 50,
            "label": "Currency Board with 100% Foreign-Reserve Backing",
            "description": "Refuse to devalue; back every Singapore dollar 100% with gold and foreign-currency reserves.",
            "rationale": "Enforced iron monetary discipline, removed currency risk for investors and anchored long-term price stability.",
            "effects": {
              "treasuryDelta": -25,
              "gdpGrowthDelta": 2.1,
              "inflationDelta": -1.2,
              "approvalDelta": 4
            }
          },
          {
            "id": "B",
            "points": 20,
            "label": "Follow Sterling Down with a 15% Devaluation",
            "description": "Devalue the local currency to make port labour cheaper for foreign customers.",
            "rationale": "Labour became temporarily cheaper, but imported food and fuel prices jumped immediately.",
            "effects": {
              "treasuryDelta": 15,
              "gdpGrowthDelta": 0.9,
              "inflationDelta": 3.8,
              "approvalDelta": -5
            }
          },
          {
            "id": "C",
            "points": 0,
            "label": "Central Bank with Unlimited Treasury Overdraft",
            "description": "Give the treasury unrestricted legal authority to finance deficits by printing money at the central bank.",
            "rationale": "Unlimited liquidity on paper, but it alarmed international investors and created long-term inflation risk.",
            "effects": {
              "treasuryDelta": 60,
              "inflationDelta": 6.5,
              "gdpGrowthDelta": -1,
              "approvalDelta": -8
            }
          }
        ]
      },
      {
        "round": 4,
        "yearLabel": "1968",
        "title": "British ‘East of Suez’ Military Withdrawal",
        "context": [
          "In January 1968 London announces that all British forces will leave Singapore by 1971. The bases — naval dockyards, airfields and barracks — account for about 20% of GDP and employ some 40,000 local workers directly, with another 30,000 jobs depending on them indirectly.",
          "Unions are restless: wildcat strikes and rigid work rules have made foreign investors nervous. Meanwhile the Sembawang naval dockyard, with its dry docks and skilled ship-fitters, could be converted to commercial ship repair — if it is run as a business rather than a government department.",
          "The government must cushion tens of thousands of layoffs without creating a permanent welfare burden, and convince investors that labour relations are stable. Every decision this year signals whether Singapore can survive without its colonial protector."
        ],
        "facts": [
          "Base economy: ~20% of GDP",
          "Direct base jobs: 40,000",
          "Indirect jobs at risk: 30,000",
          "Withdrawal deadline: 1971"
        ],
        "question": "How should Singapore replace the British military economy — and how should the budget support displaced workers without bloating the state?",
        "order": "ABC",
        "targets": {
          "infra": {
            "lo": 5,
            "hi": 8,
            "why": "Converting dockyards and airfields into commercial assets required capital investment."
          },
          "edu": {
            "lo": 3,
            "hi": 5,
            "why": "Retraining base workers as technicians and ship-fitters."
          },
          "subsidy": {
            "lo": 1,
            "hi": 3,
            "why": "Targeted, temporary conversion support — not permanent bailouts."
          },
          "health": {
            "lo": 3,
            "hi": 5,
            "why": "A modest safety net during mass layoffs maintained social stability."
          },
          "cit": {
            "lo": 10,
            "hi": 18,
            "why": "Tax competitiveness was needed to attract replacement investors."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 20,
            "label": "Put Redundant Base Workers on Permanent State Payroll",
            "description": "Absorb all 40,000 civilian base workers directly into the civil service.",
            "rationale": "Prevented unrest, but permanently bloated the public payroll without building export capacity.",
            "effects": {
              "treasuryDelta": -85,
              "gdpGrowthDelta": -0.6,
              "debtToGdpDelta": 6,
              "unemploymentDelta": -1.2,
              "approvalDelta": 3
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Employment Act 1968 & Convert the Naval Base into Commercial Shipyards",
            "description": "Standardise working hours, curb wildcat strikes and commercialise the Royal Navy ship-repair yards.",
            "rationale": "Strikes fell by about 90%, commercial ship repair boomed and multinationals committed long-term.",
            "effects": {
              "treasuryDelta": -35,
              "gdpGrowthDelta": 3.6,
              "unemploymentDelta": -2.8,
              "humanCapitalDelta": 2.2,
              "approvalDelta": 4.5
            }
          },
          {
            "id": "C",
            "points": 5,
            "label": "Strict Austerity to Offset Lost Base Revenue",
            "description": "Cut infrastructure and health spending by 40% to match the drop in military spending.",
            "rationale": "Preserved reserves, but the fiscal contraction deepened the recession and pushed unemployment up.",
            "effects": {
              "treasuryDelta": 45,
              "gdpGrowthDelta": -3.5,
              "unemploymentDelta": 3.5,
              "approvalDelta": -12
            }
          }
        ]
      },
      {
        "round": 5,
        "yearLabel": "1969–1970",
        "title": "The Electronics Wave & Technical Training",
        "context": [
          "American semiconductor firms — Texas Instruments, National Semiconductor, Fairchild — are searching for Asian sites to assemble and test chips. Texas Instruments built its Singapore plant in just 50 days in 1969. More firms are coming, but they all report the same problem: a shortage of trained technicians and engineers.",
          "Singapore’s school system still produces mostly clerks and unskilled workers. Neighbouring countries offer even cheaper labour, so competing on low wages alone would trap the island in garment assembly with thin margins and no future.",
          "Partnering with companies such as Philips, Rollei and Tata to create joint technical institutes could raise skills quickly — but it costs money today for returns that appear only years later. Your choices now decide whether Singapore becomes a high-skill economy or remains a low-wage workshop."
        ],
        "facts": [
          "TI plant built in: 50 days",
          "Unemployment now: ~8%",
          "Engineers per capita: very low",
          "Regional wage competition: intense"
        ],
        "question": "How do you build the skilled workforce the electronics industry needs — and where should the budget’s priorities lie in this final year?",
        "order": "ABC",
        "targets": {
          "edu": {
            "lo": 5,
            "hi": 7,
            "why": "Technical institutes and polytechnics were the key to moving up the value chain."
          },
          "cit": {
            "lo": 10,
            "hi": 18,
            "why": "Investor taxes had to stay competitive as the electronics wave arrived."
          },
          "infra": {
            "lo": 4,
            "hi": 6,
            "why": "Maintain industrial estates and utilities."
          },
          "pit": {
            "lo": 15,
            "hi": 25,
            "why": "Moderate income tax helps retain skilled workers."
          },
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "Don’t subsidise low-wage assembly — invest in skills instead."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 20,
            "label": "Focus on Low-Wage Garment Assembly",
            "description": "Reject expensive technical education and keep wages low to attract textile factories.",
            "rationale": "Provided immediate manual jobs, but trapped the economy in low-margin goods vulnerable to cheaper neighbours.",
            "effects": {
              "treasuryDelta": 10,
              "gdpGrowthDelta": 1.1,
              "unemploymentDelta": -1.5,
              "humanCapitalDelta": -1,
              "approvalDelta": -1
            }
          },
          {
            "id": "B",
            "points": 5,
            "label": "Payroll Tax on Foreign Engineers in Multinational Factories",
            "description": "Levy $500 per month on every foreign engineer and executive working in the industrial zones.",
            "rationale": "Quick revenue, but Texas Instruments diverted planned investments elsewhere.",
            "effects": {
              "treasuryDelta": 35,
              "gdpGrowthDelta": -2.4,
              "unemploymentDelta": 1.2,
              "approvalDelta": -5
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Co-Fund Joint Industry–State Technical Training Institutes",
            "description": "Partner with Philips, Rollei and Tata to create specialised technical institutes with state bursaries.",
            "rationale": "Permanently upgraded workforce skills, turning Singapore into Southeast Asia’s precision-electronics leader.",
            "effects": {
              "treasuryDelta": -45,
              "gdpGrowthDelta": 4.2,
              "unemploymentDelta": -3.4,
              "humanCapitalDelta": 4,
              "approvalDelta": 8
            }
          }
        ]
      }
    ],
    "historicalOutcome": {
      "summary": "Singapore quadrupled export manufacturing, cut unemployment from 14% to 5.2% and built a strong balance sheet anchored by CPF savings and EDB industrial estates.",
      "gdpGrowth": 9.8,
      "debtToGdp": 22,
      "inflation": 2.1,
      "unemployment": 5.2
    }
  },
  {
    "id": "norway_1975",
    "codeNumber": "02",
    "name": "Norway",
    "era": "1975–1980",
    "subtitle": "Managing the Oil Boom",
    "neighbors": "Sweden, Denmark and the United Kingdom",
    "monetaryLocked": false,
    "briefing": "North Sea oil is pouring in. Norway faces “Dutch Disease”: petrodollars threaten to inflate wages, push up the krone, crush traditional industries and overheat the welfare state.",
    "trendGrowth": 4,
    "trendInflation": 7,
    "bondYield": 6,
    "initialStats": {
      "round": 1,
      "gdp": 15000,
      "gdpGrowth": 4.8,
      "unemployment": 2.5,
      "inflation": 8.5,
      "debtToGdp": 28,
      "treasury": 4200,
      "approval": 74,
      "humanCapital": 3.5,
      "compliance": 0.98,
      "riskPremium": 0
    },
    "startSliders": {
      "cit": 30,
      "pit": 40,
      "vat": 20,
      "rate": 4,
      "debtPay": 100,
      "infra": 6,
      "edu": 5,
      "health": 12,
      "subsidy": 4
    },
    "rounds": [
      {
        "round": 1,
        "yearLabel": "1975",
        "title": "Ekofisk Oil & The Petroleum Tax Question",
        "context": [
          "Oil from the Ekofisk field in the North Sea has started to flow, and production is rising fast. Within a few years petroleum could earn more than all of Norway’s traditional exports combined. International oil companies — Phillips, Shell, Esso — have the technology, but Norway owns the seabed.",
          "Unions demand that the oil wealth be paid out immediately through higher wages and lower taxes. Economists warn of ‘Dutch Disease’: when the Netherlands found natural gas in the 1960s, its currency rose, its factories lost competitiveness and unemployment followed.",
          "Norway must decide how much of the oil profit (the ‘resource rent’) the state captures, how much control it keeps through the new state oil company Statoil, and how fast the money is allowed to enter the mainland economy."
        ],
        "facts": [
          "Oil production: rising rapidly",
          "Inflation: 8.5%",
          "Unemployment: 2.5%",
          "Key risk: Dutch Disease"
        ],
        "question": "How should Norway tax and control its oil — and how should the mainland budget be set so the windfall does not overheat the economy?",
        "order": "ABC",
        "targets": {
          "cit": {
            "lo": 26,
            "hi": 32,
            "why": "Mainland companies keep a normal tax rate; the special 78% applies only to oil rent."
          },
          "infra": {
            "lo": 3,
            "hi": 5,
            "why": "Don’t flood the mainland economy with oil cash all at once."
          },
          "subsidy": {
            "lo": 1,
            "hi": 3,
            "why": "Avoid new subsidy programmes financed by uncertain oil revenue."
          },
          "rate": {
            "lo": 5,
            "hi": 7,
            "why": "Firmer interest rates help contain an already high inflation rate."
          },
          "debtPay": {
            "lo": 100,
            "hi": 120,
            "why": "Early oil revenue can pay down state debt."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 5,
            "label": "Pass All Oil Revenue to Households as Tax Rebates",
            "description": "Cut income taxes to zero and mail an oil cheque to every citizen.",
            "rationale": "Hugely popular, but triggered a spending frenzy that pushed consumer inflation past 14%.",
            "effects": {
              "treasuryDelta": -250,
              "gdpGrowthDelta": 2.8,
              "inflationDelta": 5.5,
              "approvalDelta": 10
            }
          },
          {
            "id": "B",
            "points": 15,
            "label": "Nationalise All Rigs & Expel Foreign Operators",
            "description": "Bar foreign oil majors and spend $600M building domestic exploration capacity from scratch.",
            "rationale": "Delayed drilling by about three years because Norway lacked the technology.",
            "effects": {
              "treasuryDelta": -600,
              "gdpGrowthDelta": -1.6,
              "debtToGdpDelta": 4,
              "approvalDelta": -4
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "78% Petroleum Rent Tax & 50% Statoil Equity Mandate",
            "description": "Capture the resource rent for the state and require technology transfer to Norwegian shipyards and engineers.",
            "rationale": "Secured public ownership of the oil wealth while shielding mainland Norway from a sudden cash shock.",
            "effects": {
              "treasuryDelta": 380,
              "gdpGrowthDelta": 1.4,
              "humanCapitalDelta": 2,
              "approvalDelta": 5
            }
          }
        ]
      },
      {
        "round": 2,
        "yearLabel": "1976",
        "title": "Dutch Disease & The Squeeze on Traditional Industry",
        "context": [
          "Offshore platforms are bidding away engineers, welders and electricians from mainland shipyards with wages 30–50% higher. Average mainland wage growth has hit 16%, and the krone is strengthening. Coastal shipyards, pulp mills and fish processors are losing export orders to Sweden, Japan and South Korea.",
          "Local mayors demand permanent subsidies to keep the yards open. But many of these firms were already uncompetitive before the oil boom; subsidising them would lock workers into declining industries, financed by oil money that may not last.",
          "Some shipyards, however, are learning to build offshore platforms and subsea equipment — a new high-tech niche. The question is whether the state protects the old structure or helps workers move into the industries of the future."
        ],
        "facts": [
          "Mainland wage growth: 16%",
          "Shipyard order books: falling",
          "Krone: appreciating",
          "Offshore wage premium: 30–50%"
        ],
        "question": "How should Norway respond to the squeeze on traditional exporters — and how should spending and interest rates be set to fight Dutch Disease?",
        "order": "ABC",
        "targets": {
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "Blanket bailouts lock labour into declining sectors."
          },
          "edu": {
            "lo": 6,
            "hi": 8,
            "why": "Funding subsea engineering and automation R&D created new competitive industries."
          },
          "infra": {
            "lo": 3,
            "hi": 5,
            "why": "Keep public construction modest — the labour market is already overheated."
          },
          "rate": {
            "lo": 6,
            "hi": 8,
            "why": "Higher rates cool the wage-price spiral."
          },
          "pit": {
            "lo": 35,
            "hi": 45,
            "why": "Keep income tax stable; cutting it now would add fuel to the fire."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 50,
            "label": "Restrain Mainland Subsidies & Fund High-Tech Automation R&D",
            "description": "Refuse open-ended bailouts for obsolete factories; fund robotics and subsea engineering instead.",
            "rationale": "Forced traditional manufacturing to move up the value chain into high-margin subsea technology.",
            "effects": {
              "treasuryDelta": -120,
              "gdpGrowthDelta": 1.8,
              "inflationDelta": -1.8,
              "humanCapitalDelta": 2.8,
              "approvalDelta": 2
            }
          },
          {
            "id": "B",
            "points": 10,
            "label": "Blanket Operating Subsidies for All Uncompetitive Factories",
            "description": "Use petroleum tax revenue to permanently subsidise unprofitable shipyards.",
            "rationale": "Preserved local jobs for a while, but locked labour into loss-making sectors.",
            "effects": {
              "treasuryDelta": -420,
              "gdpGrowthDelta": 0.3,
              "inflationDelta": 2.2,
              "unemploymentDelta": -0.6,
              "approvalDelta": 6
            }
          },
          {
            "id": "C",
            "points": 15,
            "label": "Devalue the Krone by 12% to Protect Exporters",
            "description": "Artificially weaken the krone to restore exporters’ profit margins.",
            "rationale": "Helped exporters briefly, but ignited a fierce wage-price spiral.",
            "effects": {
              "treasuryDelta": -50,
              "gdpGrowthDelta": 0.8,
              "inflationDelta": 4.2,
              "approvalDelta": -3
            }
          }
        ]
      },
      {
        "round": 3,
        "yearLabel": "1977",
        "title": "Credit Boom & Property Bubble",
        "context": [
          "Bank lending is growing by 24% a year. Expecting oil-fuelled prosperity, households borrow to buy homes and cars; property prices in Oslo and Stavanger are rising at double-digit rates. Consumer price inflation has climbed above 10%.",
          "Interest rates are still low by political tradition, and the government has expanded public works across all 19 counties. Employers report severe labour shortages, while the current account has swung into a large deficit as imports surge.",
          "Cooling the boom will be unpopular: higher interest rates hurt new homeowners, and cutting public projects disappoints local politicians. But if the bubble keeps inflating, a painful crash could follow."
        ],
        "facts": [
          "Credit growth: 24% per year",
          "CPI inflation: 10.5%",
          "Current account: deep deficit",
          "Labour market: severe shortages"
        ],
        "question": "How do you cool the overheating economy — which mix of monetary and fiscal tightening is right?",
        "order": "ABC",
        "targets": {
          "rate": {
            "lo": 8,
            "hi": 11,
            "why": "The central bank had to raise rates sharply (8%+) to cool credit growth."
          },
          "infra": {
            "lo": 2,
            "hi": 4,
            "why": "Postpone non-essential public works while the economy is overheated."
          },
          "vat": {
            "lo": 20,
            "hi": 24,
            "why": "Consumption taxes help dampen excess demand."
          },
          "health": {
            "lo": 10,
            "hi": 13,
            "why": "Hold welfare spending growth flat during the boom."
          },
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "No new subsidies in an overheated economy."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 5,
            "label": "Keep Rates Low & Double Public Construction",
            "description": "Build new fjord highways and community centres across all 19 counties.",
            "rationale": "Pushed the economy beyond its capacity, worsening labour shortages and inflation.",
            "effects": {
              "treasuryDelta": -340,
              "gdpGrowthDelta": 2.4,
              "inflationDelta": 4.8,
              "unemploymentDelta": -0.8,
              "approvalDelta": 5
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Credit Controls, Bank Reserve Hikes & Fiscal Tightening",
            "description": "Impose lending ceilings, raise central bank rates and trim the growth of public consumption.",
            "rationale": "Cooled the speculative property bubble and brought credit growth back in line with real productivity.",
            "effects": {
              "treasuryDelta": 180,
              "gdpGrowthDelta": -0.9,
              "inflationDelta": -3.2,
              "approvalDelta": -4
            }
          },
          {
            "id": "C",
            "points": 15,
            "label": "Price Ceilings & Retail Food Subsidies",
            "description": "Legislate price caps on milk, butter and fish, compensating grocers from oil revenue.",
            "rationale": "Suppressed the price index on paper, but created shortages and cost $280M a year in recurring subsidies.",
            "effects": {
              "treasuryDelta": -280,
              "gdpGrowthDelta": -0.4,
              "inflationDelta": -1,
              "approvalDelta": 3
            }
          }
        ]
      },
      {
        "round": 4,
        "yearLabel": "1978",
        "title": "The Kleppe Package: Breaking the Wage-Price Spiral",
        "context": [
          "Despite tighter credit, wages and prices keep chasing each other: unions demand 18% raises to compensate for inflation, which then pushes prices up further. Norwegian industry’s labour costs are now among the highest in Europe.",
          "Finance Minister Per Kleppe proposes a ‘tripartite’ deal: government, employers and unions negotiate together. Unions would accept a wage freeze for 15 months; in return the state offers moderate income-tax relief and higher family allowances so that real household incomes are protected.",
          "The alternatives are tempting but risky: breaking the unions by decree could trigger strikes that halt oil production, while simply paying the 18% demand would destroy what remains of mainland competitiveness."
        ],
        "facts": [
          "Union wage demand: 18%",
          "Inflation: ~9%",
          "Labour costs: highest in the Nordics",
          "Proposed freeze: 15 months"
        ],
        "question": "How do you break the wage-price spiral — and how should taxes and social spending support an incomes agreement?",
        "order": "ABC",
        "targets": {
          "pit": {
            "lo": 32,
            "hi": 40,
            "why": "Moderate income-tax relief was the government’s side of the wage deal."
          },
          "health": {
            "lo": 12,
            "hi": 15,
            "why": "Higher family allowances protected real incomes during the wage freeze."
          },
          "rate": {
            "lo": 6,
            "hi": 9,
            "why": "Firm monetary policy anchored inflation expectations."
          },
          "vat": {
            "lo": 18,
            "hi": 22,
            "why": "Raising VAT would push prices up in the middle of a wage freeze."
          },
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "Don’t reopen the subsidy tap."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 0,
            "label": "Break the Unions & Decree Public-Sector Pay Cuts",
            "description": "Refuse negotiation; pass an emergency decree cutting state salaries by 8%.",
            "rationale": "Triggered an offshore logistics strike that shut down Ekofisk drilling for two months.",
            "effects": {
              "treasuryDelta": -210,
              "gdpGrowthDelta": -2.8,
              "unemploymentDelta": 1.2,
              "approvalDelta": -14
            }
          },
          {
            "id": "B",
            "points": 10,
            "label": "Concede the Full 18% Wage Demand",
            "description": "Accept all union demands and fund the public payroll from treasury reserves.",
            "rationale": "Preserved labour peace, but destroyed what remained of mainland export competitiveness.",
            "effects": {
              "treasuryDelta": -380,
              "gdpGrowthDelta": 0.5,
              "inflationDelta": 5,
              "approvalDelta": 4
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Tripartite Solidarity Wage Accord",
            "description": "Trade moderate tax cuts and family benefits for a 15-month statutory wage freeze.",
            "rationale": "Broke the wage-price spiral without triggering national strikes.",
            "effects": {
              "treasuryDelta": -90,
              "gdpGrowthDelta": 2.2,
              "inflationDelta": -4,
              "unemploymentDelta": -0.3,
              "approvalDelta": 7
            }
          }
        ]
      },
      {
        "round": 5,
        "yearLabel": "1979–1980",
        "title": "Second Oil Shock & The Sovereign Wealth Decision",
        "context": [
          "The Iranian Revolution sends oil prices from $14 to over $35 a barrel. Norway’s petroleum revenues explode — a windfall worth several percent of GDP every year. Politicians from every party have plans to spend it: high-speed railways, early retirement at 55, new sports halls in every town.",
          "Economists remember 1976–77: when oil money entered the mainland economy too fast, inflation and a property bubble followed. Oil prices are also volatile — what if they fall again? (They did, by more than half, in 1986.)",
          "One radical idea is to ‘sterilise’ the windfall: invest most of it abroad in foreign stocks and bonds, and let the budget use only a small, steady return. This became the foundation of today’s $1.6 trillion Government Pension Fund Global."
        ],
        "facts": [
          "Oil price: $14 → $35 per barrel",
          "Windfall: several % of GDP per year",
          "1986 oil price crash: −50%",
          "Fund value today: $1.6 trillion"
        ],
        "question": "What should Norway do with the oil windfall — and how disciplined should the domestic budget remain?",
        "order": "ABC",
        "targets": {
          "infra": {
            "lo": 3,
            "hi": 5,
            "why": "Sterilisation means domestic spending stays capped despite the windfall."
          },
          "health": {
            "lo": 11,
            "hi": 14,
            "why": "Keep welfare stable rather than locking in new permanent entitlements."
          },
          "rate": {
            "lo": 6,
            "hi": 9,
            "why": "Firm rates prevent another credit boom."
          },
          "debtPay": {
            "lo": 110,
            "hi": 130,
            "why": "Using the windfall to pay down state debt strengthens the balance sheet."
          },
          "edu": {
            "lo": 5,
            "hi": 7,
            "why": "Invest a share in knowledge that outlasts the oil."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 10,
            "label": "Spend the Windfall on Massive Domestic Public Works",
            "description": "Fund high-speed rail, luxury public sports centres and early retirement at 55.",
            "rationale": "Created euphoria, but locked the budget into high recurring costs that became unaffordable when oil collapsed in 1986.",
            "effects": {
              "treasuryDelta": -450,
              "gdpGrowthDelta": 3.2,
              "inflationDelta": 5.8,
              "approvalDelta": 9
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Sterilise the Windfall in Foreign Assets (Sovereign Wealth Fund)",
            "description": "Invest 80% of surplus oil taxes abroad and cap how much the domestic budget may draw each year.",
            "rationale": "Prevented overheating and laid the foundation of the world’s largest sovereign wealth fund.",
            "effects": {
              "treasuryDelta": 750,
              "gdpGrowthDelta": 1.6,
              "inflationDelta": -2,
              "debtToGdpDelta": -5,
              "approvalDelta": 8
            }
          },
          {
            "id": "C",
            "points": 10,
            "label": "Cut Oil Production by 50% to Conserve Resources",
            "description": "Halt new drilling licences and cap export volumes.",
            "rationale": "Conserved oil for the future, but gave up peak world prices and slashed revenue.",
            "effects": {
              "treasuryDelta": -320,
              "gdpGrowthDelta": -1.8,
              "unemploymentDelta": 1,
              "approvalDelta": -6
            }
          }
        ]
      }
    ],
    "historicalOutcome": {
      "summary": "Norway avoided Dutch Disease through wage discipline and by investing surplus oil revenue abroad, preserving mainland industry and laying the groundwork for the $1.6 trillion Government Pension Fund Global.",
      "gdpGrowth": 4.5,
      "debtToGdp": 21,
      "inflation": 4.8,
      "unemployment": 1.9
    }
  },
  {
    "id": "greece_2009",
    "codeNumber": "03",
    "name": "Greece",
    "era": "2009–2014",
    "subtitle": "Sovereign Debt Crisis",
    "neighbors": "Bulgaria, Cyprus and Romania",
    "monetaryLocked": true,
    "lockedRateNote": "Set by the European Central Bank — Greece uses the euro and cannot run its own monetary policy.",
    "briefing": "The deficit is revealed at 15.7% of GDP, debt is 127% of GDP, tax evasion is pervasive — and as a eurozone member Greece cannot devalue or print money. Bond markets shut Greece out.",
    "trendGrowth": -2,
    "trendInflation": 2,
    "bondYield": 4,
    "initialStats": {
      "round": 1,
      "gdp": 33000,
      "gdpGrowth": -3.2,
      "unemployment": 12.5,
      "inflation": 4.2,
      "debtToGdp": 127,
      "treasury": 250,
      "approval": 46,
      "humanCapital": 2.2,
      "compliance": 0.65,
      "riskPremium": 1
    },
    "startSliders": {
      "cit": 25,
      "pit": 35,
      "vat": 19,
      "rate": 1,
      "debtPay": 100,
      "infra": 3,
      "edu": 3.5,
      "health": 20,
      "subsidy": 2
    },
    "rounds": [
      {
        "round": 1,
        "yearLabel": "2009",
        "title": "The Deficit Revelation",
        "context": [
          "In October 2009 a new government announces that the budget deficit is not 3.7% of GDP, as previously reported, but over 12% — later revised to 15.7%. Greek statistics have been unreliable for years. Rating agencies downgrade Greek bonds, and interest rates on 10-year debt jump past 11%.",
          "Public debt stands at 127% of GDP. Tax evasion is massive: an estimated €20–30 billion goes uncollected every year, much of it from self-employed professionals paid in cash. Because Greece uses the euro, it cannot devalue its currency or print money — the European Central Bank sets interest rates for the whole eurozone.",
          "Markets want proof that Greece can fix its finances. Slashing everything at once could crash the economy; doing nothing means bankruptcy within months. The government’s credibility — starting with honest statistics — is the first asset to rebuild."
        ],
        "facts": [
          "Deficit: 15.7% of GDP",
          "Debt: 127% of GDP",
          "10-year bond yield: 11%+",
          "Uncollected taxes: €20–30 bn per year"
        ],
        "question": "How should Greece respond to the collapse of market confidence — and how should taxes and spending be adjusted without destroying the economy?",
        "order": "ABC",
        "targets": {
          "vat": {
            "lo": 19,
            "hi": 23,
            "why": "A moderate VAT rise helps — but collection, not the rate, is the real problem."
          },
          "cit": {
            "lo": 20,
            "hi": 26,
            "why": "Higher CIT would push firms to Bulgaria (10%) and Cyprus (10%)."
          },
          "health": {
            "lo": 17,
            "hi": 19,
            "why": "Trim waste, but avoid brutal cuts that deepen the recession."
          },
          "subsidy": {
            "lo": 0,
            "hi": 1,
            "why": "Clientelist subsidies were among the first things to cut."
          },
          "debtPay": {
            "lo": 100,
            "hi": 105,
            "why": "Missing a single payment while markets are watching would trigger default."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 15,
            "label": "Front-Loaded Austerity: Slash Pensions & Raise VAT to 23% Immediately",
            "description": "Cut all spending by 20% at once to appease bondholders, without reforming tax collection.",
            "rationale": "Classic austerity trap: GDP fell about 6%, so the debt-to-GDP ratio rose even faster.",
            "effects": {
              "treasuryDelta": 350,
              "gdpGrowthDelta": -5.8,
              "unemploymentDelta": 4.2,
              "debtToGdpDelta": 12,
              "approvalDelta": -16
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Statistical Reform, Digital Tax Audits & a Broader Tax Base",
            "description": "Restore honest statistics (ELSTAT), launch bank-data cross-checks on tax evaders and seek official EU/IMF bridge loans.",
            "rationale": "Attacked the root cause — tax evasion and lost credibility — without instantly crushing demand.",
            "effects": {
              "treasuryDelta": 850,
              "complianceDelta": 0.08,
              "gdpGrowthDelta": -1.4,
              "debtToGdpDelta": 3.5,
              "approvalDelta": -3
            }
          },
          {
            "id": "C",
            "points": 0,
            "label": "Debt Moratorium & Return to the Drachma (‘Grexit’)",
            "description": "Repudiate foreign debt, leave the eurozone overnight and print a new national currency.",
            "rationale": "Bank runs, a collapsing currency and soaring prices for imported food, fuel and medicine.",
            "effects": {
              "treasuryDelta": -250,
              "gdpGrowthDelta": -9.5,
              "inflationDelta": 16,
              "debtToGdpDelta": -25,
              "unemploymentDelta": 7,
              "approvalDelta": -22
            }
          }
        ]
      },
      {
        "round": 2,
        "yearLabel": "2010",
        "title": "The First Troika Bailout",
        "context": [
          "Greece can no longer borrow from markets. In May 2010 the ‘Troika’ — the European Commission, the European Central Bank and the IMF — offers €110 billion in emergency loans, the largest bailout in history at that time. In return Greece must cut its deficit and implement deep structural reforms.",
          "Hospitals overpay for supplies by up to 300% compared with other EU countries; opening a business takes months of paperwork; pension rules let some workers retire in their early fifties. Without the loans, the state cannot pay salaries and pensions next month.",
          "Protesters fill Syntagma Square. Some politicians propose seeking loans from Russia or China instead; others want emergency taxes added to electricity bills. The challenge is to accept the money while protecting the most vulnerable and fixing waste rather than simply cutting."
        ],
        "facts": [
          "Bailout: €110 billion",
          "Hospital overpricing: up to 300%",
          "Unemployment: 12.5% and rising",
          "Cash left: less than one month"
        ],
        "question": "How should Greece handle the Troika memorandum — and where should the budget be cut or protected?",
        "order": "ABC",
        "targets": {
          "health": {
            "lo": 16,
            "hi": 18,
            "why": "Procurement reform cuts waste while keeping minimum safety nets."
          },
          "pit": {
            "lo": 30,
            "hi": 38,
            "why": "Keep income tax steady; workers are already squeezed."
          },
          "subsidy": {
            "lo": 0,
            "hi": 1,
            "why": "Remove remaining clientelist subsidies."
          },
          "infra": {
            "lo": 2,
            "hi": 4,
            "why": "Protect EU co-financed investment, which brings matching funds."
          },
          "debtPay": {
            "lo": 100,
            "hi": 105,
            "why": "Full debt service is a condition of the bailout."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 0,
            "label": "Reject the Bailout & Seek Loans from Russia or China",
            "description": "Break off negotiations with Brussels and seek alternative financing abroad.",
            "rationale": "No one lent without collateral; the state came within 14 days of missing its payroll.",
            "effects": {
              "treasuryDelta": -450,
              "gdpGrowthDelta": -4.5,
              "debtToGdpDelta": 8,
              "approvalDelta": -10
            }
          },
          {
            "id": "B",
            "points": 10,
            "label": "Emergency Property Tax Added to Electricity Bills",
            "description": "Collect a new property levy through household electricity bills, cutting power for non-payment.",
            "rationale": "Raised cash quickly, but caused great hardship and fierce social protests.",
            "effects": {
              "treasuryDelta": 650,
              "gdpGrowthDelta": -3.8,
              "approvalDelta": -18
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Sign the Accord with Minimum Safety Nets & Business Deregulation",
            "description": "Accept emergency financing while cutting hospital procurement corruption and digitising business paperwork.",
            "rationale": "Secured emergency financing while eliminating waste rather than cutting blindly.",
            "effects": {
              "treasuryDelta": 920,
              "gdpGrowthDelta": -2.1,
              "complianceDelta": 0.06,
              "unemploymentDelta": 2.2,
              "approvalDelta": -5
            }
          }
        ]
      },
      {
        "round": 3,
        "yearLabel": "2011",
        "title": "Private Sector Debt Haircut (PSI)",
        "context": [
          "Despite austerity, the economy has shrunk by 15% and debt has risen to 170% of GDP — because GDP fell faster than the debt. Everyone now admits the debt cannot be repaid in full. Private banks and funds hold about €206 billion of Greek bonds.",
          "The proposed Private Sector Involvement (PSI) would force private creditors to accept a 53.5% cut in the face value of their bonds — the largest sovereign debt restructuring ever. Some hedge funds threaten lawsuits, and some politicians suggest paying in full by pledging ports and islands as collateral.",
          "At the same time, VAT evasion remains enormous because many shops and taxis accept only cash. Requiring card-payment (POS) terminals could transform tax collection — if the state can enforce it."
        ],
        "facts": [
          "Debt: 170% of GDP",
          "Private bond holdings: €206 billion",
          "Proposed haircut: 53.5%",
          "GDP since 2008: −15%"
        ],
        "question": "How should Greece restructure its debt — and how should the tax and spending mix support recovery after the haircut?",
        "order": "ABC",
        "targets": {
          "debtPay": {
            "lo": 100,
            "hi": 105,
            "why": "After the haircut, servicing the new bonds in full rebuilds trust."
          },
          "vat": {
            "lo": 22,
            "hi": 24,
            "why": "With POS terminals, a 23% VAT finally becomes collectable."
          },
          "cit": {
            "lo": 20,
            "hi": 26,
            "why": "Keep corporate tax competitive with Bulgaria and Cyprus."
          },
          "health": {
            "lo": 15,
            "hi": 18,
            "why": "Continue reforming spending without collapsing services."
          },
          "infra": {
            "lo": 2,
            "hi": 4,
            "why": "Maintain EU-funded investment projects."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 50,
            "label": "Negotiate the 53.5% Haircut & Mandate Electronic POS Terminals",
            "description": "Impose a 53.5% cut on private bondholders and require card payments in all shops and taxis.",
            "rationale": "Wiped out over €100 billion of debt and transformed VAT compliance.",
            "effects": {
              "treasuryDelta": 1200,
              "debtToGdpDelta": -32,
              "complianceDelta": 0.12,
              "gdpGrowthDelta": 1.2,
              "approvalDelta": 5
            }
          },
          {
            "id": "B",
            "points": 5,
            "label": "Refuse Restructuring & Pledge Ports and Islands as Collateral",
            "description": "Borrow more to repay hedge funds 100 cents on the euro, pledging national assets.",
            "rationale": "Entrenched an unpayable debt and guaranteed a deeper second crisis 18 months later.",
            "effects": {
              "treasuryDelta": -800,
              "debtToGdpDelta": 18,
              "gdpGrowthDelta": -3.2,
              "approvalDelta": -14
            }
          },
          {
            "id": "C",
            "points": 0,
            "label": "Confiscate 20% of Domestic Bank Deposits",
            "description": "Seize cash from household and business bank accounts to pay creditors (a ‘bail-in’).",
            "rationale": "Destroyed small firms’ working capital and triggered a wave of bankruptcies.",
            "effects": {
              "treasuryDelta": 850,
              "gdpGrowthDelta": -7,
              "unemploymentDelta": 5.5,
              "approvalDelta": -28
            }
          }
        ]
      },
      {
        "round": 4,
        "yearLabel": "2012",
        "title": "Bank Recapitalisation & Youth Unemployment",
        "context": [
          "The PSI haircut wiped out much of the capital of Greek banks, which held large amounts of government bonds. Banks have almost stopped lending; small businesses cannot get credit to pay suppliers or workers. Depositors have withdrawn tens of billions of euros out of fear.",
          "Unemployment reaches 25%, and youth unemployment passes 55%. Around 400,000 young, educated Greeks — doctors, engineers, programmers — emigrate to Germany, the UK and beyond: a devastating brain drain.",
          "Some ministers propose raising corporate tax to 42% on surviving firms to fill the budget gap. Others want to re-hire laid-off municipal clerks with short-term borrowing. Meanwhile, European funds are available for bank recapitalisation and youth training — if Greece can use them well."
        ],
        "facts": [
          "Unemployment: 25%",
          "Youth unemployment: 55%+",
          "Young emigrants: ~400,000",
          "Bank lending: frozen"
        ],
        "question": "How do you restart bank lending and stop the brain drain — and which tax and spending settings support jobs?",
        "order": "ABC",
        "targets": {
          "cit": {
            "lo": 20,
            "hi": 26,
            "why": "High CIT pushed tens of thousands of firms to register in Bulgaria and Cyprus."
          },
          "edu": {
            "lo": 4,
            "hi": 6,
            "why": "Youth vouchers and apprenticeships fight the brain drain."
          },
          "infra": {
            "lo": 3,
            "hi": 5,
            "why": "EU structural funds can finance job-rich projects."
          },
          "health": {
            "lo": 15,
            "hi": 18,
            "why": "Protect the social safety net at peak unemployment."
          },
          "subsidy": {
            "lo": 0,
            "hi": 1,
            "why": "Avoid subsidising inefficient state-linked firms."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 0,
            "label": "Raise Corporate Income Tax to 42% on Surviving Firms",
            "description": "Hike taxes on formal companies to plug the social-security deficit.",
            "rationale": "Laffer-curve disaster: companies moved their headquarters to Bulgaria and Cyprus.",
            "effects": {
              "treasuryDelta": -250,
              "complianceDelta": -0.09,
              "gdpGrowthDelta": -2.8,
              "unemploymentDelta": 1.8,
              "approvalDelta": -9
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Bank Recapitalisation & EU Youth Tech Vouchers",
            "description": "Recapitalise systemic banks with European stability funds and use EU regional funds for youth apprenticeships.",
            "rationale": "Restored lending to businesses and began to slow the brain drain.",
            "effects": {
              "treasuryDelta": 550,
              "gdpGrowthDelta": 1.8,
              "unemploymentDelta": -2.5,
              "humanCapitalDelta": 2.2,
              "approvalDelta": 6
            }
          },
          {
            "id": "C",
            "points": 10,
            "label": "Re-Hire Public Clerks with Emergency Short-Term Bills",
            "description": "Issue 9% short-term treasury bills to re-hire laid-off municipal staff.",
            "rationale": "Sank the budget balance and jeopardised the next bailout payment.",
            "effects": {
              "treasuryDelta": -650,
              "debtToGdpDelta": 6.5,
              "gdpGrowthDelta": 0.4,
              "approvalDelta": 3
            }
          }
        ]
      },
      {
        "round": 5,
        "yearLabel": "2013–2014",
        "title": "Primary Surplus & Return to Markets",
        "context": [
          "For the first time in a decade, Greece records a primary surplus — tax revenue exceeds spending before interest payments. Tourism is booming again, with record visitor numbers, and exports are recovering thanks to lower labour costs.",
          "Investors are cautiously interested. A successful five-year bond sale would end Greece’s four-year exile from markets. But elections are approaching, and there is strong pressure to spend the surplus on bonuses and handouts — the old clientelist habits that caused the crisis.",
          "Employers say high social-security contributions on wages are the main obstacle to hiring. Reducing them could boost employment — but only if overall fiscal discipline is maintained."
        ],
        "facts": [
          "Primary balance: positive (first in 10 years)",
          "Tourist arrivals: record",
          "Unemployment: ~26%",
          "Target: 5-year bond below 5%"
        ],
        "question": "How do you protect the hard-won surplus and return to markets — and which levers should be adjusted to support hiring?",
        "order": "ABC",
        "targets": {
          "pit": {
            "lo": 25,
            "hi": 32,
            "why": "Lower labour taxes stimulate private hiring."
          },
          "health": {
            "lo": 15,
            "hi": 17,
            "why": "Maintain discipline on social spending."
          },
          "infra": {
            "lo": 3,
            "hi": 5,
            "why": "Steady investment supports the recovery."
          },
          "debtPay": {
            "lo": 100,
            "hi": 110,
            "why": "Flawless debt service is essential for the market comeback."
          },
          "cit": {
            "lo": 20,
            "hi": 24,
            "why": "A competitive CIT attracts returning investors."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 50,
            "label": "Lock in the Surplus, Cut Labour Taxes & Issue a 5-Year Bond",
            "description": "Keep fiscal discipline, reduce employer social-security contributions and test the bond market.",
            "rationale": "Sold €3 billion of 5-year bonds at 4.75%, ending Greece’s market exile.",
            "effects": {
              "treasuryDelta": 680,
              "gdpGrowthDelta": 2.6,
              "debtToGdpDelta": -8,
              "unemploymentDelta": -2.2,
              "approvalDelta": 8
            }
          },
          {
            "id": "B",
            "points": 10,
            "label": "Spend the Surplus on Pre-Election Bonuses",
            "description": "Distribute the entire primary surplus as civil-service bonuses and subsidies.",
            "rationale": "Revived market fears that Greece was returning to its old habits.",
            "effects": {
              "treasuryDelta": -550,
              "gdpGrowthDelta": 1.2,
              "debtToGdpDelta": 4,
              "approvalDelta": 6
            }
          },
          {
            "id": "C",
            "points": 0,
            "label": "Default on Official Loans & Demand Debt Cancellation",
            "description": "Stop servicing European Stability Mechanism and IMF loans.",
            "rationale": "The ECB threatened to cut off bank liquidity and Grexit panic returned.",
            "effects": {
              "treasuryDelta": -950,
              "gdpGrowthDelta": -5.2,
              "unemploymentDelta": 3.5,
              "approvalDelta": -15
            }
          }
        ]
      }
    ],
    "historicalOutcome": {
      "summary": "Greece suffered a 26% GDP contraction and 27% unemployment, but the 2012 debt haircut and electronic tax enforcement eventually delivered sustainable primary surpluses and a return to bond markets.",
      "gdpGrowth": 0.7,
      "debtToGdp": 177,
      "inflation": -0.9,
      "unemployment": 25.8
    }
  },
  {
    "id": "germany_1948",
    "codeNumber": "04",
    "name": "West Germany",
    "era": "1948–1953",
    "subtitle": "The Wirtschaftswunder",
    "neighbors": "France, the Netherlands and Switzerland",
    "monetaryLocked": false,
    "briefing": "Ruined cities, 10 million refugees and a worthless Reichsmark. Rebuild industry, restore trust in money and spark export growth — without hyperinflation.",
    "trendGrowth": 6,
    "trendInflation": 3,
    "bondYield": 5,
    "initialStats": {
      "round": 1,
      "gdp": 8500,
      "gdpGrowth": 3,
      "unemployment": 11,
      "inflation": 6,
      "debtToGdp": 22,
      "treasury": 800,
      "approval": 55,
      "humanCapital": 4.2,
      "compliance": 0.88,
      "riskPremium": 0
    },
    "startSliders": {
      "cit": 45,
      "pit": 50,
      "vat": 10,
      "rate": 3,
      "debtPay": 100,
      "infra": 3,
      "edu": 2,
      "health": 6,
      "subsidy": 3
    },
    "rounds": [
      {
        "round": 1,
        "yearLabel": "1948",
        "title": "Currency Reform & Erhard’s Gamble",
        "context": [
          "Three years after the war, West Germany’s cities lie in ruins. The Reichsmark is worthless: workers are paid in money that buys nothing, so they barter or trade on the black market, where American cigarettes serve as currency. Allied price controls keep official prices low — and shop shelves completely empty.",
          "On 20 June 1948 the new Deutsche Mark replaces the Reichsmark. Ludwig Erhard, director of economic administration, wants to go further: abolish price controls and rationing overnight so that prices can signal what is scarce and what should be produced. Allied officials and many Germans fear chaos and soaring prices.",
          "Wartime income and corporate taxes remain extremely high — up to 95% at the top — killing any incentive to work officially. The new central bank must decide how much money to create: too much would destroy trust in the new currency; too little would strangle the recovery."
        ],
        "facts": [
          "Black-market currency: cigarettes",
          "Top wartime tax rate: 95%",
          "Industrial output: ~50% of 1936",
          "Unemployment: 11%"
        ],
        "question": "How should Germany launch its new economy — and which tax and monetary settings will make the Deutsche Mark trusted?",
        "order": "ABC",
        "targets": {
          "cit": {
            "lo": 25,
            "hi": 35,
            "why": "Erhard’s 1948 tax cuts restored the incentive to produce officially."
          },
          "pit": {
            "lo": 25,
            "hi": 35,
            "why": "Lower income tax brought workers back from the black market."
          },
          "rate": {
            "lo": 5,
            "hi": 9,
            "why": "The Bank deutscher Länder kept money tight to protect the new currency."
          },
          "subsidy": {
            "lo": 0,
            "hi": 2,
            "why": "No price subsidies — let prices find their level."
          },
          "debtPay": {
            "lo": 100,
            "hi": 110,
            "why": "Honouring obligations supports trust in the new currency."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 50,
            "label": "Abolish Price Controls & Enforce Central Bank Discipline",
            "description": "Free prices so markets can signal scarcity, while the central bank strictly limits the money supply.",
            "rationale": "Shop windows filled overnight, black markets vanished and output surged.",
            "effects": {
              "treasuryDelta": 160,
              "gdpGrowthDelta": 5.2,
              "inflationDelta": -2.5,
              "unemploymentDelta": -1.8,
              "complianceDelta": 0.08,
              "approvalDelta": 8
            }
          },
          {
            "id": "B",
            "points": 10,
            "label": "Keep Wartime Price Ceilings & Ration Coupons",
            "description": "Maintain strict price controls and punish merchants who charge market prices.",
            "rationale": "Prolonged shortages and kept goods hoarded in barter networks.",
            "effects": {
              "treasuryDelta": -90,
              "gdpGrowthDelta": -2.4,
              "inflationDelta": 3.5,
              "unemploymentDelta": 1.5,
              "approvalDelta": -7
            }
          },
          {
            "id": "C",
            "points": 0,
            "label": "Print New Marks Generously to Compensate Savers",
            "description": "Exchange Reichsmark savings 1:1 into new Deutsche Marks.",
            "rationale": "Sparked fears of renewed hyperinflation and destroyed confidence in the new currency.",
            "effects": {
              "treasuryDelta": -250,
              "inflationDelta": 12,
              "gdpGrowthDelta": -1.2,
              "approvalDelta": -11
            }
          }
        ]
      },
      {
        "round": 2,
        "yearLabel": "1949",
        "title": "Marshall Plan Funds & The KfW",
        "context": [
          "American Marshall Plan aid begins to arrive — about $1.4 billion for West Germany. Importers pay for US goods in Deutsche Marks, which accumulate in ‘counterpart funds’ that the new Federal Republic can use.",
          "The main obstacles to growth are physical bottlenecks: coal mines lack equipment, power stations are damaged, railway bridges are destroyed. Thousands of small and medium firms (the Mittelstand) have orders but cannot buy machinery.",
          "One idea is to create a development bank — the Kreditanstalt für Wiederaufbau (KfW) — that lends the funds to firms and re-lends them as they are repaid, multiplying their impact for decades. Others want to hand the money directly to households, or use it to nationalise the Ruhr’s heavy industry."
        ],
        "facts": [
          "Marshall aid: ~$1.4 billion",
          "Key bottlenecks: coal, power, rail",
          "Mittelstand firms waiting for credit: thousands",
          "Unemployment: ~10%"
        ],
        "question": "How should Germany deploy the Marshall Plan money — and how should the budget be split between infrastructure and other priorities?",
        "order": "ABC",
        "targets": {
          "infra": {
            "lo": 5,
            "hi": 8,
            "why": "Coal, power and rail bottlenecks were the binding constraint."
          },
          "subsidy": {
            "lo": 1,
            "hi": 3,
            "why": "Revolving KfW loans — not grants — to the Mittelstand."
          },
          "rate": {
            "lo": 4,
            "hi": 7,
            "why": "Moderate rates support investment while protecting the currency."
          },
          "health": {
            "lo": 5,
            "hi": 7,
            "why": "Basic social support without crowding out reconstruction."
          },
          "edu": {
            "lo": 2,
            "hi": 4,
            "why": "Rebuild schools and vocational training."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 15,
            "label": "Hand Out Marshall Aid as Consumer Cash Bonuses",
            "description": "Distribute all aid as one-off household grants.",
            "rationale": "Made people happy briefly, but left power plants and mines crippled once the aid ended.",
            "effects": {
              "treasuryDelta": -140,
              "gdpGrowthDelta": 0.8,
              "unemploymentDelta": -0.4,
              "approvalDelta": 5
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Create the KfW as a Revolving Industrial Loan Fund",
            "description": "Channel Marshall funds through KfW into coal, electricity, rail and Mittelstand machinery.",
            "rationale": "Created a multi-decade capital multiplier: repaid loans were lent again to expanding firms.",
            "effects": {
              "treasuryDelta": 240,
              "gdpGrowthDelta": 4.4,
              "unemploymentDelta": -2.2,
              "humanCapitalDelta": 2.8,
              "approvalDelta": 7
            }
          },
          {
            "id": "C",
            "points": 5,
            "label": "Nationalise Ruhr Heavy Industry Instead of Rebuilding the Grid",
            "description": "Use the funds to buy out private coal and steel shareholders.",
            "rationale": "Spent scarce capital on ownership changes while transport links stayed broken.",
            "effects": {
              "treasuryDelta": -320,
              "gdpGrowthDelta": -1.9,
              "unemploymentDelta": 1,
              "approvalDelta": -6
            }
          }
        ]
      },
      {
        "round": 3,
        "yearLabel": "1950",
        "title": "Integrating 10 Million Refugees",
        "context": [
          "Around 10 million ethnic Germans expelled from Eastern Europe have arrived in West Germany, increasing the population by almost 20%. Many live in camps or in rooms requisitioned from bombed-out families. Unemployment among refugees is double the national average.",
          "Yet many refugees are skilled craftsmen, farmers and engineers. If they can be housed near the factories that need workers, they could become an engine of growth. If not, they could become a permanent underclass and a source of political radicalism.",
          "A ‘Burden Sharing’ proposal (Lastenausgleich) would levy a 50% charge on the value of undamaged property, paid over 30 years, to finance housing and business loans for those who lost everything. Others propose paying refugees to emigrate to the Americas or settling them in rural areas."
        ],
        "facts": [
          "Refugees: ~10 million",
          "Population increase: ~20%",
          "Housing shortage: ~5 million dwellings",
          "Refugee unemployment: 2× average"
        ],
        "question": "How should Germany integrate the refugees — and how should social, housing and tax policy be set?",
        "order": "ABC",
        "targets": {
          "health": {
            "lo": 6,
            "hi": 9,
            "why": "Burden sharing and social housing support required higher social spending."
          },
          "infra": {
            "lo": 5,
            "hi": 8,
            "why": "A housing construction boom put refugees near the jobs."
          },
          "pit": {
            "lo": 25,
            "hi": 35,
            "why": "Keep income tax moderate so that work pays."
          },
          "edu": {
            "lo": 3,
            "hi": 5,
            "why": "Retraining helped refugees enter industry."
          },
          "rate": {
            "lo": 4,
            "hi": 6,
            "why": "Moderate rates support housing construction."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 10,
            "label": "Subsidise Mass Emigration of Refugees to the Americas",
            "description": "Pay travel costs for young refugees to emigrate and reduce unemployment.",
            "rationale": "Lost millions of skilled workers just as industry needed them.",
            "effects": {
              "treasuryDelta": -110,
              "gdpGrowthDelta": -1.5,
              "unemploymentDelta": -1.8,
              "humanCapitalDelta": -3,
              "approvalDelta": -4
            }
          },
          {
            "id": "B",
            "points": 5,
            "label": "Confine Refugees to Rural Agricultural Settlements",
            "description": "Ban refugees from moving to industrial cities and require farming self-sufficiency.",
            "rationale": "Created rural poverty while factories suffered acute worker shortages.",
            "effects": {
              "treasuryDelta": -180,
              "gdpGrowthDelta": -0.8,
              "unemploymentDelta": 2.1,
              "approvalDelta": -8
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Burden Sharing Act & Social Housing Tax Credits",
            "description": "Levy 50% on undamaged property over 30 years to finance refugee housing and small-business loans.",
            "rationale": "Integrated 10 million people into the workforce and fuelled a huge housing boom.",
            "effects": {
              "treasuryDelta": 180,
              "gdpGrowthDelta": 4.8,
              "unemploymentDelta": -3,
              "humanCapitalDelta": 3.2,
              "approvalDelta": 8
            }
          }
        ]
      },
      {
        "round": 4,
        "yearLabel": "1951",
        "title": "The Korea Boom & Raw Material Shock",
        "context": [
          "The Korean War triggers a global rush for machinery, vehicles and steel. Orders for German machine tools pour in from around the world. But the prices of imported raw materials — coal, copper, rubber, cotton — soar, and Germany briefly runs out of foreign currency to pay for them.",
          "Inflation rises, and some politicians want to ban exports so that German customers get goods first, or have the central bank print money to subsidise expensive raw-material imports.",
          "Erhard argues the opposite: let firms export and reinvest their profits by allowing them to write off investment in new machinery quickly against taxes, and train a new generation of skilled workers through the dual apprenticeship system."
        ],
        "facts": [
          "Export orders: surging",
          "Raw material prices: +50–100%",
          "Foreign currency reserves: depleted",
          "Inflation: rising"
        ],
        "question": "How should Germany ride the Korea boom — and how should taxes, interest rates and training be set?",
        "order": "ABC",
        "targets": {
          "cit": {
            "lo": 20,
            "hi": 30,
            "why": "Accelerated depreciation kept the effective tax on reinvestment low."
          },
          "edu": {
            "lo": 3,
            "hi": 5,
            "why": "The dual apprenticeship system built the skilled workforce."
          },
          "rate": {
            "lo": 5,
            "hi": 7,
            "why": "Lean against imported inflation without killing the boom."
          },
          "subsidy": {
            "lo": 0,
            "hi": 1,
            "why": "No subsidies for raw-material imports — they fuel inflation."
          },
          "vat": {
            "lo": 8,
            "hi": 12,
            "why": "A stable consumption tax avoids adding to price pressures."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 5,
            "label": "Ban Exports to Satisfy Domestic Demand First",
            "description": "Prohibit machine-tool exports to push domestic prices down.",
            "rationale": "Missed the greatest post-war trade boom and alienated trading partners.",
            "effects": {
              "treasuryDelta": -150,
              "gdpGrowthDelta": -2.8,
              "unemploymentDelta": 1.8,
              "approvalDelta": -6
            }
          },
          {
            "id": "B",
            "points": 50,
            "label": "Accelerated Depreciation & Dual Apprenticeships",
            "description": "Let firms write off 100% of reinvested equipment against taxes, combined with vocational training.",
            "rationale": "Turned Germany into Europe’s precision-machinery workshop and a structural trade surplus.",
            "effects": {
              "treasuryDelta": 220,
              "gdpGrowthDelta": 5.6,
              "unemploymentDelta": -2.8,
              "humanCapitalDelta": 3.5,
              "approvalDelta": 7.5
            }
          },
          {
            "id": "C",
            "points": 10,
            "label": "Print Money to Subsidise Raw Material Imports",
            "description": "Give firms state cash to cover high coal and copper prices.",
            "rationale": "Fuelled inflation and weakened the Deutsche Mark.",
            "effects": {
              "treasuryDelta": -260,
              "inflationDelta": 5.2,
              "gdpGrowthDelta": 0.6,
              "approvalDelta": -5
            }
          }
        ]
      },
      {
        "round": 5,
        "yearLabel": "1952–1953",
        "title": "The London Debt Agreement & Codetermination",
        "context": [
          "Foreign creditors demand repayment of Germany’s pre-war and post-war debts — about DM 30 billion. Paying in full would drain the foreign currency the economy needs to import raw materials.",
          "Negotiations in London offer a remarkable deal: about 50% of the debt would be forgiven, and repayments would be capped at a share of export earnings — so Germany pays only as much as its trade surplus allows.",
          "At home, trade unions demand a voice in company decisions. A ‘codetermination’ law would give workers seats on the supervisory boards of large firms. Employers fear losing control; unions threaten strikes in the Ruhr if refused."
        ],
        "facts": [
          "Debt claimed: ~DM 30 billion",
          "Proposed relief: ~50%",
          "Repayment cap: ~3% of exports",
          "Ruhr strike threat: high"
        ],
        "question": "How should Germany settle its foreign debts and labour relations — and how should the budget support long-term stability?",
        "order": "ABC",
        "targets": {
          "debtPay": {
            "lo": 100,
            "hi": 115,
            "why": "Honouring the restructured debt restored Germany’s credit standing."
          },
          "cit": {
            "lo": 25,
            "hi": 32,
            "why": "Competitive taxes sustain investment."
          },
          "health": {
            "lo": 6,
            "hi": 9,
            "why": "Social partnership requires a reliable welfare state."
          },
          "infra": {
            "lo": 4,
            "hi": 6,
            "why": "Steady infrastructure investment."
          },
          "rate": {
            "lo": 4,
            "hi": 6,
            "why": "Stable money supports the export model."
          }
        },
        "options": [
          {
            "id": "A",
            "points": 0,
            "label": "Repudiate All Pre-1945 Debts & Walk Out of London",
            "description": "Refuse to recognise old debts or pay anything to foreign bondholders.",
            "rationale": "Creditor nations seized German ships in foreign ports and blocked trade credit.",
            "effects": {
              "treasuryDelta": -190,
              "gdpGrowthDelta": -4.2,
              "unemploymentDelta": 3,
              "approvalDelta": -12
            }
          },
          {
            "id": "B",
            "points": 5,
            "label": "Ban Trade Unions & Impose State Wage Decrees",
            "description": "Outlaw collective bargaining and suppress codetermination by decree.",
            "rationale": "Triggered a general strike across the Ruhr industrial heartland.",
            "effects": {
              "treasuryDelta": -280,
              "gdpGrowthDelta": -3.6,
              "unemploymentDelta": 2.2,
              "approvalDelta": -18
            }
          },
          {
            "id": "C",
            "points": 50,
            "label": "Sign the London Debt Agreement & Introduce Codetermination",
            "description": "Halve external debt with repayments capped at 3% of export earnings; give workers seats on company boards.",
            "rationale": "Restored Germany’s credit, cemented decades of industrial peace and secured full employment.",
            "effects": {
              "treasuryDelta": 310,
              "gdpGrowthDelta": 4.8,
              "debtToGdpDelta": -12,
              "inflationDelta": -1.8,
              "unemploymentDelta": -2.4,
              "approvalDelta": 9
            }
          }
        ]
      }
    ],
    "historicalOutcome": {
      "summary": "Industrial output tripled, unemployment fell to about 3%, and West Germany became Europe’s leading export economy.",
      "gdpGrowth": 8.5,
      "debtToGdp": 16,
      "inflation": 1.8,
      "unemployment": 3.2
    }
  }
];

  if (typeof window !== 'undefined') {
    window.FP_CASES = casesData;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.FP_CASES = casesData;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = casesData;
  }
})();
