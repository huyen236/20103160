import { DevConfig } from './dev.config';
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  dev: DevConfig,
}
export const APP_CONFIG = config[process.env.NODE_ENV];
