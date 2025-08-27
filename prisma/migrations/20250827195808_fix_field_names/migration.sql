/*
  Warnings:

  - You are about to drop the column `createdAt` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `validatedAt` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `gyms` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."check_ins" DROP COLUMN "createdAt",
DROP COLUMN "validatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validate_aAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."gyms" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
