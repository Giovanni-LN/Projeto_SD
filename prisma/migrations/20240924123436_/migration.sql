/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `play_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "play_items_nome_key" ON "play_items"("nome");
