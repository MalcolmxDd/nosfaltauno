import { MOCK_MATCHES, MOCK_USERS } from './mocks';

const STORAGE_KEY = 'nf1_user_matches';

export interface UserMatchInput {
    title: string;
    location: string;
    date: string;
    time: string;
    players: number;
    price: string;
    level: string;
    imageUrl?: string;
}

export function getStoredMatches(): any[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function setStoredMatches(matches: any[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    } catch {
        // localStorage full or unavailable
    }
}

export function saveUserMatch(input: UserMatchInput) {
    const existing = getStoredMatches();
    const newMatch = {
        id: `user_${Date.now()}`,
        title: input.title,
        location: input.location,
        date: input.date === new Date().toISOString().split('T')[0] ? `Hoy, ${input.time}` : `${formatDate(input.date)}, ${input.time}`,
        price: input.price || 'Gratis',
        playersNeeded: input.players,
        playersTotal: input.players,
        level: input.level,
        host: MOCK_USERS[0],
        distance: '0 km',
        lat: -36.97,
        lng: -72.87,
        confirmedPlayers: [MOCK_USERS[0]],
        pendingPlayers: [],
        fieldInfo: {
            name: input.location,
            type: 'Sintético',
            hasChangingRooms: false,
            hasParking: false,
            image: input.imageUrl || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
        },
        status: 'active',
        isJoined: true,
        needsGoalkeeper: false,
    };
    const updated = [...existing, newMatch];
    setStoredMatches(updated);
    return newMatch;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T12:00:00');
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.getTime() === today.getTime()) return 'Hoy';
    if (d.getTime() === tomorrow.getTime()) return 'Mañana';
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export function getAllMatches() {
    return [...MOCK_MATCHES, ...getStoredMatches()];
}

export function getMatchById(id: string) {
    return getAllMatches().find((m: any) => m.id.toString() === id);
}

export function clearUserMatches() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}
