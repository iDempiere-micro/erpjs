import { Controller, Get } from '@nestjs/common';
import { AES } from 'crypto-ts';

@Controller('config')
export class ConfigController {
  @Get('database')
  async databaseConfig() {
    const databaseUrl = AES.encrypt(process.env.DATABASE_URL, process.env.SECRET).toString();
    return { databaseUrl };
  }
}
