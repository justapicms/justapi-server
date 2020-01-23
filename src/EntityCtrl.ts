import { Context } from "koa";

import { FilesConfigManager } from "./ConfigManager";


export class EntityCtrl {
    constructor(private cfgManager: FilesConfigManager) {

    }

    create = async (ctx: Context, schema: any) => {
        await this.cfgManager.writeEntity('Entity1', schema)

        ctx.status = 200
    }
} 