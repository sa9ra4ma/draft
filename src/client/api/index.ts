import { TPlayerSummary, TPitcherData, TFielderData } from '../../common/types';
import axios from './axios';

export function getPlayerSummary(team?: string, pos?: string): Promise<TPlayerSummary[]> {
    let url = '/api/player/list?1=1';

    // パラメータ設定
    if (team) {
        url += `&team=${team}`;
    }
    if (pos) {
        url += `&pos=${pos}`;
    }

    return axios().get(url)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export function getPlayerDetail(id: string): Promise<TPitcherData[] | TFielderData[]> {
    let url = `/api/player/detail/${id}`;

    return axios().get(url)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}
