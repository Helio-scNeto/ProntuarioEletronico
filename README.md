<h1 align="center"> Prontuário eletrônico </h1>

Para inciar a aplicação, execute os 3 comandos abaixo em sequência, na raiz do projeto, sem as aspas:

1.'npm install'(instalar todas as dependências necessárias)
2.'npx prisma migrate dev' (aplicar o esquema feito no prisma ao banco de dados)
3.'npm run dev' (para de inicializar o servidor)

<hr>
Feito os passos anteriores, a primeira ação que deve ser feita é a importação dos estados do 'file.csv' disponível. 

1: Acesse: http://localhost:3000/estados no Postman ou similar, utilizando método POST
2. Use a raiz do projeto o mova o file.csv pra dentro do repositório atual do Postman
3: No body da requisição form-data ou similar o envio de arquivo, selecione o file.csv no diretório com key 'file', sem as aspas.
4: Se bem sucedido a rota deve retornar um array contendo os objetos do modelo Estado.
<hr>
O primeiro Administrador (Superusuário do sistema) deve ser feito via terminal ou deve ser inserido manualmente no banco de dados, com os campos CPF e Senha.

Na raiz do projeto, o arquivo SimulaçãoUser.json contém uma sugestão de Administrador, mas sinta-se livre pra utilizar o CPF que desejar, desde que seja válido, ou o sistema não permitirá a criação. 

Feito a criação do primeiro do primeiro Administrador, acesse:

<h2>Administração</h2>
1. GET http://localhost:3000/admin - pra gerar novos administradores automáticamente.

2. GET http://localhost:3000/admin/pacientes - para listar pacientes do autocadastro

3. GET http://localhost:3000/admin/medicos - para listar médicos do autocadastro

4. PUT http://localhost:3000/admin/ativar-medico/':id' - para mudar status de atividade um médico (muda ':id' pelo número de id do médico desejado)

5. PUT http://localhost:3000/admin/inativar-medico/':id' - para mudar status de atividade um médico (muda ':id' pelo número de id do médico desejado)

6. PUT http://localhost:3000/admin/inativar-medico/':id' - para mudar status de atividade um paciente (muda ':id' pelo número de id do paciente desejado)

7. GET http://localhost:3000/admin/transparencia - visualizar total de médicos 
cadastrados, total de pacientes cadastrados no autocadastro, total de pacientes 
cadastrados por médicos e total de médicos ativo/inativo.


 



