import { writeFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const writeFilePromise = promisify(writeFile)

const ENTITIES = 'entities'

export class FilesConfigManager {

  constructor(
    private cfgDir: string
  ) {

  }

  async writeEntity(name: string, data: any) {
    return writeFilePromise(join(this.cfgDir, ENTITIES, name), JSON.stringify(data))
  }
}