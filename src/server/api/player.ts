import express from 'express';
import { collection } from '../db';

export const router = express.Router();

interface PositionList { [key: string]: string}
const posList: PositionList = {'1': '投手', '2': '捕手', '3': '内野手', '4': '外野手'};

// GET  http://localhost:3000/api/player/list
router.get('/list', function(req, res){
    let cond: any = {};
    if (req.query.team) cond['球団'] = req.query.team;
    if (req.query.pos) cond['守備'] = posList[<string>req.query.pos];

    collection('players').find(cond).toArray((err:any, docs:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json(docs);
    })
})

// GET  http://localhost:3000/api/player/detail/:id
router.get('/detail/:id', function(req, res){
    collection('performance').find({id:req.params.id}).toArray( (err:any, docs:any) => {
        if (err) {
            console.error(err);
            res.json();
        }
        res.json(docs);
      })
})
