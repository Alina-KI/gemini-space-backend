import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  //await app.listen(8080);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
}

start();
