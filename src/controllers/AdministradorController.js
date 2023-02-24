import { PrismaClient } from '@prisma/client';
import GeraCPF from '../scripts/GeraCPF';
const prisma = new PrismaClient();

export default {
  async criaAdm(req, res) {
    try {
      if (!req.admCpf) {
        return res.json(`Essa rota é restrita a administradores!`);
      }
      const gera = new GeraCPF();
      let cpfGerado = gera.geraNovoCpf();
      const senha = Math.random().toString(36).slice(-6);
      const superUser = await prisma.administrador.create({
        select: {
          cpf: true,
          senha: true,
        },
        data: {
          cpf: cpfGerado,
          senha,
        },
      });
      return res.json(superUser);
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  //#######Medico
  async ativaMedico(req, res) {
    const { id } = req.params;
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });

      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }

      const medico = await prisma.medico.update({
        where: { id: parseInt(id) },
        data: { isActive: true },
      });
      if (medico.isActive === true) {
        res.send(`Paciente ativado com sucesso!`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async inativaMedico(req, res) {
    const { id } = req.params;
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });

      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }

      const medico = await prisma.medico.update({
        where: { id: parseInt(id) },
        data: { isActive: false },
      });
      if (medico.isActive === false) {
        res.send(`Paciente inativado com sucesso!`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //#######Paciente
  async ativaPaciente(req, res) {
    const { id } = req.params;
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });

      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }
      const paciente = await prisma.paciente.update({
        where: { id: parseInt(id) },
        data: { isActive: true },
      });
      if (paciente.isActive === true) {
        res.send(`Paciente ativado com sucesso!`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async inativaPaciente(req, res) {
    const { id } = req.params;
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });

      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }
      const paciente = await prisma.paciente.update({
        where: { id: parseInt(id) },
        data: { isActive: false },
      });

      if (paciente.isActive === false) {
        res.send(`Paciente inativado com sucesso!`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async transparencia(req, res) {
    try {
      const superUser = await prisma.administrador.findUnique({
        where: { cpf: req.admCpf },
      });

      if (!superUser) {
        return res.json(`Essa rota é restrita a administradores!`);
      }

      const totalMedicosCadastrados = await prisma.medico.count();

      const totalPacientesAutoCadastro =
        await prisma.paciente.count();

      const totalPacientesCadastradosPorMedicos =
        await prisma.meuPaciente.count();

      const totalMedicosAtivos = await prisma.medico.count({
        where: { isActive: true },
      });
      const totalMedicosInativos = await prisma.medico.count({
        where: { isActive: false },
      });

      return res.json({
        MedicosCadastrados: totalMedicosCadastrados,
        pacientesAutoCadastro: totalPacientesAutoCadastro,
        PacientesCadastradosPorMedicos:
          totalPacientesCadastradosPorMedicos,
        medicosAtivos: totalMedicosAtivos,
        medicosInativos: totalMedicosInativos,
      });
    } catch (error) {
      res.send({ message: error.message });
    }
  },
};
