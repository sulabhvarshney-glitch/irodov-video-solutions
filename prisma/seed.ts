import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create chapters
  const chapters = await Promise.all([
    prisma.chapter.create({
      data: {
        title: 'Physical Fundamentals of Mechanics',
        description: 'Kinematics, dynamics, work, energy, momentum, and conservation laws in classical mechanics.',
        order: 1,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'The Theory of Fields',
        description: 'Electric and magnetic fields, electromagnetic waves, and fundamental forces.',
        order: 2,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'Thermodynamics and Molecular Physics',
        description: 'Laws of thermodynamics, heat transfer, kinetic theory, and statistical mechanics.',
        order: 3,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'Oscillations and Waves',
        description: 'Harmonic motion, wave propagation, interference, diffraction, and sound.',
        order: 4,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'Optics',
        description: 'Geometrical optics, wave optics, interference, diffraction, and polarization.',
        order: 5,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'Atomic and Nuclear Physics',
        description: 'Atomic structure, nuclear reactions, radioactivity, and quantum mechanics.',
        order: 6,
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'Miscellaneous Problems',
        description: 'Mixed problems covering multiple topics and advanced applications.',
        order: 7,
      },
    }),
  ]);

  console.log(`✅ Created ${chapters.length} chapters`);

  // Create sample problems for Chapter 1 (Mechanics)
  const mechanicsProblems = [
    {
      problemNumber: 1,
      title: 'Motion of a Point Along a Straight Line',
      description: 'A point moves rectilinearly with deceleration whose modulus depends on the velocity v of the particle as w = a√v, where a is a positive constant. At the initial moment the velocity of the point is equal to v₀. What distance will it traverse before it stops? What time will it take to cover that distance?',
      difficulty: 'MEDIUM' as const,
      status: 'COMPLETED' as const,
      youtubeVideoId: 'dQw4w9WgXcQ',
      duration: 480,
    },
    {
      problemNumber: 2,
      title: 'Relative Motion of Two Points',
      description: 'Two points, A and B, move along the x-axis. Their coordinates as functions of time are given by xA = a + bt and xB = c + dt - et², where a, b, c, d, and e are constants. Find the moment when the points have the same velocity.',
      difficulty: 'EASY' as const,
      status: 'COMPLETED' as const,
      youtubeVideoId: 'dQw4w9WgXcQ',
      duration: 360,
    },
    {
      problemNumber: 3,
      title: 'Motion in a Plane',
      description: 'A point moves in the plane xy with velocity v = ai + bxj, where i and j are the unit vectors of the x and y axes, and a and b are constants. At the initial moment t = 0 the point was located at the origin x = y = 0. Find: (a) the equation of the point\'s trajectory y(x); (b) the curvature radius of trajectory as a function of x.',
      difficulty: 'HARD' as const,
      status: 'IN_PROGRESS' as const,
      youtubeVideoId: null,
      duration: null,
    },
    {
      problemNumber: 4,
      title: 'Rotational Motion',
      description: 'A disc rotates with a constant angular acceleration α = 0.50 rad/s². At what time after the motion begins will the total acceleration of a point on the rim be at an angle θ = 60° to the direction of its linear velocity?',
      difficulty: 'MEDIUM' as const,
      status: 'NOT_STARTED' as const,
      youtubeVideoId: null,
      duration: null,
    },
    {
      problemNumber: 5,
      title: 'Conservation of Momentum',
      description: 'A car of mass m starts moving on a horizontal circular path of radius R with tangential acceleration a. The coefficient of friction between the wheels of the car and the ground is μ. Find the maximum power that the engine of the car can develop.',
      difficulty: 'HARD' as const,
      status: 'NOT_STARTED' as const,
      youtubeVideoId: null,
      duration: null,
    },
  ];

  // Create sample problems for Chapter 2 (Fields)
  const fieldsProblems = [
    {
      problemNumber: 1,
      title: 'Electric Field of a Point Charge',
      description: 'Calculate the electric field strength at a distance r from a point charge q. Find the force acting on a test charge q₀ placed at that point.',
      difficulty: 'EASY' as const,
      status: 'COMPLETED' as const,
      youtubeVideoId: 'dQw4w9WgXcQ',
      duration: 300,
    },
    {
      problemNumber: 2,
      title: 'Gauss\'s Law Application',
      description: 'Using Gauss\'s law, find the electric field strength due to an infinite uniformly charged straight line with linear charge density λ.',
      difficulty: 'MEDIUM' as const,
      status: 'IN_PROGRESS' as const,
      youtubeVideoId: null,
      duration: null,
    },
  ];

  // Create sample problems for Chapter 3 (Thermodynamics)
  const thermoProblems = [
    {
      problemNumber: 1,
      title: 'Ideal Gas Law',
      description: 'A vessel of volume V = 30 liters contains ideal gas at a temperature of 0°C. After a portion of the gas has been let out, the pressure in the vessel decreased by Δp = 0.78 atm (the temperature remaining unchanged). Find the mass of the released gas. The gas density under normal conditions is ρ = 1.3 g/l.',
      difficulty: 'MEDIUM' as const,
      status: 'COMPLETED' as const,
      youtubeVideoId: 'dQw4w9WgXcQ',
      duration: 420,
    },
  ];

  // Create problems for each chapter
  const allProblems = [
    ...mechanicsProblems.map(p => ({ ...p, chapterId: chapters[0].id })),
    ...fieldsProblems.map(p => ({ ...p, chapterId: chapters[1].id })),
    ...thermoProblems.map(p => ({ ...p, chapterId: chapters[2].id })),
  ];

  const createdProblems = await Promise.all(
    allProblems.map(problem =>
      prisma.problem.create({
        data: problem,
      })
    )
  );

  console.log(`✅ Created ${createdProblems.length} problems`);

  console.log('🎉 Database seeding completed!');
  console.log('📊 Summary:');
  console.log(`   - Chapters: ${chapters.length}`);
  console.log(`   - Problems: ${createdProblems.length}`);
  console.log(`   - Mechanics: ${mechanicsProblems.length} problems`);
  console.log(`   - Fields: ${fieldsProblems.length} problems`);
  console.log(`   - Thermodynamics: ${thermoProblems.length} problems`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });