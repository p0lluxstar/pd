import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as envConfig } from 'dotenv';

envConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT_BACKEND || '4000';
  
  await app.listen(PORT, () =>
    console.log(
      `\x1b[35mApplication is currently running on port: ${PORT}\x1b[0m`,
    ),
  );
}
bootstrap();
