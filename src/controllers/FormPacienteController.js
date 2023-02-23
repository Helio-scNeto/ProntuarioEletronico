import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async criaFormMeuPaciente(req, res) {
    const { nomeDaMae, inicioDosSintomas, comorbidades, anamnese } =
      req.body;

    try {
      const paciente = await prisma.paciente.findUnique({
        where: { id: parseInt(req.pacienteId) },
      });
      //procurar em formPaciente um paciente igual e retornar a lista sem edição

      const formPreenchido = await prisma.formPaciente.findUnique({
        select: {
          nomeDaMae: true,
          comorbidades: true,
          anamnese: true,
        },
        where: { id: parseInt(req.pacienteId) },
      });

      if (formPreenchido) {
        return res.json({
          message: 'Formulário já foi preenchido, aguarde!',
          infos_preenchidas: formPreenchido,
        });
      } else {
        const formPacienteAutoCad = await prisma.formPaciente.create({
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
      }
    } catch (error) {
      return res.send(
        `Problema ao preencher formulário, tente novamente! ${error}`
      );
    }
  },
};
