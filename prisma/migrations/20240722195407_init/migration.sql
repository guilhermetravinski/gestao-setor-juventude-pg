-- CreateTable
CREATE TABLE "Coordenador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeSocial" (
    "id" TEXT NOT NULL,
    "rede" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "RedeSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "paroquia" TEXT NOT NULL,
    "comunidade" TEXT NOT NULL,
    "anoFundacao" TEXT,
    "biografia" TEXT,
    "jovesAtivos" TEXT NOT NULL,
    "reunioes" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_grupoId_key" ON "Coordenador"("grupoId");

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
