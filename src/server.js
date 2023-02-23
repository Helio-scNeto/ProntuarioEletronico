import express from 'express';

import { adminRouter } from './routes/AdminRoutes';
import { loginRouter } from './routes/LoginRoutes';
import { medRouter } from './routes/MedicoRoutes';
import { pacienteRouter } from './routes/PacienteRoutes';
import { estadosRouter } from './scripts/Estados';

const app = express();

app.use(express.json());
app.use(estadosRouter);
app.use(adminRouter)
app.use(medRouter)
app.use(loginRouter)
app.use(pacienteRouter)

app.listen(3000, () => console.log('Sever listening on por 3000!'));
