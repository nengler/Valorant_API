const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const maps = await prisma.map.findMany();
  const ranks = await prisma.rank.findMany();
  const agents = await prisma.agent.findMany();
  const acts = await prisma.act.findMany();
  const ranksLength = ranks.length;
  const actsLength = acts.length;
  const iterations = Array(10000).fill(0);

  for await (const map of maps) {
    for await (const _i of iterations) {
      const randomRankNumber = Math.floor(Math.random() * ranksLength);
      const startingRank = ranks[randomRankNumber];
      let randomRanks = [];
      randomRanks.push(startingRank);
      if (ranks[randomRankNumber + 1] !== undefined) {
        randomRanks.push(ranks[randomRankNumber + 1]);
      }
      if (ranks[randomRankNumber - 1] !== undefined) {
        randomRanks.push(ranks[randomRankNumber - 1]);
      }

      const act = acts[Math.floor(Math.random() * actsLength)];

      const team1Agents = [];
      const team2Agents = [];

      team1Agents.push(getRandomAgent(agents, team1Agents));
      team1Agents.push(getRandomAgent(agents, team1Agents));
      team1Agents.push(getRandomAgent(agents, team1Agents));
      team1Agents.push(getRandomAgent(agents, team1Agents));
      team1Agents.push(getRandomAgent(agents, team1Agents));

      team2Agents.push(getRandomAgent(agents, team2Agents));
      team2Agents.push(getRandomAgent(agents, team2Agents));
      team2Agents.push(getRandomAgent(agents, team2Agents));
      team2Agents.push(getRandomAgent(agents, team2Agents));
      team2Agents.push(getRandomAgent(agents, team2Agents));

      const match = await prisma.match.create({
        data: {
          gameStart: new Date().toISOString(),
          region: "NA",
          mapId: map.id,
          actId: act.id,
        },
      });

      const blueTeam = await prisma.team.create({
        data: {
          matchId: match.id,
          didWin: true,
          teamName: "Blue",
        },
      });

      const redTeam = await prisma.team.create({
        data: {
          matchId: match.id,
          didWin: false,
          teamName: "Red",
        },
      });

      for await (const agent of team1Agents) {
        const agentRandomRank = randomRanks[Math.floor(Math.random() * randomRanks.length)].id;
        await prisma.player.create({
          data: {
            rankId: agentRandomRank,
            agentId: agent.id,
            teamId: blueTeam.id,
          },
        });
      }

      for await (const agent of team2Agents) {
        const agentRandomRank = randomRanks[Math.floor(Math.random() * randomRanks.length)].id;
        await prisma.player.create({
          data: {
            rankId: agentRandomRank,
            agentId: agent.id,
            teamId: redTeam.id,
          },
        });
      }
    }
  }
}

function getRandomAgent(agents, teamAgents) {
  const remainingAgents = agents.filter((a) => !teamAgents.map((t) => t.id).includes(a.id));

  return remainingAgents[Math.floor(Math.random() * remainingAgents.length)];
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
