import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
async function bootstrap(){ dotenv.config(); const app = await NestFactory.create(AppModule,{cors:true}); const port = process.env.PORT?parseInt(process.env.PORT):3001; await app.listen(port); console.log(`Backend running on http://localhost:${port}`);} bootstrap();
