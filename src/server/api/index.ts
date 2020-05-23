import express from 'express';
import {router as player} from './player';

export const router = express.Router();

router.use('/player', player);
