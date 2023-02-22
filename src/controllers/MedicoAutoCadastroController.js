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

      if (!cpfValido.valida() || cpfValido.formatado(cpf).length !== 14) {
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
        },
      });
      return res.json({
        message: `Cadastro bem sucedido! Bem-vindo, ${medico.nome}!`,
      });
    } catch (error) {
      return res.send(`Problema ao cadastrar médico: ${error}`);
    }
  },
  async findAllMedicos(req, res) {
    try {
      const medicos = await prisma.medico.findMany();
      return res.json(medicos);
    } catch (error) {
      return res.send({ error });
    }
  },

  async findMedico(req, res) {
    try {
      const { id } = req.params;
      const medico = await prisma.medico.findUnique({
        where: { id: Number(id) },
      });

      if (!medico)
        return res.send({
          error: 'Não há médico cadastrado com esse ID!',
        });

      return res.json(medico);
    } catch (error) {
      return res.send({ error });
    }
  },
  async updateMedico(req, res) {
    try {
      const { id } = req.params;

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

      let medico = await prisma.medico.findUnique({
        where: { id: Number(id) },
      });

      if (!medico)
        return res.send({
          error: 'Não há médico cadastrado com esse ID!',
        });

      medico = await prisma.medico.update({
        where: { id: Number(id) },
        data: {
          nome,
          cpf,
          crm,
          estado,
          atuacao,
          email,
          senha,
          confirmacaoSenha,
        },
      });
      return res.json(medico);
    } catch (error) {
      return res.json({ error });
    }
  },
  async deleteMedico(req, res) {
    try {
      const { id } = req.params;
      const medico = await prisma.medico.findUnique({
        where: { id: Number(id) },
      });

      if (!medico)
        return res.send({
          error: 'Não há médico cadastrado com esse ID!',
        });

      await prisma.medico.delete({ where: { id: Number(id) } });

      return res.send({ message: 'Usuário deletado!' });
    } catch (error) {
      return res.send({ error });
    }
  },
};
