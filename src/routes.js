import { Router } from 'express';
import MedicoCadastroController from './controllers/MedicoCadastroController';

const router = Router();

router.post('/cadastro-medico', MedicoCadastroController.criaMedico);
router.get('/medicos', MedicoCadastroController.findAllMedicos);
router.get('/medico/:id', MedicoCadastroController.findMedico);
router.put('/medico/:id', MedicoCadastroController.updateMedico);
router.delete('/medico/:id', MedicoCadastroController.deleteMedico);

export { router };
