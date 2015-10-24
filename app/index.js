import recluster from 'recluster';
import { join } from 'path';
import { config } from '../package';

const env = process.env.NODE_ENV || 'development';
const workers = env !== 'development'
  ? process.env.WORKERS || config.workers
  : 1;

const cluster = recluster(join(__dirname, 'worker'), {workers: workers});
cluster.run();

export default cluster;
