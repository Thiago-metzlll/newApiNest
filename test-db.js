
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Conexão com o banco de dados realizada com sucesso!');
        const usersCount = await prisma.user.count();
        console.log(`📊 Total de usuários no banco: ${usersCount}`);
    } catch (e) {
        console.error('❌ Erro ao conectar ao banco de dados:');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
