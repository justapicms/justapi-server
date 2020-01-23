import { Db } from 'mongodb'

export class MongoDbManger {

    constructor(private db: Db) {

    }

    insertOne(collection: string, obj: any) {
        return this.db.collection(collection).insertOne(obj)
    }
}