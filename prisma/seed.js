const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  })

  console.log('User created:', user.email)

  // Subjects based on src/app/utils.js: "Math", "Physics", "AI", "Philosophy", "History", "Geography"

  // 1. AI
  const ai1 = await prisma.course.upsert({ where: { id: 'ai-1' }, update: {}, create: { id: 'ai-1', title: 'Introduction to AI', content: 'History and basic concepts.', status: 'PUBLISHED', authorId: user.id } })
  const ai2 = await prisma.course.upsert({ where: { id: 'ai-2' }, update: {}, create: { id: 'ai-2', title: 'Neural Networks', content: 'Deep dive into backpropagation.', status: 'PUBLISHED', authorId: user.id } })
  const ai3 = await prisma.course.upsert({ where: { id: 'ai-3' }, update: {}, create: { id: 'ai-3', title: 'Large Language Models', content: 'Transformers and LLMs.', status: 'PUBLISHED', authorId: user.id } })

  // 2. Math
  const math1 = await prisma.course.upsert({ where: { id: 'math-1' }, update: {}, create: { id: 'math-1', title: 'Linear Algebra', content: 'Vectors and matrices.', status: 'PUBLISHED', authorId: user.id } })
  const math2 = await prisma.course.upsert({ where: { id: 'math-2' }, update: {}, create: { id: 'math-2', title: 'Calculus I', content: 'Derivatives and integrals.', status: 'PUBLISHED', authorId: user.id } })

  // 3. Physics
  const phys1 = await prisma.course.upsert({ where: { id: 'phys-1' }, update: {}, create: { id: 'phys-1', title: 'Classical Mechanics', content: 'Newtonian motion.', status: 'PUBLISHED', authorId: user.id } })
  const phys2 = await prisma.course.upsert({ where: { id: 'phys-2' }, update: {}, create: { id: 'phys-2', title: 'Quantum Physics', content: 'Introduction to subatomic particles.', status: 'PUBLISHED', authorId: user.id } })

  // 4. Philosophy
  const phil1 = await prisma.course.upsert({ where: { id: 'phil-1' }, update: {}, create: { id: 'phil-1', title: 'Ethics 101', content: 'Moral philosophy and decision making.', status: 'PUBLISHED', authorId: user.id } })
  const phil2 = await prisma.course.upsert({ where: { id: 'phil-2' }, update: {}, create: { id: 'phil-2', title: 'Epistemology', content: 'The study of knowledge and belief.', status: 'PUBLISHED', authorId: user.id } })

  // 5. History
  const hist1 = await prisma.course.upsert({ where: { id: 'hist-1' }, update: {}, create: { id: 'hist-1', title: 'World War II', content: 'A global conflict summary.', status: 'PUBLISHED', authorId: user.id } })
  const hist2 = await prisma.course.upsert({ where: { id: 'hist-2' }, update: {}, create: { id: 'hist-2', title: 'Industrial Revolution', content: 'Impact on modern society.', status: 'PUBLISHED', authorId: user.id } })

  // 6. Geography
  const geo1 = await prisma.course.upsert({ where: { id: 'geo-1' }, update: {}, create: { id: 'geo-1', title: 'Plate Tectonics', content: 'Understanding earth movements.', status: 'PUBLISHED', authorId: user.id } })
  const geo2 = await prisma.course.upsert({ where: { id: 'geo-2' }, update: {}, create: { id: 'geo-2', title: 'Climatology', content: 'Weather patterns and global warming.', status: 'PUBLISHED', authorId: user.id } })

  // Prerequisites (using upsert to avoid duplicates)
  const prerequisites = [
    { courseId: 'ai-2', prerequisiteId: 'ai-1' },
    { courseId: 'ai-3', prerequisiteId: 'ai-2' },
    { courseId: 'math-2', prerequisiteId: 'math-1' },
    { courseId: 'phys-2', prerequisiteId: 'math-2' },
  ]

  for (const pre of prerequisites) {
    await prisma.prerequisite.upsert({
      where: { courseId_prerequisiteId: pre },
      update: {},
      create: pre
    })
  }

  // Journeys
  const subjects = [
    { id: 'j-ai', subject: 'AI', startCourseId: 'ai-1' },
    { id: 'j-math', subject: 'Math', startCourseId: 'math-1' },
    { id: 'j-phys', subject: 'Physics', startCourseId: 'phys-1' },
    { id: 'j-phil', subject: 'Philosophy', startCourseId: 'phil-1' },
    { id: 'j-hist', subject: 'History', startCourseId: 'hist-1' },
    { id: 'j-geo', subject: 'Geography', startCourseId: 'geo-1' },
  ]

  for (const j of subjects) {
    await prisma.journey.upsert({
      where: { id: j.id },
      update: { subject: j.subject, startCourseId: j.startCourseId },
      create: { id: j.id, userId: user.id, subject: j.subject, startCourseId: j.startCourseId }
    })
  }

  console.log('Seeding finished successfully with all 6 subjects.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
