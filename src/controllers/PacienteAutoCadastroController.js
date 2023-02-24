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

      let estadoEnviado = await prisma.estado.findUnique({
        where: { nome: estado },
      });

      if (!estadoEnviado) {
        return res.send({
          error: `Insira um Estado válido!`,
        });
      }

      let dob = new Date(
        aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
      );
      let month_diff = Date.now() - dob.getTime();
      let age_dt = new Date(month_diff);
      let year = age_dt.getUTCFullYear();
      let age = parseInt(Math.abs(year - 1970));

      if (age < 18) {
        return res.json('Paciente deve ter mais de 18 anos!');
      }

      paciente = await prisma.paciente.create({
        data: {
          nome,
          cpf: cpfValido.formatado(cpf),
          aniversario: new Date(
            aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
          ).toLocaleDateString('pt-BR'),
          idade: parseInt(age),
          estado,
          email,
          telefone,
          senha: await bcrypt.hash(senha, 8),
          confirmacaoSenha: await bcrypt.hash(confirmacaoSenha, 8),
          isActive: true,
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
  async listaPacientes(req, res) {
    const superUser = await prisma.administrador.findUnique({
      where: { cpf: req.admCpf },
    });

    if (!superUser) {
      return res.json(`Essa rota é restrita a administradores!`);
    }
    try {
      const pacientes = await prisma.paciente.findMany({
        select: {
          nome: true,
          email: true,
        },
      });
      return res.json(pacientes);
    } catch (error) {
      return res.send({ error });
    }
  },
};
