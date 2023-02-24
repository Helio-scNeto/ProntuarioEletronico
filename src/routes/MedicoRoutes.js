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
  '/medico/add-meu-paciente',
  eAdmin,
  MeuPacienteController.criaMeuPaciente
);

medRouter.get(
  '/medico/lista-meus-pacientes',
  eAdmin,
  MeuPacienteController.listaMeusPacientes
);


export { medRouter };
