import express from 'express';
import { collection } from '../db';
import { TNomination } from '../../common/types';
import mongo from 'mongodb';

export const router = express.Router();

// 指名
// POST  http://localhost:3000/api/nomination
router.post('/', async (req, res) => {
    try {
        if( !req?.body?.roomId || !req?.body?.memberId || !req?.body?.turn || !req?.body?.duplicateTurn || !req?.body?.nominationId ) {
            throw new Error('not enough nomination info');
        }

        const roomIdObj = new mongo.ObjectID(req.body.roomId);
        const memberIdObj = new mongo.ObjectID(req.body.memberId);
        const nominationInfo: TNomination = {
            room_id: roomIdObj,
            member_id: memberIdObj,
            turn: req.body.turn,
            duplicate_turn: req.body.duplicateTurn,
            nomination_id: req.body.nominationId,
            nomination_time: new Date()
        }
        const result = await collection('nomination_history').insert(nominationInfo);
        const insertedId = result.insertedIds;

        // 部屋内の人数カウント
        const memberCnt = (await collection('member').distinct("_id", {room_id: roomIdObj})).length;
        console.log(memberCnt)

        // このターン何人が指名済かチェック
        const nominatedCnt = (await collection('nomination_history').distinct("member_id", {room_id: roomIdObj, turn: req.body.turn})).length;
        console.log(nominatedCnt)

        // 全員が指名を終えた場合
        if (memberCnt === nominatedCnt) {
            // TODO 指名の重複をチェックする

            // 全員分の指名を取得
            const nominationRes = await collection('nomination_history').find({room_id: roomIdObj, turn: req.body.turn}).toArray();
            console.log(nominationRes)
            const nominationObj = {
                turn: req.body.turn,
                duplicate_turn: req.body.duplicateTurn,
                nomination: nominationRes.map((r: any) => {
                    return {
                        member_id: r.member_id,
                        nomination_id: r.nomination_id
                    }
                })
            }

            // イベントテーブルに指名情報を格納する
            const aggregate = [
                { $match: { room_id:  roomIdObj} },
                { $sort: { event_order: -1 } },
                { $limit: 1 },
                { $project: { _id: 0, event_order: 1 } }
            ]
            const eventOrderRes: any[] = await collection('events').aggregate(aggregate).toArray();
            const eventObj = {
                room_id: roomIdObj,
                member_id: null,
                type: '70',
                content: JSON.stringify(nominationObj),
                event_order: (eventOrderRes[0]?.event_order || 0) + 1,
                event_time: new Date()
            }
            const docs: any = await collection('events').insert(eventObj);
        }

        res.json();

    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})
