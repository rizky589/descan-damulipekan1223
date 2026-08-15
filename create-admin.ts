import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Try with explicit connection string
const connectionUrl = "postgresql://postgres.pdnhtonlddgazswrywha:Admindesa%40123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=15&sslmode=require";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('Connecting to database...');
  
  const email = 'admin@desa.com';
  const password = 'admin123';
  const name = 'Administrator';
  const role = 'admin';
  
  try {
    // Test connection first
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Connection successful!');
    
    const existing = await prisma.user.findUnique({ where: { email } });
    
    if (existing) {
      console.log('\nUser already exists:', existing.email, '| Role:', existing.role);
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      console.log('Password updated!');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
      });
      console.log('User created:', user.email);
    }
    
    const allUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    
    console.log('\n=== ALL USERS ===');
    allUsers.forEach(u => console.log(`- ${u.email} | ${u.name} | role: ${u.role}`));
    
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Email:', email);
    console.log('Password:', password);
    
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main().finally(() => prisma.$disconnect());
