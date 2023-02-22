import { PrismaClient } from '@prisma/client';
import ValidaCPF from '../scripts/ValidaCPF';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';

export default {
  async criaPaciente(req, res) {
    try {
      const {
        nome,
        cpf,
        aniversario,
        estado,
        email,
        telefone,
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

      let paciente = await prisma.paciente.findUnique({
        where: { cpf: cpf },
      });

      if (paciente) {
        return res.send({
          error: `Já existe um paciente cadastrado com esse CPF!`,
        });
      }

      paciente = await prisma.paciente.create({
        data: {
          nome,
          cpf: cpfValido.formatado(cpf),
          aniversario: new Date(
            aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
          ).toLocaleDateString('pt-BR'),
          estado,
          email,
          telefone,
          senha: await bcrypt.hash(senha, 8),
          confirmacaoSenha: await bcrypt.hash(confirmacaoSenha, 8),
        },
      });
      return res.json({
        message: `Cadastro bem sucedido! Bem-vindo, ${paciente.nome}!`,
      });
    } catch (error) {
      return res.send(
        `Problema ao cadastrar paciente: ${error.message}`
      );
    }
  },
  async findAllPacientes(req, res) {
    try {
      const pacientes = await prisma.paciente.findMany();
      return res.json(pacientes);
    } catch (error) {
      return res.send({ error });
    }
  },

  async findPaciente(req, res) {
    try {
      const { id } = req.params;

      const paciente = await prisma.paciente.findUnique({
        where: { id: Number(id) },
      });

      if (!paciente)
        return res.send({
          error: 'Não há paciente cadastrado com esse ID!',
        });

      return res.json(paciente);
    } catch (error) {
      return res.send({ error });
    }
  },
  async updatePaciente(req, res) {
    try {
      const { id } = req.params;

      const {
        nome,
        cpf,
        aniversario,
        estado,
        email,
        telefone,
        senha,
        confirmacaoSenha,
      } = req.body;

      let paciente = await prisma.paciente.findUnique({
        where: { id: Number(id) },
      });

      if (!paciente)
        return res.send({
          error: 'Não há médico cadastrado com esse ID!',
        });

      paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: {
          id,
          nome,
          cpf: cpfValido.formatado(cpf),
          aniversario,
          estado,
          email,
          telefone,
          senha,
          confirmacaoSenha,
        },
      });
      return res.json(paciente);
    } catch (error) {
      return res.json({ error });
    }
  },
  async deletePaciente(req, res) {
    try {
      const { id } = req.params;
      const paciente = await prisma.paciente.findUnique({
        where: { id: Number(id) },
      });

      if (!paciente)
        return res.send({
          error: 'Não há médico cadastrado com esse ID!',
        });

      await prisma.paciente.delete({ where: { id: Number(id) } });

      return res.send({ message: 'Usuário deletado!' });
    } catch (error) {
      return res.send({ error });
    }
  },
};
