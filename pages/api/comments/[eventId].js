import { MongoClient } from 'mongodb'
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid email address.' });
      client.close();
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      eventId,
      email,
      name,
      text
    };

    let collection;

    try {
      collection = await insertDocument(client, 'comments', newComment);
      newComment._id = collection.insertedId;
      res.status(201).json({ message: 'Signed up!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const getCollection = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: getCollection });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
      return;
    }
  }
  client.close();
}

export default handler;