import React, { useState, useEffect, useMemo } from 'react';
import {
  Landmark,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Scale,
  Users,
  Award,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Percent,
  Activity,
  Layers,
  Sparkles,
  Info,
  Building,
  GraduationCap,
  HeartPulse,
  Factory,
  Copy,
  UserCheck,
  Play
} from 'lucide-react';
import { CountryCase, MacroIndicators, BudgetAllocation, ClassroomPlayer, RoomState, HistoricalShock } from './types';
import { COUNTRY_CASES } from './data/cases';
import { calculateBudgetPreview, simulateFiscalRound, calculateMasteryScore } from './engine/macroEngine';
import { syncBus, MultiplayerSync, SyncMessage } from './multiplayer/sync';

type ViewMode = 'LOBBY' | 'DASHBOARD' | 'SHOCK_MODAL' | 'ROUND_FEEDBACK' | 'FINAL_DEBRIEF';

export default function App() {
  // Navigation & Lobby State
  const [viewMode, setViewMode] = useState<ViewMode>('LOBBY');
  const [isHost, setIsHost] = useState<boolean>(true);
  const [roomCode, setRoomCode] = useState<string>('482-910');
  const [playerName, setPlayerName] = useState<string>('Prof. Sterling');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('singapore_1965');
  const [connectedPlayers, setConnectedPlayers] = useState<Record<string, ClassroomPlayer>>({});

  // Active Simulation State
  const selectedCase: CountryCase = useMemo(
    () => COUNTRY_CASES.find((c) => c.id === selectedCaseId) || COUNTRY_CASES[0],
    [selectedCaseId]
  );

  const [currentStats, setCurrentStats] = useState<MacroIndicators>(selectedCase.initialStats);
  const [history, setHistory] = useState<MacroIndicators[]>([selectedCase.initialStats]);
  const [allocations, setAllocations] = useState<BudgetAllocation>(selectedCase.defaultAllocations);
  const [selectedShockId, setSelectedShockId] = useState<'A' | 'B' | 'C'>('A');
  const [lastRoundExplanations, setLastRoundExplanations] = useState<string[]>([]);
  const [playerId] = useState<string>(() => 'player_' + Math.random().toString(36).substring(2, 8));

  // Multi-Tab & Real-Time Sync Subscription
  useEffect(() => {
    syncBus.subscribe(roomCode, (msg: SyncMessage) => {
      if (msg.roomCode && msg.roomCode !== roomCode) return;

      if (msg.type === 'PLAYER_JOINED' || msg.type === 'PLAYER_UPDATED') {
        setConnectedPlayers((prev) => {
          const updated = { ...prev, [msg.player.id]: msg.player };
          return updated;
        });
      } else if (msg.type === 'GAME_STARTED') {
        setSelectedCaseId(msg.caseId);
        const targetCase = COUNTRY_CASES.find((c) => c.id === msg.caseId) || COUNTRY_CASES[0];
        initSimulation(targetCase, false);
      } else if (msg.type === 'ROOM_STATE_SYNC') {
        setConnectedPlayers(msg.roomState.players);
      }
    });
  }, [roomCode]);

  // Initialize or Reset Game State
  const initSimulation = (cCase: CountryCase, broadcastStart = true) => {
    setCurrentStats(cCase.initialStats);
    setHistory([cCase.initialStats]);
    setAllocations({ ...cCase.defaultAllocations });
    setSelectedShockId('A');
    setLastRoundExplanations([]);

    const initialPlayer: ClassroomPlayer = {
      id: playerId,
      name: playerName || (isHost ? 'Professor' : 'Student Player'),
      roomCode,
      isHost,
      isAi: false,
      round: 1,
      treasury: cCase.initialStats.treasury,
      capitalDeltaPct: 0,
      gdp: cCase.initialStats.gdp,
      gdpGrowth: cCase.initialStats.gdpGrowth,
      debtToGdp: cCase.initialStats.debtToGdp,
      fiscalStatus: cCase.initialStats.budgetBalance >= 0 ? 'SURPLUS' : 'DEFICIT',
      score: 70,
      lastActive: Date.now(),
    };

    setConnectedPlayers((prev) => ({
      ...prev,
      [playerId]: initialPlayer,
    }));

    if (broadcastStart) {
      syncBus.broadcast({
        type: 'GAME_STARTED',
        roomCode,
        caseId: cCase.id,
      });
      syncBus.broadcast({
        type: 'PLAYER_UPDATED',
        roomCode,
        player: initialPlayer,
      });
    }

    setViewMode('DASHBOARD');
  };

  // Pre-flight Real-Time Budget Calculations
  const preview = useMemo(() => {
    return calculateBudgetPreview(currentStats, allocations);
  }, [currentStats, allocations]);

  // Current Historical Shock Event Object
  const currentRoundIndex = Math.min(currentStats.round - 1, selectedCase.rounds.length - 1);
  const currentShock: HistoricalShock = selectedCase.rounds[currentRoundIndex];

  // Execute Round Resolution
  const handleConfirmShockDecision = () => {
    const chosenOption = currentShock.options.find((o) => o.id === selectedShockId) || currentShock.options[0];
    const resolution = simulateFiscalRound(currentStats, allocations, chosenOption);

    const nextState = resolution.nextState;
    setCurrentStats(nextState);
    setHistory((prev) => [...prev, nextState]);
    setLastRoundExplanations(resolution.explanations);

    // Update Player & AI States in Live Cohort
    const myUpdatedPlayer: ClassroomPlayer = {
      id: playerId,
      name: playerName || 'Student Player',
      roomCode,
      isHost,
      isAi: false,
      round: nextState.round,
      treasury: nextState.treasury,
      capitalDeltaPct: resolution.capitalDeltaPct,
      gdp: nextState.gdp,
      gdpGrowth: nextState.gdpGrowth,
      debtToGdp: nextState.debtToGdp,
      fiscalStatus: resolution.fiscalStatus,
      score: resolution.score,
      lastActive: Date.now(),
    };

    setConnectedPlayers((prev) => {
      const updated = { ...prev, [playerId]: myUpdatedPlayer };

      // Progress any AI classmates with diverse macro archetypes
      Object.keys(updated).forEach((key) => {
        const p = updated[key];
        if (p.isAi) {
          const aiGrowth = p.id === 'ai_2' ? 3.4 : p.id === 'ai_1' ? 4.1 : 2.0;
          const aiDebt = p.id === 'ai_2' ? -1.5 : p.id === 'ai_1' ? 3.2 : 6.0;
          const aiCapDelta = p.id === 'ai_2' ? 45 : p.id === 'ai_1' ? -20 : -80;
          const nextTreasury = Number((p.treasury + aiCapDelta).toFixed(1));
          updated[key] = {
            ...p,
            round: nextState.round,
            treasury: nextTreasury,
            capitalDeltaPct: Number(((aiCapDelta / p.treasury) * 100).toFixed(1)),
            gdp: Number((p.gdp * (1 + aiGrowth / 100)).toFixed(1)),
            gdpGrowth: aiGrowth,
            debtToGdp: Math.max(10, p.debtToGdp + aiDebt),
            fiscalStatus: aiCapDelta >= 0 ? 'SURPLUS' : 'DEFICIT',
            score: Math.round(p.score + (p.id === 'ai_2' ? 4 : p.id === 'ai_1' ? 2 : -3)),
          };
        }
      });

      return updated;
    });

    syncBus.broadcast({
      type: 'PLAYER_UPDATED',
      roomCode,
      player: myUpdatedPlayer,
    });

    setViewMode('ROUND_FEEDBACK');
  };

  const handleNextRoundOrFinish = () => {
    if (currentStats.round > 5) {
      setViewMode('FINAL_DEBRIEF');
    } else {
      setSelectedShockId('A');
      setViewMode('DASHBOARD');
    }
  };

  // Add 3 Demo AI Classmates
  const handleAddAiClassmates = () => {
    const aiPeers = MultiplayerSync.createAiClassmates(
      roomCode,
      selectedCase.initialStats.treasury,
      selectedCase.initialStats.gdp
    );
    setConnectedPlayers((prev) => {
      const updated = { ...prev };
      aiPeers.forEach((p) => {
        updated[p.id] = p;
      });
      return updated;
    });
  };

  // Sorted Cohort Leaderboard
  const sortedPlayers = useMemo(() => {
    const list = Object.values(connectedPlayers);
    return list.sort((a, b) => b.score - a.score || b.treasury - a.treasury);
  }, [connectedPlayers]);

  // Overall Mastery Report
  const finalMasteryReport = useMemo(() => {
    return calculateMasteryScore(currentStats);
  }, [currentStats]);

  // ============================================================================
  // RENDER: 1. CLASSROOM LOBBY
  // ============================================================================
  if (viewMode === 'LOBBY') {
    return (
      <div className="min-h-screen bg-[#F7F4EB] text-[#1E1E1E] font-sans p-4 md:p-8 antialiased selection:bg-[#E9C46A]">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Masthead Banner */}
          <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-6 shadow-brutal flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-block bg-[#E04F3E] text-white px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest uppercase mb-2">
                University Public Finance & Macroeconomics Lab
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E1E1E]">
                Fiscal Pulse: <span className="text-[#2A9D8F]">National Budget Simulator</span>
              </h1>
              <p className="text-xs md:text-sm text-[#264653] font-mono mt-1">
                Real-Time Multiplayer State Budget Management across 5 Fiscal Years.
              </p>
            </div>

            {/* Room Code & Player ID Card */}
            <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-4 w-full md:w-80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider font-bold">
                <span>Classroom Room Code</span>
                <span className="text-[#2A9D8F] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse" />
                  Live Sync
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-32 bg-white border border-[#1E1E1E] px-2.5 py-1.5 font-mono text-base font-bold tracking-widest text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
                  placeholder="000-000"
                />
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 bg-white border border-[#1E1E1E] px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
                  placeholder="Your Full Name"
                />
              </div>

              {/* Host vs Student Toggle */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setIsHost(true)}
                  className={`py-1.5 border border-[#1E1E1E] uppercase transition ${
                    isHost ? 'bg-[#1E1E1E] text-white' : 'bg-white text-[#1E1E1E] hover:bg-slate-100'
                  }`}
                >
                  Professor (Host)
                </button>
                <button
                  type="button"
                  onClick={() => setIsHost(false)}
                  className={`py-1.5 border border-[#1E1E1E] uppercase transition ${
                    !isHost ? 'bg-[#1E1E1E] text-white' : 'bg-white text-[#1E1E1E] hover:bg-slate-100'
                  }`}
                >
                  Student Player
                </button>
              </div>
            </div>
          </div>

          {/* Case Study Selection Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2A9D8F]" /> Select Historical Country Case Study (5 Rounds)
              </h2>
              <span className="text-xs font-mono text-[#264653]">Deterministic Macro Engine • Zero Randomness</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COUNTRY_CASES.map((c) => {
                const isSelected = c.id === selectedCaseId;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`cursor-pointer border border-[#1E1E1E] bg-[#FFFFFF] p-5 transition-all ${
                      isSelected
                        ? 'ring-2 ring-[#1E1E1E] shadow-brutal bg-[#FFFFFF]'
                        : 'hover:bg-[#FAF8F2] opacity-90'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#E04F3E] uppercase tracking-wider">
                          CASE {c.codeNumber} • {c.era}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#1E1E1E] uppercase mt-0.5">
                          {c.name}: <span className="font-serif italic font-normal">{c.subtitle}</span>
                        </h3>
                      </div>
                      <span className="border border-[#1E1E1E] bg-[#F7F4EB] text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
                        {c.currencySymbol}
                      </span>
                    </div>

                    <p className="text-xs text-[#264653] mt-2.5 leading-relaxed font-sans">{c.briefing}</p>

                    {/* Starting Baseline Specs */}
                    <div className="grid grid-cols-5 gap-1 mt-4 pt-3 border-t border-[#1E1E1E] text-center font-mono text-[11px]">
                      <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-1.5">
                        <div className="text-[9px] uppercase text-[#264653]">Capital</div>
                        <div className="font-bold text-[#2A9D8F]">${c.initialStats.treasury}M</div>
                      </div>
                      <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-1.5">
                        <div className="text-[9px] uppercase text-[#264653]">GDP</div>
                        <div className="font-bold text-[#1E1E1E]">${c.initialStats.gdp}M</div>
                      </div>
                      <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-1.5">
                        <div className="text-[9px] uppercase text-[#264653]">Debt/GDP</div>
                        <div className="font-bold text-[#E04F3E]">{c.initialStats.debtToGdp}%</div>
                      </div>
                      <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-1.5">
                        <div className="text-[9px] uppercase text-[#264653]">Inflation</div>
                        <div className="font-bold text-[#1E1E1E]">{c.initialStats.inflation}%</div>
                      </div>
                      <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-1.5">
                        <div className="text-[9px] uppercase text-[#264653]">Unemployment</div>
                        <div className="font-bold text-[#264653]">{c.initialStats.unemployment}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Classroom Cohort Grid & Actions */}
          <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-5 shadow-brutal space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E1E1E] pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#264653]" /> Connected Classroom Roster (Room #{roomCode})
                </h3>
                <p className="text-xs font-mono text-[#264653] mt-0.5">
                  Open another browser tab with room code <strong className="text-[#1E1E1E]">{roomCode}</strong> to test multi-student sync!
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddAiClassmates}
                  className="px-3 py-1.5 border border-[#1E1E1E] bg-[#E9C46A] hover:bg-[#dfb958] text-xs font-mono font-bold uppercase transition"
                >
                  + Add 3 Demo Classmates
                </button>
                <button
                  type="button"
                  onClick={() => initSimulation(selectedCase, true)}
                  className="px-6 py-2 border border-[#1E1E1E] bg-[#1E1E1E] hover:bg-[#264653] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-brutal transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Start Fiscal Simulation
                </button>
              </div>
            </div>

            {/* Roster Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1E1E1E]">{playerName || 'You'}</div>
                  <div className="text-[10px] text-[#2A9D8F]">● Ready ({isHost ? 'Host' : 'Student'})</div>
                </div>
                <UserCheck className="w-4 h-4 text-[#2A9D8F]" />
              </div>

              {Object.values(connectedPlayers)
                .filter((p) => p.id !== playerId)
                .map((p) => (
                  <div key={p.id} className="border border-[#1E1E1E] bg-[#FFFFFF] p-2 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1E1E1E]">{p.name}</div>
                      <div className="text-[10px] text-[#264653]">● {p.isAi ? 'Simulated Peer' : 'Connected Tab'}</div>
                    </div>
                    <span className="text-[10px] border border-[#1E1E1E] px-1 bg-[#F7F4EB]">RD {p.round}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: 2. FINAL ASSESSMENT & HISTORICAL DEBRIEF (AFTER ROUND 5)
  // ============================================================================
  if (viewMode === 'FINAL_DEBRIEF') {
    const hist = selectedCase.historicalOutcome;
    const initialCap = selectedCase.initialStats.treasury;
    const finalCap = currentStats.treasury;
    const totalGrowthPct = (((finalCap - initialCap) / initialCap) * 100).toFixed(1);

    // Prepare Dual-Line SVG Data for Capital: Student vs Historical
    const studentPoints = history.map((h) => h.treasury);
    const histPoints = hist.historicalCapitalTrajectory;
    const maxVal = Math.max(...studentPoints, ...histPoints) * 1.15;
    const minVal = Math.min(0, ...studentPoints, ...histPoints);
    const range = maxVal - minVal || 1;

    const svgWidth = 600;
    const svgHeight = 220;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const chartW = svgWidth - margin.left - margin.right;
    const chartH = svgHeight - margin.top - margin.bottom;

    const studentCoords = studentPoints.map((val, idx) => {
      const x = margin.left + (idx / 5) * chartW;
      const y = margin.top + chartH - ((val - minVal) / range) * chartH;
      return `${x},${y}`;
    }).join(' ');

    const histCoords = histPoints.map((val, idx) => {
      const x = margin.left + (idx / 5) * chartW;
      const y = margin.top + chartH - ((val - minVal) / range) * chartH;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="min-h-screen bg-[#F7F4EB] text-[#1E1E1E] font-sans p-4 md:p-8 antialiased">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Banner */}
          <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-6 shadow-brutal flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-block bg-[#E04F3E] text-white px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                Post-Game Debrief • Fiscal Round 5 Complete
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-[#1E1E1E]">
                {selectedCase.name} ({selectedCase.era}) — Final Macro Assessment
              </h1>
              <p className="text-xs md:text-sm text-[#264653] font-mono mt-1 max-w-2xl">
                {hist.summary}
              </p>
            </div>

            {/* Final Grade Card */}
            <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-4 text-center shrink-0 w-full md:w-56">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#264653]">Overall Mastery Score</div>
              <div className="text-4xl font-mono font-extrabold text-[#1E1E1E]">
                {finalMasteryReport.overallScore} <span className="text-sm font-normal text-[#264653]">/ 100</span>
              </div>
              <div className="mt-1 inline-block border border-[#1E1E1E] px-2 py-0.5 text-xs font-mono font-bold bg-[#E9C46A]">
                GRADE {finalMasteryReport.letterGrade}
              </div>
            </div>
          </div>

          {/* 4 Pillars Mastery Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4">
              <div className="text-[10px] font-mono uppercase text-[#264653]">1. Fiscal Discipline</div>
              <div className="text-2xl font-mono font-bold text-[#1E1E1E] mt-1">
                {finalMasteryReport.fiscalDisciplineScore} <span className="text-xs text-[#264653]">/ 25</span>
              </div>
              <div className="w-full bg-[#F7F4EB] h-1.5 border border-[#1E1E1E] mt-2">
                <div
                  className="bg-[#2A9D8F] h-full"
                  style={{ width: `${(finalMasteryReport.fiscalDisciplineScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#264653] mt-2">Structural budget balance control</p>
            </div>

            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4">
              <div className="text-[10px] font-mono uppercase text-[#264653]">2. Capital Growth</div>
              <div className="text-2xl font-mono font-bold text-[#2A9D8F] mt-1">
                {finalMasteryReport.capitalGrowthScore} <span className="text-xs text-[#264653]">/ 25</span>
              </div>
              <div className="w-full bg-[#F7F4EB] h-1.5 border border-[#1E1E1E] mt-2">
                <div
                  className="bg-[#2A9D8F] h-full"
                  style={{ width: `${(finalMasteryReport.capitalGrowthScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#264653] mt-2">Net change in sovereign treasury reserves</p>
            </div>

            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4">
              <div className="text-[10px] font-mono uppercase text-[#264653]">3. Inflation Control</div>
              <div className="text-2xl font-mono font-bold text-[#1E1E1E] mt-1">
                {finalMasteryReport.inflationControlScore} <span className="text-xs text-[#264653]">/ 25</span>
              </div>
              <div className="w-full bg-[#F7F4EB] h-1.5 border border-[#1E1E1E] mt-2">
                <div
                  className="bg-[#E9C46A] h-full"
                  style={{ width: `${(finalMasteryReport.inflationControlScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#264653] mt-2">Price stability around target 2.5%</p>
            </div>

            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4">
              <div className="text-[10px] font-mono uppercase text-[#264653]">4. Debt Sustainability</div>
              <div className="text-2xl font-mono font-bold text-[#E04F3E] mt-1">
                {finalMasteryReport.debtSustainabilityScore} <span className="text-xs text-[#264653]">/ 25</span>
              </div>
              <div className="w-full bg-[#F7F4EB] h-1.5 border border-[#1E1E1E] mt-2">
                <div
                  className="bg-[#E04F3E] h-full"
                  style={{ width: `${(finalMasteryReport.debtSustainabilityScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[#264653] mt-2">Prudent Debt-to-GDP ratio control</p>
            </div>
          </div>

          {/* Dual-Line Benchmark Chart: Student Trajectory vs Historical Reality */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 border border-[#1E1E1E] bg-[#FFFFFF] p-5 shadow-brutal space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#1E1E1E] pb-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2A9D8F]" /> Treasury Capital Trajectory ($M): Administration vs Real History
                </h3>
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 font-bold text-[#2A9D8F]">
                    <span className="w-3.5 h-0.5 bg-[#2A9D8F]" /> Your Capital
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-[#E04F3E]">
                    <span className="w-3.5 h-0.5 border-t border-dashed border-[#E04F3E]" /> Real History
                  </span>
                </div>
              </div>

              {/* Minimalist Vector SVG Chart */}
              <div className="w-full overflow-x-auto">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 font-mono text-[10px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = margin.top + chartH * pct;
                    const val = Math.round(maxVal - pct * range);
                    return (
                      <g key={i}>
                        <line x1={margin.left} y1={y} x2={svgWidth - margin.right} y2={y} stroke="#E5E0D0" strokeWidth="1" />
                        <text x={margin.left - 6} y={y + 3} textAnchor="end" fill="#264653">
                          ${val}M
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis Years */}
                  {[0, 1, 2, 3, 4, 5].map((idx) => {
                    const x = margin.left + (idx / 5) * chartW;
                    return (
                      <g key={idx}>
                        <line x1={x} y1={margin.top} x2={x} y2={margin.top + chartH} stroke="#E5E0D0" strokeWidth="1" />
                        <text x={x} y={svgHeight - 10} textAnchor="middle" fill="#264653">
                          {idx === 0 ? 'Start' : `FY ${idx}`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Historical Dashed Line */}
                  <polyline
                    fill="none"
                    stroke="#E04F3E"
                    strokeWidth="2.5"
                    strokeDasharray="5,4"
                    points={histCoords}
                  />

                  {/* Student Solid Line */}
                  <polyline
                    fill="none"
                    stroke="#2A9D8F"
                    strokeWidth="3"
                    points={studentCoords}
                  />

                  {/* Student Data Dots */}
                  {studentPoints.map((val, idx) => {
                    const x = margin.left + (idx / 5) * chartW;
                    const y = margin.top + chartH - ((val - minVal) / range) * chartH;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#FFFFFF"
                        stroke="#2A9D8F"
                        strokeWidth="2.5"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Indicator Comparison Table */}
              <div className="border-t border-[#1E1E1E] pt-3 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#1E1E1E] text-[10px] text-[#264653] uppercase">
                      <th className="py-1">Metric</th>
                      <th className="py-1">Starting Baseline</th>
                      <th className="py-1 text-[#2A9D8F]">Your Administration</th>
                      <th className="py-1 text-[#E04F3E]">Actual History</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0D0]">
                    <tr>
                      <td className="py-1.5 font-bold font-sans">Treasury Capital</td>
                      <td className="py-1.5">${selectedCase.initialStats.treasury}M</td>
                      <td className="py-1.5 font-bold text-[#2A9D8F]">${currentStats.treasury}M ({Number(totalGrowthPct) >= 0 ? '+' : ''}{totalGrowthPct}%)</td>
                      <td className="py-1.5 text-[#E04F3E]">${hist.treasury}M</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold font-sans">Nominal GDP</td>
                      <td className="py-1.5">${selectedCase.initialStats.gdp}M</td>
                      <td className="py-1.5 font-bold text-[#1E1E1E]">${currentStats.gdp}M</td>
                      <td className="py-1.5 text-[#E04F3E]">${hist.gdp}M</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold font-sans">Debt-to-GDP</td>
                      <td className="py-1.5">{selectedCase.initialStats.debtToGdp}%</td>
                      <td className="py-1.5 font-bold text-[#1E1E1E]">{currentStats.debtToGdp}%</td>
                      <td className="py-1.5 text-[#E04F3E]">{hist.debtToGdp}%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold font-sans">CPI Inflation</td>
                      <td className="py-1.5">{selectedCase.initialStats.inflation}%</td>
                      <td className="py-1.5 font-bold text-[#1E1E1E]">{currentStats.inflation}%</td>
                      <td className="py-1.5 text-[#E04F3E]">{hist.inflation}%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold font-sans">Unemployment</td>
                      <td className="py-1.5">{selectedCase.initialStats.unemployment}%</td>
                      <td className="py-1.5 font-bold text-[#1E1E1E]">{currentStats.unemployment}%</td>
                      <td className="py-1.5 text-[#E04F3E]">{hist.unemployment}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Classroom Podium & Rankings */}
            <div className="lg:col-span-4 border border-[#1E1E1E] bg-[#FFFFFF] p-5 shadow-brutal flex flex-col justify-between">
              <div>
                <div className="border-b border-[#1E1E1E] pb-2 mb-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#E9C46A]" /> Classroom Cohort Podium
                  </h3>
                  <div className="text-[10px] font-mono text-[#264653]">Room #{roomCode} Rankings</div>
                </div>

                <div className="space-y-2">
                  {sortedPlayers.map((player, rank) => (
                    <div
                      key={player.id}
                      className={`border border-[#1E1E1E] p-2.5 flex items-center justify-between font-mono text-xs ${
                        player.id === playerId ? 'bg-[#E9C46A]/20 ring-1 ring-[#1E1E1E]' : 'bg-[#F7F4EB]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#1E1E1E] text-white flex items-center justify-center font-bold text-[10px]">
                          #{rank + 1}
                        </span>
                        <div>
                          <div className="font-bold text-[#1E1E1E]">{player.name}</div>
                          <div className="text-[10px] text-[#264653]">
                            Cap: ${player.treasury}M • Debt: {player.debtToGdp}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-sm text-[#1E1E1E]">{player.score} pts</div>
                        <span
                          className={`text-[9px] font-bold px-1 uppercase ${
                            player.fiscalStatus === 'SURPLUS' ? 'bg-[#2A9D8F] text-white' : 'bg-[#E04F3E] text-white'
                          }`}
                        >
                          {player.fiscalStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('LOBBY')}
                className="mt-6 w-full py-2.5 border border-[#1E1E1E] bg-[#1E1E1E] hover:bg-[#264653] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start New Country Case
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: 3. MAIN DASHBOARD (3-COLUMN BENTO GRID)
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#F7F4EB] text-[#1E1E1E] font-sans p-3 md:p-6 antialiased selection:bg-[#E9C46A]">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Control Masthead */}
        <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-3 md:p-4 shadow-brutal flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1E1E1E] text-white flex items-center justify-center font-mono font-bold text-sm">
              FP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#E04F3E] text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                  CASE {selectedCase.codeNumber}
                </span>
                <span className="text-xs font-mono font-bold text-[#1E1E1E]">
                  {selectedCase.name}: {selectedCase.subtitle}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#264653] mt-0.5">
                Room Code: <strong className="text-[#1E1E1E]">{roomCode}</strong> • Player: {playerName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-[#1E1E1E] bg-[#F7F4EB] px-3 py-1 font-mono text-xs font-bold text-[#1E1E1E]">
              FISCAL YEAR {currentStats.round} OF 5 ({currentShock.fiscalYearLabel})
            </div>
            <button
              type="button"
              onClick={() => setViewMode('LOBBY')}
              className="px-2.5 py-1 border border-[#1E1E1E] bg-white hover:bg-slate-100 text-xs font-mono font-bold text-[#1E1E1E]"
            >
              Exit to Lobby
            </button>
          </div>
        </div>

        {/* 3-COLUMN BENTO GRID WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ================================================================== */}
          {/* LEFT COLUMN: REVENUES (TERRACOTTA HEADER) — 3 cols                 */}
          {/* ================================================================== */}
          <div className="lg:col-span-3 border border-[#1E1E1E] bg-[#FFFFFF] shadow-brutal flex flex-col justify-between">
            <div>
              {/* Terracotta Header Banner */}
              <div className="bg-[#E04F3E] text-white px-3 py-2 border-b border-[#1E1E1E]">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>01. REVENUES & BORROWING</span>
                  <DollarSign className="w-3.5 h-3.5" />
                </h2>
              </div>

              <div className="p-3.5 space-y-4">
                {/* Corporate Tax Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Corporate Tax</span>
                    <span className="text-[#1E1E1E]">
                      {allocations.corporateTax}%{' '}
                      {allocations.corporateTax > 28 && (
                        <span className="text-[#E04F3E] text-[10px]">(Laffer Drag)</span>
                      )}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={45}
                    value={allocations.corporateTax}
                    onChange={(e) =>
                      setAllocations({ ...allocations, corporateTax: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Target: ~20–25%. Higher rates trigger capital flight.
                  </div>
                </div>

                {/* Personal Income Tax Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Income Tax Rate</span>
                    <span className="text-[#1E1E1E]">{allocations.incomeTax}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    value={allocations.incomeTax}
                    onChange={(e) =>
                      setAllocations({ ...allocations, incomeTax: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Broadest tax base. High rates depress consumption & approval.
                  </div>
                </div>

                {/* VAT / Consumption Tax Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>VAT / Sales Tax</span>
                    <span className="text-[#1E1E1E]">{allocations.vat}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    value={allocations.vat}
                    onChange={(e) =>
                      setAllocations({ ...allocations, vat: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Regressive consumption levy. High VAT increases CPI inflation.
                  </div>
                </div>

                {/* Sovereign Borrowing Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>New Sovereign Borrowing</span>
                    <span className="text-[#E04F3E]">${allocations.sovereignBorrowing}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    step={10}
                    value={allocations.sovereignBorrowing}
                    onChange={(e) =>
                      setAllocations({ ...allocations, sovereignBorrowing: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#E04F3E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Issues new sovereign debt. Crowds out private investment if excessive.
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Summary Mini-Card */}
            <div className="p-3 bg-[#F7F4EB] border-t border-[#1E1E1E] font-mono text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#264653]">Total Tax Receipts:</span>
                <span className="font-bold text-[#1E1E1E]">${preview.totalTaxRevenue}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#264653]">New Bond Inflows:</span>
                <span className="font-bold text-[#E04F3E]">+${allocations.sovereignBorrowing}M</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#1E1E1E]/30 font-bold text-[#2A9D8F]">
                <span>Total Treasury Inflows:</span>
                <span>${preview.totalInflows}M</span>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* CENTER COLUMN: OVERVIEW & MACRO METRICS — 6 cols                   */}
          {/* ================================================================== */}
          <div className="lg:col-span-6 space-y-4">
            {/* PROMINENT TOP CAPITAL SCORECARD */}
            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-5 shadow-brutal">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1E1E1E] pb-3">
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#264653]">
                    Current National Treasury Capital
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span
                      className={`text-4xl md:text-5xl font-mono font-extrabold tracking-tight ${
                        currentStats.treasury >= 0 ? 'text-[#1E1E1E]' : 'text-[#E04F3E]'
                      }`}
                    >
                      ${currentStats.treasury}M
                    </span>
                    <span
                      className={`text-sm font-mono font-bold ${
                        currentStats.treasury >= currentStats.initialTreasury
                          ? 'text-[#2A9D8F]'
                          : 'text-[#E04F3E]'
                      }`}
                    >
                      {currentStats.treasury >= currentStats.initialTreasury ? '▲ +' : '▼ '}
                      {(
                        ((currentStats.treasury - currentStats.initialTreasury) /
                          currentStats.initialTreasury) *
                        100
                      ).toFixed(1)}
                      % vs Baseline
                    </span>
                  </div>
                </div>

                {/* Fiscal Status Badge */}
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-[#264653] mb-1">Projected Stance</div>
                  <span
                    className={`inline-block px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider border border-[#1E1E1E] ${
                      preview.fiscalStatus === 'SURPLUS'
                        ? 'bg-[#2A9D8F] text-white'
                        : 'bg-[#E04F3E] text-white'
                    }`}
                  >
                    {preview.fiscalStatus} (${Math.abs(preview.fiscalBalance)}M)
                  </span>
                </div>
              </div>

              {/* Real-Time Macro Telemetry Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 text-center font-mono text-xs">
                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">GDP Level</div>
                  <div className="font-bold text-[#1E1E1E] text-sm mt-0.5">${currentStats.gdp}M</div>
                </div>

                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">Growth Rate</div>
                  <div
                    className={`font-bold text-sm mt-0.5 ${
                      currentStats.gdpGrowth >= 0 ? 'text-[#2A9D8F]' : 'text-[#E04F3E]'
                    }`}
                  >
                    {currentStats.gdpGrowth > 0 ? '+' : ''}
                    {currentStats.gdpGrowth}%
                  </div>
                </div>

                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">Debt-to-GDP</div>
                  <div
                    className={`font-bold text-sm mt-0.5 ${
                      currentStats.debtToGdp > 90
                        ? 'text-[#E04F3E]'
                        : currentStats.debtToGdp > 60
                        ? 'text-[#E9C46A]'
                        : 'text-[#1E1E1E]'
                    }`}
                  >
                    {currentStats.debtToGdp}%
                  </div>
                </div>

                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">CPI Inflation</div>
                  <div
                    className={`font-bold text-sm mt-0.5 ${
                      currentStats.inflation > 6 ? 'text-[#E04F3E]' : 'text-[#1E1E1E]'
                    }`}
                  >
                    {currentStats.inflation}%
                  </div>
                </div>

                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">Unemployment</div>
                  <div className="font-bold text-sm mt-0.5 text-[#264653]">{currentStats.unemployment}%</div>
                </div>

                <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-2">
                  <div className="text-[9px] uppercase text-[#264653]">Approval</div>
                  <div className="font-bold text-sm mt-0.5 text-[#1E1E1E]">{currentStats.approval}%</div>
                </div>
              </div>
            </div>

            {/* 2D Flat SVG Charts (Capital Trajectory & GDP Growth) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Capital & Balance Chart */}
              <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-3 shadow-brutal space-y-2">
                <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-[#1E1E1E]">
                  <span>Capital ($M) History</span>
                  <span className="text-[#2A9D8F]">● Reserves</span>
                </div>
                <div className="h-32 border border-[#E5E0D0] bg-[#F7F4EB] p-2 flex items-end gap-1">
                  {history.map((h, i) => {
                    const maxCap = Math.max(...history.map((x) => x.treasury), 100);
                    const hPct = Math.max(10, Math.min(100, (h.treasury / maxCap) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className="w-full bg-[#2A9D8F] border border-[#1E1E1E]"
                          style={{ height: `${hPct}%` }}
                        />
                        <span className="text-[9px] font-mono text-[#264653]">{i === 0 ? '0' : `FY${i}`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* GDP & Inflation Trajectory Chart */}
              <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-3 shadow-brutal space-y-2">
                <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-[#1E1E1E]">
                  <span>GDP Growth (%)</span>
                  <span className="text-[#E04F3E]">● Inflation</span>
                </div>
                <div className="h-32 border border-[#E5E0D0] bg-[#F7F4EB] p-2 flex items-end gap-1">
                  {history.map((h, i) => {
                    const normGrowth = Math.max(8, Math.min(100, (h.gdpGrowth + 5) * 6));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className="w-full bg-[#E9C46A] border border-[#1E1E1E]"
                          style={{ height: `${normGrowth}%` }}
                        />
                        <span className="text-[9px] font-mono text-[#264653]">{h.gdpGrowth}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Bar: Advance to Shock Event */}
            <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-mono text-[#264653]">
                <strong className="text-[#1E1E1E]">Next Step:</strong> Lock this budget allocation and resolve the{' '}
                <span className="text-[#E04F3E] font-bold">"{currentShock.title}"</span> historical crisis.
              </div>

              <button
                type="button"
                onClick={() => setViewMode('SHOCK_MODAL')}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#1E1E1E] bg-[#1E1E1E] hover:bg-[#264653] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-brutal transition"
              >
                Confront Historical Crisis <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ================================================================== */}
          {/* RIGHT COLUMN: EXPENDITURES (TERRACOTTA HEADER) — 3 cols            */}
          {/* ================================================================== */}
          <div className="lg:col-span-3 border border-[#1E1E1E] bg-[#FFFFFF] shadow-brutal flex flex-col justify-between">
            <div>
              {/* Terracotta Header Banner */}
              <div className="bg-[#E04F3E] text-white px-3 py-2 border-b border-[#1E1E1E]">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>02. EXPENDITURES ($M)</span>
                  <Building className="w-3.5 h-3.5" />
                </h2>
              </div>

              <div className="p-3.5 space-y-4">
                {/* Infrastructure */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Infrastructure & Energy</span>
                    <span className="text-[#1E1E1E]">${allocations.infrastructure}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={currentStats.gdp * 0.25}
                    value={allocations.infrastructure}
                    onChange={(e) =>
                      setAllocations({ ...allocations, infrastructure: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Keynesian multiplier (1.45x); creates immediate construction jobs.
                  </div>
                </div>

                {/* Education & R&D (with Endogenous growth tag) */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span className="flex items-center gap-1">
                      Education & R&D <Sparkles className="w-3 h-3 text-[#2A9D8F]" />
                    </span>
                    <span className="text-[#2A9D8F] font-extrabold">${allocations.educationRd}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={currentStats.gdp * 0.20}
                    value={allocations.educationRd}
                    onChange={(e) =>
                      setAllocations({ ...allocations, educationRd: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#2A9D8F] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Accumulates in R&D Stock ({currentStats.humanCapitalStock.toFixed(1)} pts); unlocks +
                    {(currentStats.humanCapitalStock * 0.18).toFixed(1)}% GDP bonus in later rounds.
                  </div>
                </div>

                {/* Healthcare & Social Safety */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Healthcare & Social Safety</span>
                    <span className="text-[#1E1E1E]">${allocations.healthcareSocial}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={currentStats.gdp * 0.25}
                    value={allocations.healthcareSocial}
                    onChange={(e) =>
                      setAllocations({ ...allocations, healthcareSocial: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Bolsters household disposable income and maintains Public Approval.
                  </div>
                </div>

                {/* Industrial Subsidies */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Industrial Subsidies</span>
                    <span className="text-[#1E1E1E]">${allocations.industrialSubsidies}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={currentStats.gdp * 0.15}
                    value={allocations.industrialSubsidies}
                    onChange={(e) =>
                      setAllocations({ ...allocations, industrialSubsidies: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Targeted grants for export factories and strategic export sectors.
                  </div>
                </div>

                {/* Debt Servicing (Mandatory Interest + Principal) */}
                <div>
                  <div className="flex justify-between font-mono text-xs font-bold">
                    <span>Sovereign Debt Servicing</span>
                    <span
                      className={`font-mono ${
                        allocations.debtServicing < preview.mandatoryInterestDue
                          ? 'text-[#E04F3E]'
                          : 'text-[#2A9D8F]'
                      }`}
                    >
                      ${allocations.debtServicing}M (Req: ${preview.mandatoryInterestDue}M)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(preview.mandatoryInterestDue * 2, 200)}
                    value={allocations.debtServicing}
                    onChange={(e) =>
                      setAllocations({ ...allocations, debtServicing: Number(e.target.value) })
                    }
                    className="w-full mt-1.5 accent-[#1E1E1E] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#264653] mt-0.5">
                    Paying below mandatory interest triggers sovereign bond credit penalties.
                  </div>
                </div>
              </div>
            </div>

            {/* Expenditure Summary Mini-Card */}
            <div className="p-3 bg-[#F7F4EB] border-t border-[#1E1E1E] font-mono text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#264653]">Total Outlays:</span>
                <span className="font-bold text-[#E04F3E]">${preview.totalExpenditure}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#264653]">Net Budget Balance:</span>
                <span
                  className={`font-bold ${
                    preview.fiscalBalance >= 0 ? 'text-[#2A9D8F]' : 'text-[#E04F3E]'
                  }`}
                >
                  {preview.fiscalBalance >= 0 ? '+' : ''}${preview.fiscalBalance}M
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Classroom Cohort Leaderboard Strip */}
        <div className="border border-[#1E1E1E] bg-[#FFFFFF] p-4 shadow-brutal">
          <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-2 mb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#264653]" /> Live Classroom Cohort Standings (Room #{roomCode})
            </h3>
            <span className="text-[10px] font-mono text-[#264653]">
              Synchronized via BroadcastChannel & LocalStorage Dual-Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
            {sortedPlayers.map((player, idx) => (
              <div
                key={player.id}
                className={`border border-[#1E1E1E] p-2.5 flex items-center justify-between ${
                  player.id === playerId ? 'bg-[#E9C46A]/20 ring-1 ring-[#1E1E1E]' : 'bg-[#F7F4EB]'
                }`}
              >
                <div>
                  <div className="font-bold text-[#1E1E1E] flex items-center gap-1.5">
                    <span className="text-[10px] bg-[#1E1E1E] text-white px-1">#{idx + 1}</span>
                    {player.name}
                  </div>
                  <div className="text-[10px] text-[#264653] mt-0.5">
                    GDP ${player.gdp}M • Debt {player.debtToGdp}%
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-[#1E1E1E]">${player.treasury}M</div>
                  <span
                    className={`inline-block text-[9px] font-bold px-1 uppercase ${
                      player.fiscalStatus === 'SURPLUS' ? 'bg-[#2A9D8F] text-white' : 'bg-[#E04F3E] text-white'
                    }`}
                  >
                    {player.fiscalStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. HISTORICAL MACROECONOMIC SHOCK MODAL                              */}
      {/* ==================================================================== */}
      {viewMode === 'SHOCK_MODAL' && (
        <div className="fixed inset-0 z-50 bg-[#1E1E1E]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border-2 border-[#1E1E1E] max-w-2xl w-full shadow-brutal-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Terracotta Header */}
            <div className="bg-[#E04F3E] text-white p-4 border-b border-[#1E1E1E] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  Historical Crisis Dispatch • {currentShock.fiscalYearLabel}
                </span>
                <h2 className="text-lg font-mono font-extrabold uppercase mt-0.5">{currentShock.title}</h2>
              </div>
              <AlertTriangle className="w-6 h-6 text-white shrink-0" />
            </div>

            {/* Crisis Context */}
            <div className="p-5 space-y-4 font-sans text-xs">
              <p className="text-[#264653] leading-relaxed border-l-2 border-[#1E1E1E] pl-3 py-1 font-serif text-sm italic bg-[#F7F4EB]">
                "{currentShock.context}"
              </p>

              {/* Policy Options A, B, C */}
              <div className="space-y-2.5">
                {currentShock.options.map((opt) => {
                  const isSelected = selectedShockId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShockId(opt.id)}
                      className={`cursor-pointer border border-[#1E1E1E] p-3.5 transition ${
                        isSelected
                          ? 'bg-[#E9C46A]/30 ring-2 ring-[#1E1E1E] shadow-brutal'
                          : 'bg-[#FFFFFF] hover:bg-[#FAF8F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono font-bold text-xs text-[#1E1E1E]">
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-[#1E1E1E] text-white flex items-center justify-center text-[10px]">
                            {opt.id}
                          </span>
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#2A9D8F] text-white px-1.5 py-0.5 uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#264653] mt-1.5 pl-7 leading-relaxed font-sans">
                        {opt.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1E1E1E]">
                <button
                  type="button"
                  onClick={() => setViewMode('DASHBOARD')}
                  className="px-4 py-2 border border-[#1E1E1E] bg-white hover:bg-slate-100 font-mono text-xs font-bold uppercase"
                >
                  ← Revise Sliders
                </button>
                <button
                  type="button"
                  onClick={handleConfirmShockDecision}
                  className="px-6 py-2.5 border border-[#1E1E1E] bg-[#1E1E1E] hover:bg-[#264653] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-brutal flex items-center gap-2"
                >
                  Execute Fiscal Year Impact <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. ROUND FEEDBACK & CAUSAL MACROECONOMIC BREAKDOWN MODAL            */}
      {/* ==================================================================== */}
      {viewMode === 'ROUND_FEEDBACK' && (
        <div className="fixed inset-0 z-50 bg-[#1E1E1E]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border-2 border-[#1E1E1E] max-w-2xl w-full shadow-brutal-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1E1E1E] text-white p-4 border-b border-[#1E1E1E] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2A9D8F] font-bold">
                  Fiscal Year {currentStats.round - 1} Concluded
                </span>
                <h2 className="text-lg font-mono font-extrabold uppercase mt-0.5">
                  Macroeconomic Cause-and-Effect Report
                </h2>
              </div>
              <Award className="w-6 h-6 text-[#E9C46A] shrink-0" />
            </div>

            <div className="p-5 space-y-4 font-sans text-xs">
              {/* Top Delta Badge */}
              <div className="border border-[#1E1E1E] bg-[#F7F4EB] p-3 flex items-center justify-between font-mono">
                <div>
                  <div className="text-[10px] text-[#264653] uppercase">Treasury Capital Post-Round</div>
                  <div className="text-2xl font-extrabold text-[#1E1E1E]">${currentStats.treasury}M</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#264653] uppercase">Annual Stance</div>
                  <div
                    className={`font-bold ${
                      currentStats.budgetBalance >= 0 ? 'text-[#2A9D8F]' : 'text-[#E04F3E]'
                    }`}
                  >
                    {currentStats.budgetBalance >= 0 ? 'SURPLUS' : 'DEFICIT'} (${currentStats.budgetBalance}M)
                  </div>
                </div>
              </div>

              {/* Explanations List */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#264653] font-bold">
                  Theoretical Transmission Mechanisms:
                </div>
                {lastRoundExplanations.map((exp, i) => (
                  <div key={i} className="border border-[#1E1E1E] bg-[#FFFFFF] p-2.5 flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                    <span className="text-[#1E1E1E] font-sans text-xs">{exp}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-[#1E1E1E]">
                <button
                  type="button"
                  onClick={handleNextRoundOrFinish}
                  className="px-6 py-2.5 border border-[#1E1E1E] bg-[#1E1E1E] hover:bg-[#264653] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-brutal flex items-center gap-2"
                >
                  {currentStats.round > 5
                    ? 'View Final Assessment & Historical Debrief'
                    : `Proceed to Fiscal Year ${currentStats.round}`}{' '}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
