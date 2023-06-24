import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const url = 'mongodb+srv://stasprykhodko1:Hwsvg4KhDuJKOoKC@cluster0.rmymtql.mongodb.net/?retryWrites=true&w=majority';
  const mongoClient = new MongoClient(url);
  await mongoClient.connect();
  return mongoClient;
}

export async function insertDocument(client, collectionName, document) {
  const dbName = process.env.DB_NAME || 'events';
  const db = client.db(dbName);
  const collection = await db.collection(collectionName)
    .insertOne(document);
  return collection;
}

export async function getAllDocuments(client, collectionName, sort) {
  const dbName = process.env.DB_NAME || 'events';
  const db = client.db(dbName);
  const getCollection = await db.collection(collectionName)
    .find()//find - метод, кот возвр курсор, кот указывает на все документы в коллекции (comments) и если у него нет условия, то он возвр все документы
    .sort(sort)
    .toArray();//метод toArray возвр промис, кот возвр массив документов
  return getCollection;
}