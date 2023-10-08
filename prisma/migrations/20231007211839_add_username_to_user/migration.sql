-- CreateEnum
CREATE TYPE "UserOnboarding" AS ENUM ('SetUsername', 'SetCategories', 'SetTags');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboarding" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "onboarding_state" "UserOnboarding" NOT NULL DEFAULT 'SetUsername',
ADD COLUMN     "username" TEXT;
