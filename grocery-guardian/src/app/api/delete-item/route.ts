import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma"


export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
      const itemId = parseInt(id as string, 10);
      const item = await prisma.foodItem.delete({
        where: { id: itemId },
      });

      res.status(200).json({ message: `Item with id ${itemId} deleted successfully` });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

