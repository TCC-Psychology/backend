import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await targetAudienceSeed();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function targetAudienceSeed() {
  const targetAudiences: Prisma.TargetAudienceCreateInput[] = [
    {
      title: 'CRIANÇAS',
    },
    {
      title: 'ADOLESCENTES',
    },
    {
      title: 'ADULTOS',
    },
    {
      title: 'IDOSOS',
    },
  ];

  const segments: Prisma.SegmentOfActivityCreateInput[] = [
    {
      title: 'Terapia em grupo e oficinas',
    },
    {
      title: 'Psicoterapia e aconselhamento',
    },
    {
      title: 'Tratamento de abuso de substâncias e dependência',
    },
    {
      title: 'Aconselhamento de carreira e avaliação vocacional',
    },
    {
      title: 'Psicologia do esporte e aprimoramento de performance',
    },
    {
      title: 'Avaliação psicológica e testitleem',
    },
    {
      title: 'Terapia familiar e de casal',
    },
    {
      title: 'Psicologia infantil e orientação parental',
    },
    {
      title: 'Reabilitação neuropsicológica',
    },
    {
      title: 'Aconselhamento sobre luto e perda',
    },
  ];

  for (const targetAudience of targetAudiences) {
    await prisma.targetAudience.create({
      data: {
        title: targetAudience.title,
      },
    });
  }

  for (const segmentOfActivity of segments) {
    await prisma.segmentOfActivity.create({
      data: {
        title: segmentOfActivity.title,
      },
    });
  }
}
