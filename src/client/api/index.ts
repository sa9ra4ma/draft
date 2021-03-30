import { TPlayerSummary, TPitcherData, TFielderData } from '../../common/types';
import axios from './axios';

export async function getPlayerSummary(team?: string, pos?: string): Promise<TPlayerSummary[]> {
    let url = '/api/player/list?1=1';

    // パラメータ設定
    if (team) {
        url += `&team=${team}`;
    }
    if (pos) {
        url += `&pos=${pos}`;
    }

    try {
        const res = await axios().get(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getPlayerDetail(id: string): Promise<TPitcherData[] | TFielderData[]> {
    let url = `/api/player/detail/${id}`;

    try {
        const res = await axios().get(url);
        return res.data;
    } catch (err) {
        throw err;
    }
}
