import express from 'express';
import {router as player} from './player';
import {router as management} from './management';
import {router as room} from './room';
import {router as member} from './member';
import {router as event} from './event';
import {router as nomination} from './nomination';

export const router = express.Router();

router.use('/player', player);
router.use('/m', management);
router.use('/room', room);
router.use('/member', member);
router.use('/event', event);
router.use('/nomination', nomination);
