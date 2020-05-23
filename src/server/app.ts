import express from 'express';
import cors from 'cors';
import { router } from './api';

const app = express();

const PORT = 3000;

app.use(cors());
app.use('/api/', router);

app.get('/', (req:any, res:any) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));

