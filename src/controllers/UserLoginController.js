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

      let superUser = await prisma.administrador.findUnique({
        where: { cpf: cpfValidoFormatado },
      });

      if (medico) {
        if (medico.isActive === false) {
          return res.json(
            `Sua conta está inativa, procure a administração para mais informações!`
          );
        }

        const password_valid = await bcrypt.compare(
          senha,
          medico.senha
        );

        if (!password_valid) {
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
        if (paciente.isActive === false) {
          return res.json(
            `Sua conta está inativa, procure a administração para mais informações!`
          );
        }
        const password_valid = await bcrypt.compare(
          senha,
          paciente.senha
        );

        if (!password_valid) {
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
      if (superUser) {
        if (!cpf) {
          return res.json('Você não é um administrador.');
        }

        let accessToken = jwt.sign({ cpf: superUser.cpf }, 'secret', {
          expiresIn: '24h',
        });

        return res.json({
          message: `Login bem sucedido! Bem-vindo, Administrador ${superUser.cpf}!`,
          token: accessToken,
          user: superUser,
        });
      }
    } catch (error) {
      return res.json(error);
    }
  },
};
