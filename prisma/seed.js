const { PrismaClient, GameType } = require('@prisma/client');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Import the Mongoose User model
const UserModel = require('../model/User');
const { TeamModel } = require('../model/Team');

async function connectToMongoDB() {
  await mongoose.connect(process.env.DATABASE_URL);
}

async function main() {
  await connectToMongoDB();

  // Seed Games
  const gameData = [
    {
      name: 'BGMI',
      category: 'Battle Royale',
      profile: 'Battlegrounds Mobile India',
      gameBannerPhoto: 'https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp',
    },
    {
      name: 'Call of Duty Mobile',
      category: 'FPS',
      profile: 'Mobile version of the popular Call of Duty franchise',
      gameBannerPhoto: 'https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp',
    },
  ];

  for (const game of gameData) {
    const existingGame = await prisma.games.findUnique({
      where: { name: game.name },
    });

    if (!existingGame) {
      await prisma.games.create({ data: game });
      console.log(`Game ${game.name} inserted successfully`);
    } else {
      console.log(`Game ${game.name} already exists`);
    }
  }

  // Seed Users (Mongoose)
  const userData = [
    {
      username: 'player1',
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Passionate gamer',
      password: await bcrypt.hash('password123', 10),
      verifyCode: '123456',
      verifyCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
    {
      username: 'player2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Pro gamer',
      password: await bcrypt.hash('password456', 10),
      verifyCode: '654321',
      verifyCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  ];

  for (const user of userData) {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      await UserModel.create(user);
      console.log(`User ${user.username} inserted successfully`);
    } else {
      console.log(`User ${user.username} already exists`);
    }
  }

  // Seed Organizers (prisma)
  const organizerData = [
    {
      orgName: 'Epic Gaming',
      orgEmail: 'epic@gaming.com',
      description: 'Professional esports organization',
      bannerPhoto: 'https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp',
    },
    {
      orgName: 'Pro Tournaments',
      orgEmail: 'info@protournaments.com',
      description: 'Leading tournament organizer',
      bannerPhoto: 'https://media.battlexo.com/tournament/668292838ab430dcee21f257/banner/icon/29fd717a-2be9-4c19-8394-865ff112a15a.webp',
    },
  ];

  for (const organizer of organizerData) {
    const existingOrganizer = await prisma.organizer.findUnique({
      where: { orgEmail: organizer.orgEmail },
    });

    if (!existingOrganizer) {
      await prisma.organizer.create({ data: organizer });
      console.log(`Organizer ${organizer.orgName} inserted successfully`);
    } else {
      console.log(`Organizer ${organizer.orgName} already exists`);
    }
  }

  // Seed Tournaments (prisma)
  const tournamentData = [
    {
      tournamentName: 'BGMI Pro League',
      tournamentDates: {
        started: new Date('2024-08-01'),
        ended: new Date('2024-08-15'),
      },
      gameType: GameType.SQUAD,
      teamSize: 4,
      slots: 16,
      prize: [{ rank: 1, amount: 10000 }, { rank: 2, amount: 5000 }, { rank: 3, amount: 2500 }],
      rules: 'Standard BGMI rules apply',
      email: 'bgmi@protournaments.com',
    },
    {
      tournamentName: 'CoD Mobile Championship',
      tournamentDates: {
        started: new Date('2024-09-01'),
        ended: new Date('2024-09-10'),
      },
      gameType: GameType.SOLO,
      teamSize: 1,
      slots: 32,
      prize: [{ rank: 1, amount: 5000 }, { rank: 2, amount: 2500 }, { rank: 3, amount: 1000 }],
      rules: 'Standard CoD Mobile rules apply',
      email: 'codm@epicgaming.com',
    },
  ];

  for (const tournament of tournamentData) {
    const existingTournament = await prisma.tournament.findFirst({
      where: { tournamentName: tournament.tournamentName },
    });

    if (!existingTournament) {
      const game = await prisma.games.findFirst({
        where: { name: tournament.tournamentName.includes('BGMI') ? 'BGMI' : 'Call of Duty Mobile' },
      });
      const organizer = await prisma.organizer.findFirst({
        where: { orgName: tournament.email.includes('protournaments') ? 'Pro Tournaments' : 'Epic Gaming' },
      });

      if (game && organizer) {
        await prisma.tournament.create({
          data: {
            ...tournament,
            gameId: game.id,
            organizerId: organizer.id,
          },
        });
        console.log(`Tournament ${tournament.tournamentName} inserted successfully`);
      } else {
        console.log(`Failed to create tournament ${tournament.tournamentName}: Game or Organizer not found`);
      }
    } else {
      console.log(`Tournament ${tournament.tournamentName} already exists`);
    }
  }


  // seed Team (mongoose)
  const teamData = [
    {
      image: 'https://example.com/image1.jpg',
      teamname: 'Epic Warriors',
      game: 'League of Legends',
      role: 'ADC',
      rank: 'Diamond',
      server: 'NA',
      language: 'English',
      players: ['Player1', 'Player2'],
      requests: ['No toxic behavior', 'Must have a mic']
    },
    {
      image: 'https://example.com/image2.jpg',
      teamname: 'Pro Gamers',
      game: 'CS:GO',
      role: 'In-Game Leader',
      rank: 'Global Elite',
      server: 'EU',
      language: 'English',
      players: ['Player3', 'Player4'],
      requests: ['Good communication skills', 'Must be punctual']
    }
  ];

  for (const team of teamData) {
    const existingTeam = await TeamModel.findOne({ teamname: team.teamname });

    if (!existingTeam) {
      await TeamModel.create(team);
      console.log(`Team ${team.teamname} inserted successfully`);
    } else {
      console.log(`Team ${team.teamname} already exists`);
    }
  }


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await mongoose.disconnect();
  });