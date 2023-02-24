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

<p>Na raiz do projeto, o arquivo <strong>SimulaçãoUser.json</strong> contém uma sugestão de Administrador, assim como da pacientes, médicos e respostas dos formulário mas sinta-se livre pra utilizar o CPF que desejar, desde que seja válido, ou o sistema não permitirá a criação. </p>

<h2>Administração</h2>

<Strong align='center'>Todas as rotas abaixo necessitam de login do administrador (Token)</Strong>

GET http://localhost:3000/admin - pra gerar novos administradores automáticamente.

GET http://localhost:3000/admin/pacientes - listar pacientes do autocadastro

GET http://localhost:3000/admin/medicos - listar médicos do autocadastro

PUT http://localhost:3000/admin/ativar-medico/':id' - mudar status de atividade um médico (muda ':id' pelo número de id do médico desejado)

PUT http://localhost:3000/admin/inativar-medico/':id' - mudar status de atividade um médico (muda ':id' pelo número de id do médico desejado)

PUT http://localhost:3000/admin/inativar-medico/':id' - mudar status de atividade um paciente (muda ':id' pelo número de id do paciente desejado)

GET http://localhost:3000/admin/transparencia - visualizar total de médicos 
cadastrados, total de pacientes cadastrados no autocadastro, total de pacientes 
cadastrados por médicos e total de médicos ativo/inativo.

<h2>Autocadastro</h2>
POST http://localhost:3000/cadastro-paciente - Cadastrar paciente

POST http://localhost:3000/cadastro-medico - Cadastrar médico

<h2>Login</h2>

POST http://localhost:3000/login - Todos os usuários usam a mesma rota.

<h2>Médico</h2>

POST http://localhost:3000/medico/add-meu-paciente - Adição de paciente pelo médico, requer login do médico (token)

GET http://localhost:3000/medico/lista-meus-pacientes - Lista de pacientes, requer login do médico (token)

<h2>Paciente</h2>
POST http://localhost:3000/paciente/formClinico - Formulário clínico, requer login do paciente (token)


