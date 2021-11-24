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

        // メンバー登録
        const roomIdObj = new mongo.ObjectID(roomId);
        const memberInfo: TMember = {
            room_id: roomIdObj,
            name: name,
            enter_time: new Date(),
            leave_time: null
        }
        const result1 = await collection('member').insert(memberInfo);
        const memberIdObj = result1?.insertedIds[0];
        if (!memberIdObj) throw new Error('member id is none');

        // 入室イベント登録
        while(true) {
            try {
                // ルーム内の最大イベント番号取得
                const result2 = await collection('events')
                    .find({ room_id: roomIdObj }, { _id: 0, event_order: 1 })          // 対象フィールドの指定がうまく機能しない
                    .sort({ event_order: -1 })
                    .limit(1)
                    .toArray();
                const eventOrder = result2.length > 0 ? result2[0].event_order + 1 : 1;

                // その番号を使ってイベント登録
                const eventInfo = {
                    room_id: roomIdObj,
                    member_id: memberIdObj,
                    type: '10',
                    content: '',
                    event_order: eventOrder,
                    event_time: new Date()
                }
                const result3 = await collection('events').insert(eventInfo);
                break;
            } catch(err) {
                // イベント番号重複によってエラーが発生した場合は、やり直し
                if ((err as any).code === 11000) continue;
                else throw err;
            }
        }
        res.json(memberIdObj);
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
