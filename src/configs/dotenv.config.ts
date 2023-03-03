import { existsSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';

const filePath = resolve(process.cwd(), '.env');
if (existsSync(filePath)) {
  config({ path: filePath });
}
