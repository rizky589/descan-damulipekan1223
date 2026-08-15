-- CreateTable
CREATE TABLE "ReportData" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "waktuTerbit" TIMESTAMP(3),
    "deskripsi" TEXT,
    "kategori" TEXT,
    "filePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportData_pkey" PRIMARY KEY ("id")
);
