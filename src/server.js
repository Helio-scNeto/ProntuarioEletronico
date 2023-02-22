import express from 'express';
import { router } from './routes';
import { estadosRouter } from './scripts/Estados';

const app = express();

app.use(express.json());
app.use(router);
app.use(estadosRouter);

app.listen(3030, () => console.log('Sever listening on por 3030!'));
