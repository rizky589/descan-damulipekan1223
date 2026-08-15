import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.agenda.deleteMany();

  // Sample agenda data
  const agendas = [
    {
      judulKegiatan: 'Evaluasi Pembinaan Desa Cantik',
      tanggalKegiatan: new Date('2025-08-07'),
      waktuMulai: '08:45:00',
      waktuSelesai: '12:00:00',
      tempatKegiatan: 'Aula Kantor Desa Sosopan',
      penyelenggara: 'BPS Kabupaten Padang Lawas',
    },
    {
      judulKegiatan: 'Musyawarah Perencanaan Pembangunan Desa',
      tanggalKegiatan: new Date('2025-08-15'),
      waktuMulai: '09:00:00',
      waktuSelesai: '15:00:00',
      tempatKegiatan: 'Balai Pertemuan Desa Sosopan',
      penyelenggara: 'Pemerintah Desa Sosopan',
    },
    {
      judulKegiatan: 'Pelatihan UMKM Digital',
      tanggalKegiatan: new Date('2025-08-20'),
      waktuMulai: '13:00:00',
      waktuSelesai: '16:00:00',
      tempatKegiatan: 'Kantor Desa Sosopan',
      penyelenggara: 'Dinas Koperasi dan UMKM',
    },
    {
      judulKegiatan: 'Posyandu Balita',
      tanggalKegiatan: new Date('2025-08-25'),
      waktuMulai: '08:00:00',
      waktuSelesai: '11:00:00',
      tempatKegiatan: 'Pos Kesehatan Desa',
      penyelenggara: 'Puskesmas Pembantu',
    },
    {
      judulKegiatan: 'Pertandingan Olahraga Desa',
      tanggalKegiatan: new Date('2025-09-01'),
      waktuMulai: '07:00:00',
      waktuSelesai: '17:00:00',
      tempatKegiatan: 'Lapangan Olahraga Desa',
      penyelenggara: 'Karang Taruna Desa Sosopan',
    }
  ];

  console.log('Seeding agendas...');
  
  for (const agenda of agendas) {
    await prisma.agenda.create({
      data: agenda,
    });
  }

  console.log('Agenda seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
