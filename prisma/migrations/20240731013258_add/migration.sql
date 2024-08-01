-- CreateTable
CREATE TABLE "CoordenadorDiocesano" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "paroquia" TEXT NOT NULL,
    "representacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordenadorDiocesano_pkey" PRIMARY KEY ("id")
);
