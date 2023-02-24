import { PrismaClient } from '@prisma/client';
import ValidaCPF from '../scripts/ValidaCPF';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';

export default {
  async criaMedico(req, res) {
    try {
      const {
        nome,
        cpf,
        crm,
        estado,
        atuacao,
        email,
        senha,
        confirmacaoSenha,
      } = req.body;

      const cpfValido = new ValidaCPF(cpf);

      if (
        !cpfValido.valida() ||
        cpfValido.formatado(cpf).length !== 14
      ) {
        return res.send({
          error: `CPF inválido! ${cpf}`,
        });
      }

      if (senha !== confirmacaoSenha) {
        return res.send({
          error: `As senhas digitadas não coincidem!`,
        });
      }

      let medico = await prisma.medico.findUnique({
        where: { cpf: cpf },
      });

      if (medico) {
        return res.send({
          error: `Já existe um médico com esses dados! ${cpf}`,
        });
      }

      let estadoEnviado = await prisma.estado.findUnique({
        where: { nome: estado },
      });

      if (!estadoEnviado) {
        return res.send({
          error: `Insira um Estado válido!`,
        });
      }

      medico = await prisma.medico.create({
        data: {
          nome,
          cpf: cpfValido.formatado(cpf),
          crm,
          estado,
          atuacao,
          email,
          senha: await bcrypt.hash(senha, 8),
          confirmacaoSenha: await bcrypt.hash(confirmacaoSenha, 8),
          isActive: true,
        },
      });
      return res.json({
        message: `Cadastro bem sucedido! Bem-vindo, ${medico.nome}!`,
      });
    } catch (error) {
      return res.send(`Problema ao cadastrar médico: ${error}`);
    }
  },
  async listaMedicos(req, res) {
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });
      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }

      const medicos = await prisma.medico.findMany({
        select: {
          nome: true,
          email: true,
        },
      });
      return res.json(medicos);
    } catch (error) {
      return res.send({ error });
    }
  },
};
