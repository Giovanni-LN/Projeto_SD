-- CreateEnum
CREATE TYPE "statusAssento" AS ENUM ('OCUPADO', 'LIVRE');

-- CreateTable
CREATE TABLE "assentos" (
    "id" SERIAL NOT NULL,
    "positionNumber" INTEGER NOT NULL,
    "status" "statusAssento" NOT NULL DEFAULT 'LIVRE',
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "assentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assento_id" INTEGER NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_assento_id_key" ON "pagamentos"("assento_id");

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_assento_id_fkey" FOREIGN KEY ("assento_id") REFERENCES "assentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
