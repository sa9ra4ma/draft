import express from 'express';
import { collection } from '../db';
import { TMember } from '../../common/types';
import mongo from 'mongodb';

export const router = express.Router();

// ルーム入室
// POST http://localhost:3000/api/member
router.post('/', async (req, res) => {
    try {
        if( !req?.body?.name ) {
            throw new Error('member name is none');
        }
        if( !req?.body?.roomId ) {
            throw new Error('room id is none');
        }

        const name = req.body.name;
        const roomId = req.body.roomId;

        // メンバー名のチェック　★TODO

        const memberInfo = {
            room_id: roomId,
            name: name,
            enter_time: new Date(),
            leave_time: null
        }
        const result = await collection('member').insert(memberInfo);
        res.json(result.insertedIds);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム退室
// DELETE http://localhost:3000/api/member/:id
router.delete('/:id', async (req, res) => {
    try {
        const cond = {
            _id: new mongo.ObjectID(req.params.id),
        }
        const updObj = {
            $set: {
                leave_time: new Date()
            }
        }
        const result = await collection('member').update(cond, updObj);
        res.json({deletedCount: result.result.n});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})
