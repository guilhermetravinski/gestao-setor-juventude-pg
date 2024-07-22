-- DropForeignKey
ALTER TABLE "Coordenador" DROP CONSTRAINT "Coordenador_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "RedeSocial" DROP CONSTRAINT "RedeSocial_grupoId_fkey";

-- AlterTable
ALTER TABLE "Coordenador" ALTER COLUMN "grupoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RedeSocial" ALTER COLUMN "grupoId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_GrupoCoordenadores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GrupoRedesSociais" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GrupoCoordenadores_AB_unique" ON "_GrupoCoordenadores"("A", "B");

-- CreateIndex
CREATE INDEX "_GrupoCoordenadores_B_index" ON "_GrupoCoordenadores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GrupoRedesSociais_AB_unique" ON "_GrupoRedesSociais"("A", "B");

-- CreateIndex
CREATE INDEX "_GrupoRedesSociais_B_index" ON "_GrupoRedesSociais"("B");

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeSocial" ADD CONSTRAINT "RedeSocial_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrupoCoordenadores" ADD CONSTRAINT "_GrupoCoordenadores_A_fkey" FOREIGN KEY ("A") REFERENCES "Coordenador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrupoCoordenadores" ADD CONSTRAINT "_GrupoCoordenadores_B_fkey" FOREIGN KEY ("B") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrupoRedesSociais" ADD CONSTRAINT "_GrupoRedesSociais_A_fkey" FOREIGN KEY ("A") REFERENCES "Grupo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrupoRedesSociais" ADD CONSTRAINT "_GrupoRedesSociais_B_fkey" FOREIGN KEY ("B") REFERENCES "RedeSocial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
