import express from 'express';
import { collection } from '../db';

export const router = express.Router();

// POST  http://localhost:3000/api/m/player
// JSON形式データをbodyに設定してください
// {"key": "val"}
// 複数件登録する場合は、
// [{"key": "val1"}, {"key": "val2"}]
// TODO: 今は何でもinsertできてしまうので、制限は後日対応
router.post('/player', async (req, res) => {
    try {
        const result = await collection('players').insert(req.body);
        res.json(result.insertedIds);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/player/:id
router.delete('/player/id/:id', async (req, res) => {
    const cond = {id: req.params.id};
    try {
        const result = await collection('players').deleteMany(cond);
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/player/all
router.delete('/player/all', async (req, res) => {
    try {
        const result = await collection('players').deleteMany({});
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/player/custom
// bodyにJSON形式で条件を設定可能
// 条件1つの場合は、{"key":"val"}とする
// 2つ以上の場合は、{"key":"val","key2":"val2"}とする
router.delete('/player/custom', async (req, res) => {
    try {
        const result = await collection('players').deleteMany(req.body);
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// POST  http://localhost:3000/api/m/detail
// JSON形式データをbodyに設定してください
// {"key": "val"}
// 複数件登録する場合は、
// [{"key": "val1"}, {"key": "val2"}]
// TODO: 今は何でもinsertできてしまうので、制限は後日対応
router.post('/detail', async (req, res) => {
    try {
        const result = await collection('performance').insert(req.body);
        res.json(result.insertedIds);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/delete/:id
router.delete('/detail/id/:id', async (req, res) => {
    const cond = {id: req.query.id};
    try {
        const result = await collection('performance').deleteMany(cond);
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/detail/all
router.delete('/detail/all', async (req, res) => {
    try {
        const result = await collection('performance').deleteMany({});
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// DELETE  http://localhost:3000/api/m/detail/custom
// bodyにJSON形式で条件を設定可能
// 条件1つの場合は、{"key":"val"}とする
// 2つ以上の場合は、{"key":"val","key2":"val2"}とする
router.delete('/detail/custom', async (req, res) => {
    try {
        const result = await collection('performance').deleteMany(req.body);
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// ルーム全削除
// DELETE  http://localhost:3000/api/m/room
router.delete('/room', async (req, res) => {
    try {
        const result = await collection('room').deleteMany();
        res.json({
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// イベント全件削除
// DELETE  http://localhost:3000/api/m/event
router.delete('/event', async (req, res) => {
    try {
        const result = await collection('events').deleteMany();
        console.log(result)
        res.json({deletedCount: result.deletedCount});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// メンバー全削除
// DELETE  http://localhost:3000/api/m/event
router.delete('/member', async (req, res) => {
    try {
        const result = await collection('member').deleteMany();
        res.json({deletedCount: result.deletedCount});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

// 指名履歴全削除
// DELETE  http://localhost:3000/api/m/nomination
router.delete('/nomination', async (req, res) => {
    try {
        const result = await collection('nomination_history').deleteMany();
        res.json({deletedCount: result.deletedCount});
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})