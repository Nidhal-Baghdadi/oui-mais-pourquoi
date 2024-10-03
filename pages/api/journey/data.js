
import { prismaClientSingleton } from "@lib/utils/auth";


const prisma = prismaClientSingleton();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await prisma.journey.findMany()
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
