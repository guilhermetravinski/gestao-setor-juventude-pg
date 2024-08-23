/*
  Warnings:

  - Added the required column `email` to the `Coordenador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `CoordenadorDiocesano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordenador" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CoordenadorDiocesano" ADD COLUMN     "email" TEXT NOT NULL;
