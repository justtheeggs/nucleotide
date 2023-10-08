/*
  Warnings:

  - Added the required column `reason` to the `ProjectRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectRequests" ADD COLUMN     "accept" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reason" TEXT NOT NULL;
