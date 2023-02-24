import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async criaMeuPaciente(req, res) {
    let {
      nome,
      nomeDaMae,
      aniversario,
      inicioDosSintomas,
      comorbidades,
      anamnese,
    } = req.body;

    try {
      const medico = await prisma.medico.findUnique({
        where: { cpf: req.medicoCpf },
      });

      if (!medico) {
        return res.json(`Essa rota é restrita a Médicos!`);
      }

      const nomeMeuPaciente = await prisma.meuPaciente.findUnique({
        select:{
          nome: true
        },
        where: { nome: nome },
      });

      const maeDoPaciente = await prisma.meuPaciente.findMany({
        select:{
          nomeDaMae: true
        },
        where: { nomeDaMae: nomeDaMae },
      });

      if (nomeMeuPaciente && maeDoPaciente) {
        return res.json({
          message: 'Você já inseriu esse paciente!',
        });

      } else {
        let dob = new Date(
          aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
        );
        let month_diff = Date.now() - dob.getTime();
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
        let age = Math.abs(year - 1970);

        if (comorbidades == 'Sim') {
          comorbidades = true;
        }
        if (comorbidades == 'Não') {
          comorbidades = false;
        }

        const meuPaciente = await prisma.meuPaciente.create({
          data: {
            nome,
            nomeDaMae,
            aniversario: new Date(
              aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
            ).toLocaleDateString('pt-BR'),
            idade: parseInt(age),
            inicioDosSintomas: new Date(
              inicioDosSintomas.replace(/(\d+[/])(\d+[/])/, '$2$1')
            ).toLocaleDateString('pt-BR'),
            comorbidades,
            anamnese,
            medicoId: medico.id,
          },
          include: {
            medico: true,
          },
        });
        return res.json(meuPaciente);
      }
    } catch (error) {
      return res.send(
        `Problema ao adicionar paciente, tente novamente! ${error}`
      );
    }
  },
  async listaMeusPacientes(req, res) {
    try {
      const medico = await prisma.medico.findUnique({
        where: { cpf: req.medicoCpf },
      });

      if (!medico) {
        return res.json(`Essa rota é restrita a Médicos!`);
      }

      const meusPacientes = await prisma.meuPaciente.findMany({
        where: { medicoId: Number(req.medicoId) },
        select: {
          id: true,
          nome: true,
          idade: true,
        },
      });
      return res.json({
        meusPacientes: meusPacientes,
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async updateMeuPaciente(req, res) {
    const { id } = req.params;
    const {
      nome,
      nomeDaMae,
      aniversario,
      inicioDosSintomas,
      comorbidades,
      anamnese,
    } = req.body;

    try {
      const meuPaciente = await prisma.meuPaciente.findUnique({
        where: { id: Number(id) },
      });

      if (!meuPaciente) {
        return res.send({ message: 'Paciente inexistente!' });
      }

      await prisma.meuPaciente.update({
        where: { id: Number(id) },
        data: {
          nome,
          nomeDaMae,
          aniversario,
          inicioDosSintomas,
          comorbidades,
          anamnese,
        },
      });

      return res.json({
        message: `Paciente atualizado com sucesso!`,
      });
    } catch (error) {
      return res.send({ message: error.message });
    }
  },
};
