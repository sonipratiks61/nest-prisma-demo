/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `OrderHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `OrderHistory_status_key` ON `OrderHistory`(`status`);
