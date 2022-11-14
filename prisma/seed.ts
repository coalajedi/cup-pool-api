import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      name: "John Doe",
      avatarUrl: "https://github.com/coalajedi.png",
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      
      owner: {
        connect: {
          id: user.id
        }
      },

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-11-25T12:00:00.913Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 7,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-11-26T12:00:00.913Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
    }
  });

}

main();