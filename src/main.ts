import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  //create app instance
  const app = await NestFactory.create(AppModule);

  //register middleware here
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  //application is running on given port, 3000
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
