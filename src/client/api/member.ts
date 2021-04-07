import { TMember } from '../../common/types';
import axios from './axios';


// ルーム入室
export async function enterRoom(body: object): Promise<any> {
    const url = '/api/member';

    try {
        const res = await axios().post(url, body);
        return res.data;
    } catch (err) {
        throw err;
    }
}

// ルーム退室
export async function leaveRoom(id: string): Promise<any> {
    const url = `/api/member/${id}`;

    try {
        const res = await axios().delete(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}

