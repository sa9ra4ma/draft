import axios from 'axios';
import { TPlayerSummary, TPitcherData, TFielderData } from '../../common/types';

export function getPlayerSummary(team?: string, pos?: string): Promise<TPlayerSummary[]> {
    let url = 'http://localhost:3000/api/player/list?1=1';

    // パラメータ設定
    if (team) {
        url += `&team=${team}`;
    }
    if (pos) {
        url += `&pos=${pos}`;
    }

    return axios.get(url)
        .then(res => res.data)
        .catch(err => Promise.reject(err))
}

export function getPlayerDetail(id: string): Promise<TPitcherData[] | TFielderData[]> {
    let url = `http://localhost:3000/api/player/detail/${id}`;

    return axios.get(url)
        .then(res => {console.log(res);return res.data})
        .catch(err => Promise.reject(err))
}
