-- DropForeignKey
ALTER TABLE "Ata" DROP CONSTRAINT "Ata_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Ata" DROP CONSTRAINT "Ata_movimentoPastoralId_fkey";

-- DropForeignKey
ALTER TABLE "Coordenador" DROP CONSTRAINT "Coordenador_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Coordenador" DROP CONSTRAINT "Coordenador_movimentoPastoralId_fkey";

-- DropForeignKey
ALTER TABLE "RedeSocial" DROP CONSTRAINT "RedeSocial_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "RedeSocial" DROP CONSTRAINT "RedeSocial_movimentoPastoralId_fkey";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "Ata_grupoId_idx" ON "Ata"("grupoId");

-- CreateIndex
CREATE INDEX "Ata_movimentoPastoralId_idx" ON "Ata"("movimentoPastoralId");

-- CreateIndex
CREATE INDEX "Coordenador_grupoId_idx" ON "Coordenador"("grupoId");

-- CreateIndex
CREATE INDEX "Coordenador_movimentoPastoralId_idx" ON "Coordenador"("movimentoPastoralId");

-- CreateIndex
CREATE INDEX "RedeSocial_grupoId_idx" ON "RedeSocial"("grupoId");

-- CreateIndex
CREATE INDEX "RedeSocial_movimentoPastoralId_idx" ON "RedeSocial"("movimentoPastoralId");
