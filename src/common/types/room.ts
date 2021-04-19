export interface TRoom {
    _id: object | string;
    name: string;
    create_time: object;
    delete_time: object;
}

export interface TEnterInfo {
    roomId: string;
    memberId: string;
}
