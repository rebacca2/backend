import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
require('dotenv').config() 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: "http://localhost:3000", // 允许所有来源，也可以设置为特定的URL或数组
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204, // 对于预检请求的OPTIONS方法，返回状态码204
    credentials: true, // 允许发送Cookie
  };
  app.enableCors(corsOptions)
  await app.listen(process.env.PORT ?? 8082);
}
bootstrap();
