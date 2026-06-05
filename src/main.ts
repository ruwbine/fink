import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );

  app.flushLogs();

  app.enableVersioning({
    type: VersioningType.URI,
  });
  // DOCUMENTATION
  const documentConfig = new DocumentBuilder()
    .setTitle('Mindpslore API Documentation')
    .setDescription('API documentation for Mindsplore Project')
    .setVersion('1.0')
    .addTag('Mindpslore')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});
