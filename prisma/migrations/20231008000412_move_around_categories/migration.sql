/*
  Warnings:

  - You are about to drop the column `project_id` on the `CategoryTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryTag" DROP CONSTRAINT "CategoryTag_project_id_fkey";

-- AlterTable
ALTER TABLE "CategoryTag" DROP COLUMN "project_id";

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
