import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { product1 } from './products/product1';
import { product2 } from './products/product2';

async function bootstrap() {
  product1();
  product2();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
