import express from 'express';
import cors from 'cors';
import { router } from './api';
import { connect } from './db';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/', router);

// 何にも一致しなかった場合
app.use((req, res) => {
    res.status(404).send('Not Found');
});

connect().then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
});


