-- CreateEnum
CREATE TYPE "statusAssento" AS ENUM ('OCUPADO', 'LIVRE');

-- CreateTable
CREATE TABLE "play_items" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "play_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessoes" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "playItemId" INTEGER NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assentos" (
    "id" SERIAL NOT NULL,
    "positionNumber" TEXT NOT NULL,
    "status" "statusAssento" NOT NULL DEFAULT 'LIVRE',
    "sessaoId" INTEGER NOT NULL,

    CONSTRAINT "assentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessaoId" INTEGER NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssentoToPagamento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "assentos_positionNumber_key" ON "assentos"("positionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_AssentoToPagamento_AB_unique" ON "_AssentoToPagamento"("A", "B");

-- CreateIndex
CREATE INDEX "_AssentoToPagamento_B_index" ON "_AssentoToPagamento"("B");

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_playItemId_fkey" FOREIGN KEY ("playItemId") REFERENCES "play_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assentos" ADD CONSTRAINT "assentos_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssentoToPagamento" ADD CONSTRAINT "_AssentoToPagamento_A_fkey" FOREIGN KEY ("A") REFERENCES "assentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssentoToPagamento" ADD CONSTRAINT "_AssentoToPagamento_B_fkey" FOREIGN KEY ("B") REFERENCES "pagamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
