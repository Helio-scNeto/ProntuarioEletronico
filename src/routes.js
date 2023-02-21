import { Router } from 'express';
import MedicoAutoCadastroController from './controllers/MedicoAutoCadastroController';
import PacienteAutoCadastroController from './controllers/PacienteAutoCadastroController';
import MeuPacienteController from './controllers/MeuPacienteController';
import UserLoginController from './controllers/UserLoginController';

const router = Router();

const { eAdmin } = require('./middleware/auth')

//login
router.post(
  '/login',
  UserLoginController.Login
);

//Médico
router.post(
  '/cadastro-medico',
  MedicoAutoCadastroController.criaMedico
);
router.get('/medicos', MedicoAutoCadastroController.findAllMedicos);
router.get('/medico/:id', MedicoAutoCadastroController.findMedico);
router.put('/medico/:id', MedicoAutoCadastroController.updateMedico);
router.delete(
  '/medico/:id',
  MedicoAutoCadastroController.deleteMedico
);

//Pacientes cadastrados pelo médico;
router.post(
  '/paciente/medico/:id',
  MeuPacienteController.criaMeuPaciente
);

router.get(
  '/meus-pacientes',eAdmin,
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

export { router };
