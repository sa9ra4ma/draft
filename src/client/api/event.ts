import axios from './axios';
import { TEnterInfo } from '../../common/types';

// イベントの取得
export async function getEvents(roomId: string, order: number): Promise<any> {
    let url = '/api/event/';

    if (!roomId) {
        throw new Error('room id none');
    }
    if (!order && order !== 0) {
        throw new Error('order none');
    }

    url += roomId;
    url += `?order=${order}`

    try {
        const res = await axios().get(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}

// イベントの送信
export async function postEvents(enterInfo: TEnterInfo, type: string, content: string): Promise<any> {
    let url = '/api/event/';

    if (!enterInfo?.roomId || !enterInfo?.memberId || !type ) {
        throw new Error('not enough infomation');
    }

    url += enterInfo.roomId;

    const insObj = {
        memberId: enterInfo.memberId,
        type: type,
        content: content || ''
    }

    try {
        const res = await axios().post(url, insObj);
        return res.data;
    } catch (err) {
        throw err;
    }
}
