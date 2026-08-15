/*
  Warnings:

  - You are about to drop the column `jumlahAnggota` on the `KepalaKeluarga` table. All the data in the column will be lost.
  - You are about to drop the column `namaKepala` on the `KepalaKeluarga` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nik]` on the table `KepalaKeluarga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jenisKelamin` to the `KepalaKeluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `KepalaKeluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `KepalaKeluarga` table without a default value. This is not possible if the table is not empty.
  - Made the column `noKK` on table `KepalaKeluarga` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "KepalaKeluarga" DROP COLUMN "jumlahAnggota",
DROP COLUMN "namaKepala",
ADD COLUMN     "jenisKelamin" TEXT NOT NULL,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "pekerjaan" TEXT,
ADD COLUMN     "pendidikan" TEXT,
ADD COLUMN     "tanggalLahir" TIMESTAMP(3),
ADD COLUMN     "tempatLahir" TEXT,
ADD COLUMN     "umur" INTEGER,
ALTER COLUMN "noKK" SET NOT NULL;

-- CreateTable
CREATE TABLE "AnggotaKeluarga" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "umur" INTEGER,
    "nik" TEXT,
    "pekerjaan" TEXT,
    "pendidikan" TEXT,
    "hubungan" TEXT NOT NULL,
    "kepalaKeluargaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnggotaKeluarga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KepalaKeluarga_nik_key" ON "KepalaKeluarga"("nik");

-- AddForeignKey
ALTER TABLE "AnggotaKeluarga" ADD CONSTRAINT "AnggotaKeluarga_kepalaKeluargaId_fkey" FOREIGN KEY ("kepalaKeluargaId") REFERENCES "KepalaKeluarga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
