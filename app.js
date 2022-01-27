var express = require("express");
var app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./queries");
const port = 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/agents", db.getAgents);

app.get("/maps", async function (req, res) {
  const maps = await prisma.map.findMany({});
  res.send(maps);
});

app.get("/maps/:id", async function (req, res) {
  const id = parseInt(req.params.id);

  const map = await prisma.map.findUnique({
    where: {
      id: id,
    },
  });

  // const totalPlayersDB = await prisma.player.count({
  //   where: {
  //     team: {
  //       match: {
  //         mapId: map.id,
  //       },
  //     },
  //   },
  // });

  const players = await prisma.player.groupBy({
    by: ["agentId"],
    where: {
      team: {
        match: {
          mapId: map.id,
        },
      },
    },
    _count: true,
  });

  const totalPlayers = players.reduce(function (acc, obj) {
    return acc + obj._count;
  }, 0);

  const playerWinAmounts = await prisma.player.groupBy({
    by: ["agentId"],
    where: {
      team: {
        didWin: true,
        match: {
          mapId: map.id,
        },
      },
    },
    _count: true,
  });

  const agentOptions = {};
  const agents = await prisma.agent.findMany({});
  agents.forEach((a) => {
    agentOptions[a.id] = a.name;
  });

  const agentPercentages = players.map(function (p) {
    const amountWon = playerWinAmounts.filter((a) => a.agentId === p.agentId)[0]._count;

    return {
      name: agentOptions[p.agentId],
      totalPicks: p._count,
      percentage: p._count / totalPlayers,
      totalWins: amountWon,
      winPercentage: amountWon / p._count,
    };
  });

  const mostCommonComp =
    await prisma.$queryRaw`WITH agentAgg as (select array_agg("Agent"."name" order by "Agent"."name") as agents FROM "Team" INNER JOIN "Match" on "Match".id="Team"."matchId" INNER JOIN "Player" ON "Player"."teamId"="Team".id INNER JOIN "Agent" on "Agent".id="Player"."agentId" where "Match"."mapId"=${map.id} group by "Team".id) select count (agents), agents from agentAgg group by agentAgg.agents order by count(agents) DESC LIMIT 5;`;

  res.json({
    map: map,
    agentPercentages: agentPercentages,
    mostCommonComp: mostCommonComp,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
