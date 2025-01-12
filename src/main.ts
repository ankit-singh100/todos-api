import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //create app instance
  const app = await NestFactory.create(AppModule);

  //register middleware here
  app.useGlobalPipes(new ValidationPipe());

  //application is running on given port, 3000
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
