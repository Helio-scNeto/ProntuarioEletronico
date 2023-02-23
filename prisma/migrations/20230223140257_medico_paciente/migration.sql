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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Medico_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado" ("nome") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "MeuPaciente_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "aniversario" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmacaoSenha" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Paciente_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado" ("nome") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FormPaciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeDaMae" TEXT NOT NULL,
    "aniversario" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "inicioDosSintomas" TEXT NOT NULL,
    "comorbidades" BOOLEAN NOT NULL,
    "anamnese" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_uf" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "regiao" TEXT NOT NULL
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
CREATE UNIQUE INDEX "Paciente_nome_key" ON "Paciente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_telefone_key" ON "Paciente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "FormPaciente_nome_key" ON "FormPaciente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_codigo_uf_key" ON "Estado"("codigo_uf");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_uf_key" ON "Estado"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nome_key" ON "Estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_latitude_key" ON "Estado"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "Estado_longitude_key" ON "Estado"("longitude");
