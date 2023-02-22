/*
  Warnings:

  - You are about to drop the column `estadoNome` on the `Medico` table. All the data in the column will be lost.
  - Added the required column `estado` to the `Medico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
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
    CONSTRAINT "Medico_estado_fkey" FOREIGN KEY ("estado") REFERENCES "Estado" ("nome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medico" ("atuacao", "confirmacaoSenha", "cpf", "created_at", "crm", "email", "id", "nome", "senha") SELECT "atuacao", "confirmacaoSenha", "cpf", "created_at", "crm", "email", "id", "nome", "senha" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE UNIQUE INDEX "Medico_cpf_key" ON "Medico"("cpf");
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
