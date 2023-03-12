/*
  Warnings:

  - Added the required column `info` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `info` VARCHAR(191) NOT NULL;
