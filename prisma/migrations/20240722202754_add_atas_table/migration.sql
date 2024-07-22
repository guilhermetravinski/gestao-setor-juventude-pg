-- CreateTable
CREATE TABLE "Ata" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "Ata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ata" ADD CONSTRAINT "Ata_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
