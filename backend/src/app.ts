import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import accountsRouter from './routes/accounts';
import emailsRouter from './routes/emails';
import suggestRouter from './routes/suggest';
import ragRouter from './routes/rag';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/accounts', accountsRouter);
app.use('/emails', emailsRouter);
app.use('/suggest', suggestRouter);
app.use('/rag', ragRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
