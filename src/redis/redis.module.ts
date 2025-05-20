import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { TokenBlacklistService } from '../auth/token-blacklist.service';
import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisModule');
        const host = process.env.REDIS_HOST;
        const port = parseInt(process.env.REDIS_PORT as string);

        logger.debug(`Connecting to Redis at ${host}:${port}`);

        // Create Redis client
        const redisClient = createClient({
          socket: {
            host,
            port,
            reconnectStrategy: (retries) => {
              logger.debug(`Redis reconnecting... Attempt ${retries}`);
              return Math.min(retries * 100, 3000);
            },
          },
        });

        // Handle Redis events
        redisClient.on('error', (err) =>
          logger.error('Redis Client Error:', err),
        );
        redisClient.on('connect', () => logger.debug('Redis Client Connected'));
        redisClient.on('ready', () => logger.debug('Redis Client Ready'));

        // Connect to Redis
        await redisClient.connect();

        return {
          store: await redisStore({
            client: redisClient,
            ttl: 0,
            prefix: 'blacklist:',
          }),
          ttl: 0,
          max: 100,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TokenBlacklistService],
  exports: [CacheModule, TokenBlacklistService],
})
export class RedisModule {}
