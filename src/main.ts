import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as fs from 'fs';
import * as path from 'path';
dotenv.config()

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(process.cwd(), 'myKey.key')),
    cert: fs.readFileSync(path.resolve(process.cwd(), 'mycert.crt')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
