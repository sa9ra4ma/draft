import express from 'express';
export const router = express.Router();

// GET  http://localhost:3000/api/player/list
router.get('/list', function(req, res){
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
