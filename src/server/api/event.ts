import express from 'express';
import { collection } from '../db';

export const router = express.Router();

// イベント取得
// GET  http://localhost:3000/api/event/:id?order=1
router.get('/:id', async (req, res) => {
    try {
        const cond = {
            room_id: req.params.id,
            event_order: {$gt: +(req?.query?.order||0)}     // 暫定的に必ず数値が来る前提の実装
        }
        const docs: any[] = await collection('events').find(cond).toArray();
        res.json(docs);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// イベント発行
// POST  http://localhost:3000/api/event/:id
router.post('/:id', async (req, res) => {
    try {
        const aggregate = [
            { $match: { room_id: req.params.id } },
            { $sort: { event_order: -1 } },
            { $limit: 1 },
            { $project: { _id: 0, event_order: 1 } }
        ]
        const eventOrderRes: any[] = await collection('events').aggregate(aggregate).toArray();
        
        const insObj = {
            room_id: req.params.id,
            member_id: req.body.memberId,
            type: req.body.type,
            content: req.body.content,
            event_order: (eventOrderRes[0]?.event_order || 0) + 1,
            event_time: new Date()
        }
        const docs: any = await collection('events').insert(insObj);
        res.json({insertedCount: docs.insertedCount});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})
