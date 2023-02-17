import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async criaMeuPaciente(req, res) {
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
      const medico = await prisma.medico.findUnique({
        where: { id: Number(id) },
      });

      const nomeMeuPaciente = await prisma.meuPaciente.findUnique({
        where: { nome: nome },
      });

      const maeDoPaciente = await prisma.meuPaciente.findMany({
        where: { nomeDaMae: nomeDaMae },
      });

      if (!medico) {
        return res.json({
          message: 'Não existe médico com estas credenciais!',
        });
      }

      if (nomeMeuPaciente === nome && maeDoPaciente === nomeDaMae) {
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

        const meuPaciente = await prisma.meuPaciente.create({
          data: {
            nome,
            nomeDaMae,
            aniversario: new Date(
              aniversario.replace(/(\d+[/])(\d+[/])/, '$2$1')
            ).toLocaleDateString('pt-BR'),
            idade: age.toString(),
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
  async findMeusPacientes(req, res) {
    try {
      const meusPacientes = await prisma.meuPaciente.findMany({
        select: {
          id: true,
          nome: true,
          idade: true,
        },
      });
      return res.json(meusPacientes);
    } catch (error) {
      return res.send(`${error}`);
    }
  },
};
