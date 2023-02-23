import { Router } from 'express';
import AdministradorController from '../controllers/AdministradorController';
import MedicoAutoCadastroController from '../controllers/MedicoAutoCadastroController';

const adminRouter = Router();
const { eAdmin } = require('../middleware/auth');

adminRouter.get('/admin', AdministradorController.criaAdm);

adminRouter.get(
  '/admin/transparencia',
  eAdmin,
  AdministradorController.transparencia
);

//Medicos
adminRouter.get(
  '/admin/medicos',
  eAdmin,
  MedicoAutoCadastroController.findAllMedicos
);

//Ativação/Desativação médicos
adminRouter.put(
  '/admin/ativar-medico/:id',
  eAdmin,
  AdministradorController.ativaMedico
);
adminRouter.put(
  '/admin/inativar-medico/:id',
  eAdmin,
  AdministradorController.inativaMedico
);
adminRouter.put(
  '/admin/ativar-paciente/:id',
  eAdmin,
  AdministradorController.ativaPaciente
);
adminRouter.put(
  '/admin/inativar-paciente/:id',
  eAdmin,
  AdministradorController.inativaPaciente
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
