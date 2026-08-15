/*
  Warnings:

  - You are about to drop the column `alamat` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `fotoUrl` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `jabatan` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `noTelepon` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `organisasi` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `periodeMulai` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - You are about to drop the column `periodeSelesai` on the `PimpinanOrganisasiDesa` table. All the data in the column will be lost.
  - Added the required column `posisi` to the `PimpinanOrganisasiDesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PimpinanOrganisasiDesa" DROP COLUMN "alamat",
DROP COLUMN "fotoUrl",
DROP COLUMN "jabatan",
DROP COLUMN "noTelepon",
DROP COLUMN "organisasi",
DROP COLUMN "periodeMulai",
DROP COLUMN "periodeSelesai",
ADD COLUMN     "fokus" TEXT,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "pengalaman" TEXT,
ADD COLUMN     "periodeAkhir" TEXT,
ADD COLUMN     "periodeAwal" TEXT,
ADD COLUMN     "posisi" TEXT NOT NULL;
