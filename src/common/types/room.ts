export interface TRoom {
    _id?: object | string;
    name: string;
    status: number;
    create_time: object;
    delete_time: object | null;
}

export interface TEnterInfo {
    roomId: string;
    memberId: string;
}
