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

      if (!medico) {
        return res.json({
          message: 'Não existe médico com estas credenciais!',
        });
      }

      const meuPaciente = await prisma.meuPaciente.create({
        data: {
          nome,
          nomeDaMae,
          aniversario: new Date().toISOString(),
          inicioDosSintomas: new Date().toISOString(),
          comorbidades: true || false,
          anamnese,
          medicoId: medico.id,
        },
        include: {
          medico: true,
        },
      });
      return res.json(meuPaciente);
    } catch (error) {
      return res.send(
        `Problema ao adicionar paciente, tente novamente! ${error}`
      );
    }
  },
};
