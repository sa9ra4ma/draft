import express from 'express';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(cors());

app.get('/', (req:any, res:any) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

