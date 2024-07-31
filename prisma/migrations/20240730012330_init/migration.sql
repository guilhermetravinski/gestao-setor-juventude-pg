-- CreateTable
CREATE TABLE "Coordenador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "grupoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movimentoPastoralId" TEXT,

    CONSTRAINT "Coordenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeSocial" (
    "id" TEXT NOT NULL,
    "rede" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "grupoId" TEXT,
    "movimentoPastoralId" TEXT,

    CONSTRAINT "RedeSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ata" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "grupoId" TEXT,
    "movimentoPastoralId" TEXT,

    CONSTRAINT "Ata_pkey" PRIMARY KEY ("id")
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
    "jovensAtivos" TEXT NOT NULL,
    "reunioes" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentoPastoral" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localAtuacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "anoFundacao" TEXT,
    "carisma" TEXT,
    "biografia" TEXT,
    "jovensAtivos" TEXT NOT NULL,
    "atividades" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovimentoPastoral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_grupoId_key" ON "Coordenador"("grupoId");

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ata" ADD CONSTRAINT "Ata_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ata" ADD CONSTRAINT "Ata_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
