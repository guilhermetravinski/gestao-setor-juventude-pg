-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordenador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
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
    "avatarUrl" TEXT,
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
    "avatarUrl" TEXT,
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

-- CreateTable
CREATE TABLE "CoordenadorDiocesano" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paroquia" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "representacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoordenadorDiocesano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "publicoAlvo" TEXT NOT NULL,
    "organizador" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Coordenador_grupoId_idx" ON "Coordenador"("grupoId");

-- CreateIndex
CREATE INDEX "Coordenador_movimentoPastoralId_idx" ON "Coordenador"("movimentoPastoralId");

-- CreateIndex
CREATE INDEX "RedeSocial_grupoId_idx" ON "RedeSocial"("grupoId");

-- CreateIndex
CREATE INDEX "RedeSocial_movimentoPastoralId_idx" ON "RedeSocial"("movimentoPastoralId");

-- CreateIndex
CREATE INDEX "Ata_grupoId_idx" ON "Ata"("grupoId");

-- CreateIndex
CREATE INDEX "Ata_movimentoPastoralId_idx" ON "Ata"("movimentoPastoralId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
