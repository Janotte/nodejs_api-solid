/*
  Warnings:

  - You are about to drop the column `validate_aAt` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."check_ins" DROP COLUMN "validate_aAt",
ADD COLUMN     "validate_at" TIMESTAMP(3);
