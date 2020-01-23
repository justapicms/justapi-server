import { Context } from "koa";

import { MongoDbManger } from "./DbManager";


export class ContentCtrl {
    constructor(private dbManager: MongoDbManger) {

    }

    post = async (ctx: Context, entity: string, data: any) => {
        await this.dbManager.insertOne(entity, data)

        ctx.status = 200
    }
} 