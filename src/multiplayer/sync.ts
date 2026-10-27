import { ClassroomPlayer, RoomState } from '../types';

export type SyncMessage =
  | { type: 'ROOM_CREATED'; roomState: RoomState }
  | { type: 'PLAYER_JOINED'; roomCode: string; player: ClassroomPlayer }
  | { type: 'PLAYER_UPDATED'; roomCode: string; player: ClassroomPlayer }
  | { type: 'GAME_STARTED'; roomCode: string; caseId: string }
  | { type: 'ROUND_ADVANCED'; roomCode: string; round: number }
  | { type: 'ROOM_STATE_SYNC'; roomState: RoomState };

export class MultiplayerSync {
  private channel: BroadcastChannel | null = null;
  private roomCode: string = '';
  private onMessageCallback: ((msg: SyncMessage) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('fiscal_pulse_sync_bus');
        this.channel.onmessage = (event) => {
          if (event.data && this.onMessageCallback) {
            this.onMessageCallback(event.data);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not available, falling back to localStorage events', err);
      }

      // Storage event fallback for multi-tab sync
      window.addEventListener('storage', (e) => {
        if (e.key === 'fiscal_pulse_last_sync_event' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (this.onMessageCallback) {
              this.onMessageCallback(parsed);
            }
          } catch {
            // ignore parse errors
          }
        }
      });
    }
  }

  public subscribe(roomCode: string, callback: (msg: SyncMessage) => void) {
    this.roomCode = roomCode;
    this.onMessageCallback = callback;
  }

  public broadcast(message: SyncMessage) {
    // 1. BroadcastChannel dispatch
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {
        console.error('BroadcastChannel send error:', e);
      }
    }

    // 2. LocalStorage event dispatch (multi-tab cross-window trigger)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'fiscal_pulse_last_sync_event',
          JSON.stringify({ ...message, _timestamp: Date.now() })
        );
      } catch {
        // quota exceeded or private mode
      }
    }
  }

  // Room Persistence in LocalStorage
  public static saveRoom(roomState: RoomState) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`fp_room_${roomState.roomCode}`, JSON.stringify(roomState));
      } catch {}
    }
  }

  public static getRoom(roomCode: string): RoomState | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(`fp_room_${roomCode}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static generateRoomCode(): string {
    const part1 = Math.floor(100 + Math.random() * 900);
    const part2 = Math.floor(100 + Math.random() * 900);
    return `${part1}-${part2}`;
  }

  public static createAiClassmates(roomCode: string, initialCapital: number, initialGdp: number): ClassroomPlayer[] {
    return [
      {
        id: 'ai_1',
        name: 'Jordan (Keynesian Hawk)',
        roomCode,
        isHost: false,
        isAi: true,
        round: 1,
        treasury: initialCapital,
        capitalDeltaPct: 0,
        gdp: initialGdp,
        gdpGrowth: 3.2,
        debtToGdp: 24.0,
        fiscalStatus: 'DEFICIT',
        score: 65,
        lastActive: Date.now(),
      },
      {
        id: 'ai_2',
        name: 'Elena (Ordoliberal Eagle)',
        roomCode,
        isHost: false,
        isAi: true,
        round: 1,
        treasury: initialCapital,
        capitalDeltaPct: 0,
        gdp: initialGdp,
        gdpGrowth: 2.8,
        debtToGdp: 18.0,
        fiscalStatus: 'SURPLUS',
        score: 72,
        lastActive: Date.now(),
      },
      {
        id: 'ai_3',
        name: 'Marcus (Industrial Planner)',
        roomCode,
        isHost: false,
        isAi: true,
        round: 1,
        treasury: initialCapital,
        capitalDeltaPct: 0,
        gdp: initialGdp,
        gdpGrowth: 3.8,
        debtToGdp: 26.0,
        fiscalStatus: 'DEFICIT',
        score: 68,
        lastActive: Date.now(),
      },
    ];
  }
}

export const syncBus = new MultiplayerSync();
