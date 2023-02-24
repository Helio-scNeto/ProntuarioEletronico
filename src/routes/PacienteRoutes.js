import { Router } from 'express';
import PacienteAutoCadastroController from '../controllers/PacienteAutoCadastroController';
import FormPacienteController from '../controllers/FormPacienteController';

const pacienteRouter = Router();
const { eAdmin } = require('../middleware/auth');

pacienteRouter.post(
  '/cadastro-paciente',
  PacienteAutoCadastroController.criaPaciente
);

pacienteRouter.post(
  '/paciente/formClinico',
  eAdmin,
  FormPacienteController.criaFormMeuPaciente
);

export { pacienteRouter };
