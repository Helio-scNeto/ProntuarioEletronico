<h1 align="center"> Prontuário eletrônico </h1>

Para inciar a aplicação, execute os 3 comandos abaixo em sequência, na raiz do projeto, sem as aspas:

<ol>
    <li>'npm install'(instalar todas as dependências necessárias)</li>
    <li>'npx prisma migrate dev' (aplicar o esquema feito no prisma ao banco de dados)</li>
    <li>'npm run dev' (para de inicializar o servidor)</li>
</ol>

<hr>
<h6>Feito os passos anteriores, a primeira ação que deve ser feita é a importação dos estados do 'file.csv' disponível. </h6>
 <ul>
     <li>Acesse: http://localhost:3000/estados no Postman ou similar, utilizando método POST</li>
     <li>Use a raiz do projeto o mova o file.csv pra dentro do repositório atual do Postman</li>
     <li>No body da requisição form-data ou similar o envio de arquivo, selecione o file.csv no diretório com key 'file', sem as aspas.</li>
 </ul>

4: Se bem sucedido a rota deve retornar um array contendo os objetos do modelo Estado.

<hr>
<p>O primeiro Administrador (Superusuário do sistema) deve ser inserido manualmente no banco de dados ou através do terminal, com os campos CPF e Senha.</p>

<p>Sinta-se livre pra utilizar o CPF que desejar, desde que seja válido, ou o sistema não permitirá a criação.</p>

<p>Na raiz do projeto, o arquivo <strong>SimulaçãoUser.json</strong> contém uma sugestão de Administrador, assim como de pacientes e médicos do autocadastro, e respostas para os formulários clínicos</p>

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
