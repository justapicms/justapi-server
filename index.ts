import { JustAPIServer } from './src/server'
import { FilesConfigManager } from './src/ConfigManager'

new JustAPIServer(new FilesConfigManager(__dirname + '/config')).start()