const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config();

const uri = process.env.DATABASE_LINK

class Database {
    
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    this.db = null
  }

  async connect() {
    try {
      await this.client.connect()
      this.db = this.client.db('Items')
    } catch (error) {
      console.error('Error connecting to the database', error)
      throw error
    }
  }

  async close() {
    await this.client.close()
  }

  async insertDocument(collectionName, document) {
    try {
      const result = await this.db
        .collection(collectionName)
        .insertOne(document)
      console.log(`Inserted document with ID ${result.insertedId}`)
      return result.insertedId
    } catch (error) {
      console.error('Error inserting document:', error)
      throw error // You might want to handle or log the error appropriately
    }
  }

  async savePin(collectionName, document) {
    try {
      const result = await this.db
        .collection(collectionName)
        .insertOne(document)
      console.log(`Inserted document with ID ${result.insertedId}`)
      return result.insertedId
    } catch (error) {
      console.error('Error inserting document:', error)
      throw error
    }
  }

  async findDocuments(collectionName, query) {
    try {
      const result = await this.db
        .collection(collectionName)
        .find(query).toArray();
      console.log('Found saved Pins')
      return result
    } catch (error) {
      console.error('Error finding documents:', error);
      throw error;
    }
  }

  async deleteSavedPin(collectionName, query) {
    try {
      const result = await this.db
        .collection(collectionName)
        .deleteOne(query)
      console.log('Deleted Pin')
      return result
    } catch (error) {
      console.error('Error finding documents:', error);
      throw error;
    }
  }

  // Add other database-related methods here
}

module.exports = Database
