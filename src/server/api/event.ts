import express from 'express';
import { collection } from '../db';
import mongo from 'mongodb';

export const router = express.Router();

// イベント取得
// GET  http://localhost:3000/api/event/:id?order=1
router.get('/:id', async (req, res) => {
    try {
        const roomIdObj = new mongo.ObjectID(req.params.id);
        const cond = {
            room_id: roomIdObj,
            event_order: {$gt: +(req?.query?.order||0)}     // 暫定的に必ず数値が来る前提の実装
        }
        const docs: any[] = await collection('events').aggregate([
            { $match: cond },
            {
                $lookup: {
                    from: "member",
                    localField: "member_id",
                    foreignField: "_id",
                    as: "member_info"
                }
            }
          ]).toArray()
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
        const roomIdObj = new mongo.ObjectID(req.params.id);
        const aggregate = [
            { $match: { room_id:  roomIdObj} },
            { $sort: { event_order: -1 } },
            { $limit: 1 },
            { $project: { _id: 0, event_order: 1 } }
        ]
        const eventOrderRes: any[] = await collection('events').aggregate(aggregate).toArray();
        const memberIdObj = new mongo.ObjectID(req.body.memberId);
        const insObj = {
            room_id: roomIdObj,
            member_id: memberIdObj,
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
