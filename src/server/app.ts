import express from 'express';
import cors from 'cors';
import { router } from './api';
import { connect } from './db';

const app = express();

const PORT = 3000;

app.use(cors());
app.use('/api/', router);

app.get('/', (req:any, res:any) => res.send('Hello World!!'));

connect().then(() => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
});


