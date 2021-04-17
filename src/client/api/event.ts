import axios from './axios';

// イベントの取得
export async function getEvents(roomId: string, order: number): Promise<any> {
    let url = '/api/event/';

    if (!roomId) {
        throw new Error('room id none');
    }
    if (!order) {
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
export async function postEvents(roomId: string, memberId: string, type: string, content: string): Promise<any> {
    let url = '/api/event/';

    if (!roomId) {
        throw new Error('room id none');
    }

    url += roomId;

    const insObj = {
        memberId: memberId,
        type: type,
        content: content
    }

    try {
        const res = await axios().post(url, insObj);
        return res.data;
    } catch (err) {
        throw err;
    }
}
