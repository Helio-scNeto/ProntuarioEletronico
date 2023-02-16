import { Router } from 'express';
import MedicoAutoCadastroController from './controllers/MedicoAutoCadastroController';
import PacienteAutoCadastroController from './controllers/PacienteAutoCadastroController';
import MeuPacienteController from './controllers/MeuPacienteController';

const router = Router();

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
