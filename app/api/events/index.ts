import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, title, description, categoryId, startDateTime, endDateTime, location, price, isFree, url, imageUrl } = req.body;

    console.log('Received userId:', userId);

    if (!userId || !title || !startDateTime || !endDateTime) {
      console.error('Missing required fields:', { userId, title, startDateTime, endDateTime });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newEvent = await prisma.event.create({
        data: {
          userId,
          title,
          description,
          categoryId,
          startDateTime: new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          location,
          price,
          isFree,
          url,
          imageUrl,
        },
      });

      console.log('Event created:', newEvent);

      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
