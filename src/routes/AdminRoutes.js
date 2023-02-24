import { Router } from 'express';
import AdministradorController from '../controllers/AdministradorController';
import MedicoAutoCadastroController from '../controllers/MedicoAutoCadastroController';
import PacienteAutoCadastroController from '../controllers/PacienteAutoCadastroController';

const adminRouter = Router();
const { eAdmin } = require('../middleware/auth');

adminRouter.get('/admin', eAdmin, AdministradorController.criaAdm);

adminRouter.get(
  '/admin/transparencia',
  eAdmin,
  AdministradorController.transparencia
);

//Medicos
adminRouter.get(
  '/admin/medicos',
  eAdmin,
  MedicoAutoCadastroController.listaMedicos
);

//Pacientes
adminRouter.get(
  '/admin/pacientes',eAdmin,
  PacienteAutoCadastroController.listaPacientes
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

//Ativação/Desativação pacientes
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

export { adminRouter };
