import { Router } from 'express';
import MedicoCadastroController from './controllers/MedicoCadastroController';
import PacienteCadastroController from './controllers/PacienteCadastroController';

const router = Router();

//Médico
router.post('/cadastro-medico', MedicoCadastroController.criaMedico);
router.get('/medicos', MedicoCadastroController.findAllMedicos);
router.get('/medico/:id', MedicoCadastroController.findMedico);
router.put('/medico/:id', MedicoCadastroController.updateMedico);
router.delete('/medico/:id', MedicoCadastroController.deleteMedico);

//Paciente
router.post('/cadastro-paciente', PacienteCadastroController.criaPaciente);
router.get('/pacientes', PacienteCadastroController.findAllPacientes);
router.get('/paciente/:id', PacienteCadastroController.findPaciente);
router.put('/paciente/:id', PacienteCadastroController.updatePaciente);
router.delete('/paciente/:id', PacienteCadastroController.deletePaciente);


export { router };
