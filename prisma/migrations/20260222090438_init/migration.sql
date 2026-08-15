-- CreateTable
CREATE TABLE "Hukum" (
    "id" TEXT NOT NULL,
    "namaKategori" TEXT NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hukum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KegiatanDesa" (
    "id" TEXT NOT NULL,
    "judulKegiatan" TEXT NOT NULL,
    "tanggalKegiatan" TIMESTAMP(3) NOT NULL,
    "waktuMulai" TEXT NOT NULL,
    "waktuSelesai" TEXT NOT NULL,
    "tempatKegiatan" TEXT NOT NULL,
    "penyelenggara" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KegiatanDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KepalaKeluarga" (
    "id" TEXT NOT NULL,
    "namaKepala" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noKK" TEXT,
    "jumlahAnggota" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KepalaKeluarga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KepalaKeluarga_noKK_key" ON "KepalaKeluarga"("noKK");
