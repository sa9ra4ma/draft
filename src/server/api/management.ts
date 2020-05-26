import express from 'express';
import { collection } from '../db';

export const router = express.Router();

// POST  http://localhost:3000/api/m/player
// JSON形式データをbodyに設定してください
// {"key": "val"}
// 複数件登録する場合は、
// [{"key": "val1"}, {"key": "val2"}]
// TODO: 今は何でもinsertできてしまうので、制限は後日対応
router.post('/player', function(req, res){
    collection('players').insert(req.body, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        console.log(result);
        res.json(result.insertedIds);
    })
})

// DELETE  http://localhost:3000/api/m/player/:id
router.delete('/player/id/:id', function(req, res){
    collection('players').deleteMany({id: req.params.id}, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})

// DELETE  http://localhost:3000/api/m/player/all
router.delete('/player/all', function(req, res){
    collection('players').deleteMany({}, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})

// DELETE  http://localhost:3000/api/m/player/custom
// bodyにJSON形式で条件を設定可能
// 条件1つの場合は、{"key":"val"}とする
// 2つ以上の場合は、{"key":"val","key2":"val2"}とする
router.delete('/player/custom', function(req, res){
    collection('players').deleteMany(req.body, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})


// POST  http://localhost:3000/api/m/detail
// JSON形式データをbodyに設定してください
// {"key": "val"}
// 複数件登録する場合は、
// [{"key": "val1"}, {"key": "val2"}]
// TODO: 今は何でもinsertできてしまうので、制限は後日対応
router.post('/detail', function(req, res){
    collection('performance').insert(req.body, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        console.log(result);
        res.json(result.insertedIds);
    })
})

// DELETE  http://localhost:3000/api/m/delete/:id
router.delete('/detail/id/:id', function(req, res){
    collection('performance').deleteMany({id: req.params.id}, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})

// DELETE  http://localhost:3000/api/m/detail/all
router.delete('/detail/all', function(req, res){
    collection('performance').deleteMany({}, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})

// DELETE  http://localhost:3000/api/m/detail/custom
// bodyにJSON形式で条件を設定可能
// 条件1つの場合は、{"key":"val"}とする
// 2つ以上の場合は、{"key":"val","key2":"val2"}とする
router.delete('/detail/custom', function(req, res){
    collection('performance').deleteMany(req.body, (err:any, result:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json({
            deletedCount: result.deletedCount
        });
    })
})