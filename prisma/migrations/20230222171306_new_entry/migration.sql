-- CreateTable
CREATE TABLE "Estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_uf" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "regiao" TEXT NOT NULL
);

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
