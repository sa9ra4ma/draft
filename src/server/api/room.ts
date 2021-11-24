import express from 'express';
import { collection } from '../db';
import { TRoom } from '../../common/types';
import mongo from 'mongodb';

export const router = express.Router();

interface PositionList { [key: string]: string}
const posList: PositionList = {'1': '投手', '2': '捕手', '3': '内野手', '4': '外野手'};

// ルーム全件取得
// GET  http://localhost:3000/api/room
router.get('/', async (req, res) => {
    try {
        const docs: TRoom[] = await collection('room').find().toArray();
        res.json(docs);

    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム1件取得
// GET  http://localhost:3000/api/room/:id
router.get('/:id', async (req, res) => {
    try {
        const cond = {
            _id: new mongo.ObjectID(req.params.id),
        }
        const docs: TRoom = await collection('room').findOne(cond);
        res.json(docs);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム作成
// POST http://localhost:3000/api/room
router.post('/', async (req, res) => {
    try {
        if( !req?.body?.name ) {
            throw new Error('room name is none');
        }

        const roomName = req.body.name;

        // 部屋名のチェック　★TODO

        const newRoomInfo: TRoom = {
            name: roomName,
            status: 1,
            create_time: new Date(),
            delete_time: null
        }
        const result = await collection('room').insert(newRoomInfo);
        res.json(result.insertedIds);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム論理削除
// DELETE http://localhost:3000/api/room/:id
router.delete('/:id', async (req, res) => {
    try {
        const cond = {
            _id: new mongo.ObjectID(req.params.id),
        }
        const updObj = {
            $set: {
                delete_time: new Date()
            }
        }
        const result = await collection('room').update(cond, updObj);
        res.json({deletedCount: result.result.n});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム開始
// PUT http://localhost:3000/api/room/start/:id
router.put('/start/:id', async (req, res) => {
    try {
        if( !req?.params?.id ) {
            throw new Error('room id is none');
        }

        const cond = {
            _id: new mongo.ObjectID(req.params.id),
        }
        const updObj = {
            $set: {
                status: 2
            }
        }
        const result = await collection('room').update(cond, updObj);
        res.json({deletedCount: result.result.n});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

