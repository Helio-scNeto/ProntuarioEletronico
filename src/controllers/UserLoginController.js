import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';
import ValidaCPF from '../scripts/ValidaCPF';
import jwt from 'jsonwebtoken';

export default {
  async Login(req, res) {
    try {
      const { cpf, senha } = req.body;

      const cpfValido = new ValidaCPF(cpf);
      const cpfValidoFormatado = cpfValido.formatado(cpf);

      if (!cpfValido.valida() || cpfValidoFormatado.length !== 14) {
        return res.json({
          error: `Campos CPF ou Senha inválidos!`,
        });
      }

      let medico = await prisma.medico.findUnique({
        where: { cpf: cpfValidoFormatado },
      });

      let paciente = await prisma.paciente.findUnique({
        where: { cpf: cpfValidoFormatado },
      });

      if (medico) {
        const password_valid = await bcrypt.compare(
          senha,
          medico.senha
        );

        if (!cpf || !password_valid) {
          return res.json('Campo CPF ou Senha inválido!');
        }

        let accessToken = jwt.sign(
          { id: Number(medico.id) },
          'secret',
          {
            expiresIn: '24h',
          }
        );

        return res.json({
          message: `Login bem sucedido! Bem-vindo, Dr. ${medico.nome}!`,
          token: accessToken,
          user: medico,
        });
      }
      if (paciente) {
        const password_valid = await bcrypt.compare(
          senha,
          paciente.senha
        );

        if (!cpf || !password_valid) {
          return res.json('Campo CPF ou Senha inválido!');
        }

        let accessToken = jwt.sign(
          { id: Number(paciente.id) },
          'secret',
          {
            expiresIn: '24h',
          }
        );
        return res.json({
          message: `Login bem sucedido! Bem-vindo, Paciente ${paciente.nome}!`,
          token: accessToken,
          user: paciente,
        });
      }
    } catch (error) {
      return res.json(error);
    }
  },
};
