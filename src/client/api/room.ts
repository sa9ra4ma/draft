import { TRoom } from '../../common/types';
import axios from './axios';

export async function getListOfAllRooms(): Promise<TRoom[]> {
    const url = '/api/room';

    try {
        const res = await axios().get(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getRoom(id: string): Promise<TRoom> {
    let url = '/api/room/';

    if (!id) {
        throw new Error('room id none');
    }

    url += id;

    try {
        const res = await axios().get(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function createRoom(body: object): Promise<any> {
    const url = '/api/room';

    try {
        const res = await axios().post(url, body);
        return res.data;
    } catch (err) {
        throw err;
    }
}

