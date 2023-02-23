import { Router } from 'express';
import MedicoAutoCadastroController from '../controllers/MedicoAutoCadastroController';

const adminRouter = Router();
const { eAdmin } = require('../middleware/auth');

//Medicos
adminRouter.get(
  '/medicos',
  MedicoAutoCadastroController.findAllMedicos
);
adminRouter.get(
  '/medico/:id',
  MedicoAutoCadastroController.findMedico
);
adminRouter.put(
  '/medico/:id',
  MedicoAutoCadastroController.updateMedico
);
adminRouter.delete(
  '/medico/:id',
  MedicoAutoCadastroController.deleteMedico
);

export { adminRouter };
