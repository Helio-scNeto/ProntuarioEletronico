import { Router } from 'express';
import multer from 'multer';
import ImportaEstadosController from '../controllers/ImportaEstadosController';

const estadosRouter = Router();
const multerConfig = multer();
const { eAdmin } = require('../middleware/auth');

estadosRouter.post('/estados', multerConfig.single('file'), ImportaEstadosController.importaEstados);

export { estadosRouter };
