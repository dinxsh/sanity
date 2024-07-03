const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const gameData = {
    name: 'Game Name',
    category: 'Category 1',
    linkedTournaments: ['Tournament 1', 'Tournament 2'],
    profile: 'Profile information',
    gameBannerPhoto: 'URL of game banner photo',
  };

  const existingGame = await prisma.games.findUnique({
    where: { name: gameData.name },
  });

  if (!existingGame) {
    const game = await prisma.games.create({
      data: gameData,
    });

    console.log('Game inserted successfully', game);
  } else {
    console.log('Game already exists', existingGame);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
