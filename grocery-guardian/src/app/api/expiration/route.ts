import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { name } = req.query;  // Name is obtained from the URL parameter

    try {
      const foodExpiration = await prisma.expiration.findUnique({
        where: { name }
      });

      if (!foodExpiration) {
        return res.status(404).json({ message: "Food item not found." });
      }

      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + foodExpiration.expirationTime);

      res.status(200).json({
        name: name,
        expirationDate: expirationDate.toISOString()
      });
    } catch (error) {
      console.error("Failed to fetch expiration data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
