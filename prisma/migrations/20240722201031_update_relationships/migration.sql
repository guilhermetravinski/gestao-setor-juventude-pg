/*
  Warnings:

  - You are about to drop the `_GrupoCoordenadores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GrupoRedesSociais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GrupoCoordenadores" DROP CONSTRAINT "_GrupoCoordenadores_A_fkey";

-- DropForeignKey
ALTER TABLE "_GrupoCoordenadores" DROP CONSTRAINT "_GrupoCoordenadores_B_fkey";

-- DropForeignKey
ALTER TABLE "_GrupoRedesSociais" DROP CONSTRAINT "_GrupoRedesSociais_A_fkey";

-- DropForeignKey
ALTER TABLE "_GrupoRedesSociais" DROP CONSTRAINT "_GrupoRedesSociais_B_fkey";

-- DropTable
DROP TABLE "_GrupoCoordenadores";

-- DropTable
DROP TABLE "_GrupoRedesSociais";
