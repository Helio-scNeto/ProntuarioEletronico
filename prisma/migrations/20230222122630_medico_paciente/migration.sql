-- CreateTable
CREATE TABLE "Medico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "atuacao" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmacaoSenha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MeuPaciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeDaMae" TEXT NOT NULL,
    "aniversario" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "inicioDosSintomas" TEXT NOT NULL,
    "comorbidades" BOOLEAN NOT NULL,
    "anamnese" TEXT NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MeuPaciente_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "aniversario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmacaoSenha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Medico_cpf_key" ON "Medico"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MeuPaciente_nome_key" ON "MeuPaciente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_telefone_key" ON "Paciente"("telefone");
