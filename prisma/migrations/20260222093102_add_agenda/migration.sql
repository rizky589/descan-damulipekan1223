-- CreateTable
CREATE TABLE "Agenda" (
    "id" TEXT NOT NULL,
    "judulKegiatan" TEXT NOT NULL,
    "tanggalKegiatan" TIMESTAMP(3) NOT NULL,
    "waktuMulai" TEXT NOT NULL,
    "waktuSelesai" TEXT NOT NULL,
    "tempatKegiatan" TEXT NOT NULL,
    "penyelenggara" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);
