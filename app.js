var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const db = require("./queries");
const port = 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  const { id } = req.params;

  const map = await prisma.map.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const totalPlayers = await prisma.player.count({
    where: {
      team: {
        match: {
          mapId: map.id,
        },
      },
    },
  });

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

  const agentOptions = {};
  const agents = await prisma.agent.findMany({});
  agents.forEach((a) => {
    agentOptions[a.id] = a.name;
  });

  const agentPercentages = players.map(function (p) {
    return {
      name: agentOptions[p.agentId],
      totalPicks: p._count,
      percentage: ((p._count / totalPlayers) * 100).toFixed(2),
    };
  });

  res.json({ map: map, agentPercentages: agentPercentages, totalPlayers: totalPlayers });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
