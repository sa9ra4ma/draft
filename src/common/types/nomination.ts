export interface TNomination {
    _id?: object | string;
    room_id: object | string;
    member_id: object | string;
    turn: number;
    duplicate_turn: number;
    nomination_id: string;
    nomination_time: object | null;
}

