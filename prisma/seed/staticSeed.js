const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.agent.createMany({
    data: [
      {
        uuid: "5f8d3a7f-467b-97f3-062c-13acf203c006",
        name: "Breach",
      },
      {
        uuid: "f94c3b30-42be-e959-889c-5aa313dba261",
        name: "Raze",
      },
      {
        uuid: "6f2a04ca-43e0-be17-7f36-b3908627744d",
        name: "Skye",
      },
      {
        uuid: "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
        name: "Cypher",
      },
      {
        uuid: "320b2a48-4d9b-a075-30f1-1f93a9b638fa",
        name: "Sova",
      },
      {
        uuid: "1e58de9c-4950-5125-93e9-a0aee9f98746",
        name: "Killjoy",
      },
      {
        uuid: "707eab51-4836-f488-046a-cda6bf494859",
        name: "Viper",
      },
      {
        uuid: "eb93336a-449b-9c1b-0a54-a891f7921d69",
        name: "Phoenix",
      },
      {
        uuid: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
        name: "Brimstone",
      },
      {
        uuid: "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
        name: "Yoru",
      },
      {
        uuid: "569fdd95-4d10-43ab-ca70-79becc718b46",
        name: "Sage",
      },
      {
        uuid: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
        name: "Reyna",
      },
      {
        uuid: "8e253930-4c05-31dd-1b6c-968525494517",
        name: "Omen",
      },
      {
        uuid: "add6443a-41bd-e414-f6ad-e58d267f4e95",
        name: "Jett",
      },
    ],
  });

  await prisma.map.createMany({
    data: [
      {
        uuid: "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
        name: "Ascent",
      },
      {
        uuid: "d960549e-485c-e861-8d71-aa9d1aed12a2",
        name: "Split",
      },
      {
        uuid: "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba",
        name: "Bind",
      },
      {
        uuid: "e2ad5c54-4114-a870-9641-8ea21279579a",
        name: "Icebox",
      },
      {
        uuid: "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047",
        name: "Haven",
      },
    ],
  });

  await prisma.episode.createMany({
    data: [
      {
        uuid: "fcf2c8f4-4324-e50b-2e23-718e4a3ab046",
        name: "E1",
      },
      {
        uuid: "71c81c67-4fae-ceb1-844c-aab2bb8710fa",
        name: "E2",
      },
      {
        uuid: "97b39124-46ce-8b55-8fd1-7cbf7ffe173f",
        name: "E3",
      },
      {
        uuid: "808202d6-4f2b-a8ff-1feb-b3a0590ad79f",
        name: "E4",
      },
    ],
  });

  await prisma.act.createMany({
    data: [
      {
        uuid: "3f61c772-4560-cd3f-5d3f-a7ab5abda6b3",
        name: "A1",
        episodeId: 1,
      },
      {
        uuid: "0530b9c4-4980-f2ee-df5d-09864cd00542",
        name: "A2",
        episodeId: 1,
      },
      {
        uuid: "46ea6166-4573-1128-9cea-60a15640059b",
        name: "A3",
        episodeId: 1,
      },
      {
        uuid: "97b6e739-44cc-ffa7-49ad-398ba502ceb0",
        name: "A1",
        episodeId: 2,
      },
      {
        uuid: "ab57ef51-4e59-da91-cc8d-51a5a2b9b8ff",
        name: "A2",
        episodeId: 2,
      },
      {
        uuid: "52e9749a-429b-7060-99fe-4595426a0cf7",
        name: "A3",
        episodeId: 2,
      },
      {
        uuid: "2a27e5d2-4d30-c9e2-b15a-93b8909a442c",
        name: "A1",
        episodeId: 3,
      },
      {
        uuid: "4cb622e1-4244-6da3-7276-8daaf1c01be2",
        name: "A2",
        episodeId: 3,
      },
      {
        uuid: "a16955a5-4ad0-f761-5e9e-389df1c892fb",
        name: "A3",
        episodeId: 3,
      },
      {
        uuid: "573f53ac-41a5-3a7d-d9ce-d6a6298e5704",
        name: "A1",
        episodeId: 4,
      },
      {
        uuid: "d929bc38-4ab6-7da4-94f0-ee84f8ac141e",
        name: "A2",
        episodeId: 4,
      },
      {
        uuid: "3e47230a-463c-a301-eb7d-67bb60357d4f",
        name: "A3",
        episodeId: 4,
      },
    ],
  });

  await prisma.rank.createMany({
    data: [
      {
        uuid: "3",
        name: "Iron 1",
      },
      {
        uuid: "4",
        name: "Iron 2",
      },
      {
        uuid: "5",
        name: "Iron 3",
      },
      {
        uuid: "6",
        name: "Bronze 1",
      },
      {
        uuid: "7",
        name: "Bronze 2",
      },
      {
        uuid: "8",
        name: "Bronze 3",
      },
      {
        uuid: "9",
        name: "Silver 1",
      },
      {
        uuid: "10",
        name: "Silver 2",
      },
      {
        uuid: "11",
        name: "Silver 3",
      },
      {
        uuid: "12",
        name: "Gold 1",
      },
      {
        uuid: "13",
        name: "Gold 2",
      },
      {
        uuid: "14",
        name: "Gold 3",
      },
      {
        uuid: "15",
        name: "Plat 1",
      },
      {
        uuid: "16",
        name: "Plat 2",
      },
      {
        uuid: "17",
        name: "Plat 3",
      },
      {
        uuid: "18",
        name: "Diamond 1",
      },
      {
        uuid: "19",
        name: "Diamond 2",
      },
      {
        uuid: "20",
        name: "Diamond 3",
      },
      {
        uuid: "21",
        name: "Immortal 1",
      },
      {
        uuid: "22",
        name: "Immortal 2",
      },
      {
        uuid: "23",
        name: "Immortal 3",
      },
      {
        uuid: "24",
        name: "Radiant",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
