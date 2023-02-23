import { Router } from 'express';
import MedicoAutoCadastroController from './controllers/MedicoAutoCadastroController';
import PacienteAutoCadastroController from './controllers/PacienteAutoCadastroController';
import MeuPacienteController from './controllers/MeuPacienteController';
import UserLoginController from './controllers/UserLoginController';
import FormPacienteController from './controllers/FormPacienteController';

const router = Router();
const { eAdmin } = require('./middleware/auth');

//Estados

//login


//Médico
router.post(
  '/cadastro-medico',
  MedicoAutoCadastroController.criaMedico
);


//Pacientes cadastrados pelo médico;
router.post(
  '/add-meu-paciente',
  eAdmin,
  MeuPacienteController.criaMeuPaciente
);

router.get(
  '/meus-pacientes',
  eAdmin,
  MeuPacienteController.findMeusPacientes
);

router.put(
  '/att-meu-paciente/:id',
  MeuPacienteController.updateMeuPaciente
);

//Paciente Autocadastro
router.post(
  '/cadastro-paciente',
  PacienteAutoCadastroController.criaPaciente
);
router.get(
  '/pacientes',
  PacienteAutoCadastroController.findAllPacientes
);
router.get(
  '/paciente/:id',
  PacienteAutoCadastroController.findPaciente
);
router.put(
  '/paciente/:id',
  PacienteAutoCadastroController.updatePaciente
);
router.delete(
  '/paciente/:id',
  PacienteAutoCadastroController.deletePaciente
);

router.post(
  '/formClinico',eAdmin,
  FormPacienteController.criaFormMeuPaciente
);


export { router };
