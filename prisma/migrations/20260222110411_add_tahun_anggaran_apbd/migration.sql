-- CreateTable
CREATE TABLE "TahunAnggaranAPBD" (
    "id" TEXT NOT NULL,
    "tahun" TEXT NOT NULL,
    "namaPetugasKeuangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TahunAnggaranAPBD_pkey" PRIMARY KEY ("id")
);
