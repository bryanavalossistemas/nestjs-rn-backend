import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'better-sqlite3',
  database: configService.get('DATABASE_NAME'),
  synchronize: true,
  autoLoadEntities: true,
});
