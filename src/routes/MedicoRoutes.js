import { Router } from 'express';
import MedicoAutoCadastroController from '../controllers/MedicoAutoCadastroController';
import MeuPacienteController from '../controllers/MeuPacienteController';

const medRouter = Router();
const { eAdmin } = require('../middleware/auth');

//Médico
medRouter.post(
  '/cadastro-medico',
  MedicoAutoCadastroController.criaMedico
);

//Pacientes cadastrados pelo médico;
medRouter.post(
  '/add-meu-paciente',
  eAdmin,
  MeuPacienteController.criaMeuPaciente
);

medRouter.get(
  '/meus-pacientes',
  eAdmin,
  MeuPacienteController.findMeusPacientes
);

medRouter.put(
  '/att-meu-paciente/:id',
  MeuPacienteController.updateMeuPaciente
);

export { medRouter };
