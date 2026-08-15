import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔗 Menghubungkan ke database...');

  // Test koneksi
  await prisma.$queryRaw`SELECT 1`;
  console.log('✅ Koneksi berhasil!\n');

  const email = 'admin@desa.com';
  const password = 'Admin123!';

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log('🔄 Password admin direset!');
  } else {
    await prisma.user.create({
      data: {
        name: 'Administrator',
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('✅ User admin dibuat!');
  }

  const allUsers = await prisma.user.findMany({
    select: { name: true, email: true, role: true },
  });

  console.log('\n📋 Semua user di database:');
  allUsers.forEach(u =>
    console.log(`  - ${u.email} | ${u.name} | role: ${u.role}`)
  );

  console.log('\n🎉 ================================');
  console.log('   LOGIN CREDENTIALS BACKEND:');
  console.log('   Email    : admin@desa.com');
  console.log('   Password : Admin123!');
  console.log('   URL      : https://descan-konoha.vercel.app/login');
  console.log('================================\n');
}

main()
  .catch(e => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
