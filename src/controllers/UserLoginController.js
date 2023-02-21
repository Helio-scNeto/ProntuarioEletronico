import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  async Login(req, res) {
    try {
      const { cpf, senha } = req.body;

      let medico = await prisma.medico.findUnique({
        where: { cpf: cpf },
      });

      const password_valid = await bcrypt.compare(
        senha,
        medico.senha
      );

      if (!cpf || !password_valid) {
        return res.json('Campo CPF ou Senha inválido!');
      }

      let accessToken = jwt.sign({ crm: medico.crm }, 'secret', {
        expiresIn: '24h',
      });

      return res.json({
        message: 'Login bem sucedido!',
        token: accessToken,
      });
    } catch (error) {
      return res.json(error);
    }
  },
};
