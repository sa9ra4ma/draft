import express from 'express';
import { collection } from '../db';

export const router = express.Router();

// GET  http://localhost:3000/api/player/list
router.get('/list', function(req, res){
    collection('players').find().toArray((err:any, docs:any) => {
        console.log(docs);
      })
    res.json({
        message: 'playerlist'
    });
})

// GET  http://localhost:3000/api/player/:id
router.get('/:id', function(req, res){
    res.json({
        message: 'player'
    });
})
