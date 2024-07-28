-- AlterTable
ALTER TABLE "Ata" ADD COLUMN     "movimentoPastoralId" TEXT;

-- AlterTable
ALTER TABLE "Coordenador" ADD COLUMN     "movimentoPastoralId" TEXT;

-- AlterTable
ALTER TABLE "RedeSocial" ADD COLUMN     "movimentoPastoralId" TEXT;

-- CreateTable
CREATE TABLE "MovimentoPastoral" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localAtuacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "anoFundacao" TEXT,
    "carisma" TEXT,
    "biografia" TEXT,
    "jovesAtivos" TEXT NOT NULL,
    "atividades" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovimentoPastoral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ata" ADD CONSTRAINT "Ata_movimentoPastoralId_fkey" FOREIGN KEY ("movimentoPastoralId") REFERENCES "MovimentoPastoral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
