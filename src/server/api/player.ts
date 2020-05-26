import express from 'express';
import { collection } from '../db';

export const router = express.Router();

interface PositionList { [key: string]: string}
const posList: PositionList = {'1': '投手', '2': '捕手', '3': '内野手', '4': '外野手'};

// GET  http://localhost:3000/api/player/list
router.get('/list', async (req, res) => {
    let cond: any = {};
    if (req.query.team) cond['球団'] = req.query.team;
    if (req.query.pos) cond['守備'] = posList[<string>req.query.pos];

    try {
        const docs = await collection('players').find(cond).toArray();
        res.json(docs);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
    
})

// GET  http://localhost:3000/api/player/detail/:id
router.get('/detail/:id', async (req, res) => {
    const cond = {id: req.params.id};
    try {
        const docs = await collection('performance').find(cond).toArray();
        res.json(docs);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})
