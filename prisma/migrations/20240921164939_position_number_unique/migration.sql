/*
  Warnings:

  - A unique constraint covering the columns `[positionNumber]` on the table `assentos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "assentos_positionNumber_key" ON "assentos"("positionNumber");
