import express from 'express';
import configRouter from './config';
import modelsRouter from './models';
import chatsRouter from './chats';

const router = express.Router();

router.use('/config', configRouter);
router.use('/models', modelsRouter);
router.use('/chats', chatsRouter);

export default router;
