import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async criaFormMeuPaciente(req, res) {
    let { nomeDaMae, inicioDosSintomas, comorbidades, anamnese } =
      req.body;

    try {
      const paciente = await prisma.paciente.findUnique({
        where: { cpf: req.pacienteCpf },
      });

      if (!paciente) {
        return res.json(`Essa rota é restrita a pacientes!`);
      }

      //procurar em formPaciente um paciente igual e retornar a lista sem edição
      const formPreenchido = await prisma.formPaciente.findUnique({
        select: {
          nomeDaMae: true,
          inicioDosSintomas: true,
          comorbidades: true,
          anamnese: true,
        },
        where: { id: req.pacienteId },
      });


      if (formPreenchido) {

        return res.json({
          message: 'Formulário já foi preenchido, aguarde!',
          nomeDaMae: formPreenchido.nomeDaMae,
          inicioDosSintomas: formPreenchido.inicioDosSintomas,
          comorbidades: formPreenchido.comorbidades == true? 'Sim':'Não',
          anamnese: formPreenchido.anamnese,
        });
      } else {
        if (comorbidades == 'Sim') {
          comorbidades = true;
        }
        if (comorbidades == 'Não') {
          comorbidades = false;
        }

         await prisma.formPaciente.create({
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
        return res.json('Formulário preenchido com sucesso!');
      }
    } catch (error) {
      return res.send(
        `Problema ao preencher formulário, tente novamente! ${error}`
      );
    }
  },
};
