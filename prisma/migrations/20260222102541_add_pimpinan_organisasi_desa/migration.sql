-- CreateTable
CREATE TABLE "PimpinanOrganisasiDesa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "organisasi" TEXT NOT NULL,
    "periodeMulai" TEXT,
    "periodeSelesai" TEXT,
    "noTelepon" TEXT,
    "alamat" TEXT,
    "fotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PimpinanOrganisasiDesa_pkey" PRIMARY KEY ("id")
);
