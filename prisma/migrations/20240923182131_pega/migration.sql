/*
  Warnings:

  - You are about to drop the column `assento_id` on the `pagamentos` table. All the data in the column will be lost.
  - Added the required column `fileira` to the `assentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `assentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessaoId` to the `assentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assentoId` to the `pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_assento_id_fkey";

-- DropIndex
DROP INDEX "pagamentos_assento_id_key";

-- AlterTable
ALTER TABLE "assentos" ADD COLUMN     "fileira" TEXT NOT NULL,
ADD COLUMN     "numero" INTEGER NOT NULL,
ADD COLUMN     "sessaoId" INTEGER NOT NULL,
ALTER COLUMN "positionNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "pagamentos" DROP COLUMN "assento_id",
ADD COLUMN     "assentoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sessoes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assentos" ADD CONSTRAINT "assentos_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_assentoId_fkey" FOREIGN KEY ("assentoId") REFERENCES "assentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
