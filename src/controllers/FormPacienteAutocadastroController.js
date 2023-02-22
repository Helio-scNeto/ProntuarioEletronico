import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async criaFormMeuPaciente(req, res) {
    const {
      nomeDaMae,
      inicioDosSintomas,
      comorbidades,
      anamnese,
    } = req.body;

    try {
      const medico = await prisma.medico.findUnique({
        where: { id: parseInt(req.medicoId) },
      });

      const paciente = await prisma.paciente.findUnique({
        where: { id: parseInt(req.pacienteId) },
      });

        console.log(paciente.aniversario)

      const formPacienteAutoCad = await prisma.meuPaciente.create({
        data: {
          nome: paciente.nome,
          nomeDaMae,
          aniversario: paciente.aniversario,
          idade: paciente.idade,
          inicioDosSintomas: new Date(
            inicioDosSintomas.replace(/(\d+[/])(\d+[/])/, '$2$1')
          ).toLocaleDateString('pt-BR'),
          comorbidades,
          anamnese,
         
        },
     
      });
      return res.json(formPacienteAutoCad);
    } catch (error) {
      return res.send(
        `Problema ao adicionar paciente, tente novamente! ${error}`
      );
    }
  },
  async findMeusPacientes(req, res) {
    try {
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
        id_logado: req.medicoId,
      });
    } catch (error) {
      return res.json(`${message.error}`);
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
