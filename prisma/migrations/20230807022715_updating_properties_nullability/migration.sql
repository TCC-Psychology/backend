/*
  Warnings:

  - Made the column `clientId` on table `MedicalRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_clientId_fkey";

-- AlterTable
ALTER TABLE "AcademicFormation" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "religion" DROP NOT NULL,
ALTER COLUMN "relationshipStatus" DROP NOT NULL,
ALTER COLUMN "fatherName" DROP NOT NULL,
ALTER COLUMN "fatherOccupation" DROP NOT NULL,
ALTER COLUMN "motherName" DROP NOT NULL,
ALTER COLUMN "motherOccupation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "clientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Psychologist" ALTER COLUMN "certificationNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
