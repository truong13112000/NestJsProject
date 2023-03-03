import './configs/dotenv.config';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import * as express from 'express';
import { createServer, proxy, Response } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { Context } from 'aws-lambda';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let cachedServer: Server;

async function createApp(
  expressApp: express.Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('The MSCM Global')
    .setDescription('The MSCM Global API description')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true,
  });

  return app;
}

const bootstrapDev = async () => {
  const expressApp = express();

  const app = await createApp(expressApp);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  console.info(`Application is running on: ${await app.getUrl()}`);
};
if (process.env.NODE_ENV === 'development') {
  bootstrapDev().finally(() => {
    //
  });
}

const bootstrap = async (): Promise<Server> => {
  const expressApp = express();

  const app = await createApp(expressApp);
  // Add context of Event serverless
  app.use(eventContext());
  await app.init();

  return createServer(expressApp);
};

export const api = async (event: any, context: any): Promise<Response> => {
  // use cached Nestjs server if exists or create one
  // when lambdas are hot, they have tendency to cache runtime variables,
  // so in this case, if we hit one of hot instance, there will be one Nestjs server already bootstrapped
  cachedServer = cachedServer ?? (await bootstrap());
  return await proxy(cachedServer, event, context, 'PROMISE').promise;
};
