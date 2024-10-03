
import { prismaClientSingleton } from "@lib/utils/auth";


const prisma = prismaClientSingleton();

export default async function handler(req, res) {

    const journeyId = req.query.id;
    // const attributes = searchParams.getAll("subject")
    if (req.method === 'GET') {
        try {

            const data = await prisma.journey.findUnique({
                where: {
                    id: journeyId
                }
            })

            const seedCourse = await prisma.course.findUnique({
                where: {
                    id: data.startCourseId
                }
            })
            res.status(200).json(seedCourse);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
