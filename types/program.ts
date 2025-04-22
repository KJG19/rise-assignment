
export interface Session {
    date: string;
    time: string;
}

export interface Program {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    capacity: number;
    registered: number;
    coach: string;
    visibility: 'PUBLIC' | 'PRIVATE' | 'TEAM_ONLY';
    recurring: boolean;
    sessions: Session[];
}