import { Router } from 'express';
import PacienteAutoCadastroController from '../controllers/PacienteAutoCadastroController';
import FormPacienteController from '../controllers/FormPacienteController';

const pacienteRouter = Router();
const { eAdmin } = require('../middleware/auth');

pacienteRouter.post(
  '/cadastro-paciente',
  PacienteAutoCadastroController.criaPaciente
);
pacienteRouter.get(
  '/pacientes',
  PacienteAutoCadastroController.findAllPacientes
);
pacienteRouter.get(
  '/paciente/:id',
  PacienteAutoCadastroController.findPaciente
);
pacienteRouter.put(
  '/paciente/:id',
  PacienteAutoCadastroController.updatePaciente
);
pacienteRouter.delete(
  '/paciente/:id',
  PacienteAutoCadastroController.deletePaciente
);

pacienteRouter.post(
  '/formClinico',
  eAdmin,
  FormPacienteController.criaFormMeuPaciente
);

export { pacienteRouter };
