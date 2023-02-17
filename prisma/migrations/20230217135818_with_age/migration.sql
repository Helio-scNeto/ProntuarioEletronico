-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeuPaciente" (
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
INSERT INTO "new_MeuPaciente" ("anamnese", "aniversario", "comorbidades", "created_at", "id", "idade", "inicioDosSintomas", "medicoId", "nome", "nomeDaMae") SELECT "anamnese", "aniversario", "comorbidades", "created_at", "id", "idade", "inicioDosSintomas", "medicoId", "nome", "nomeDaMae" FROM "MeuPaciente";
DROP TABLE "MeuPaciente";
ALTER TABLE "new_MeuPaciente" RENAME TO "MeuPaciente";
CREATE UNIQUE INDEX "MeuPaciente_nome_key" ON "MeuPaciente"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
