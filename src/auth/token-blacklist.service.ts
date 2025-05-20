import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { createClient } from 'redis';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly redisClient;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    this.logger.debug('TokenBlacklistService initialized');
    this.redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string),
      },
    });
    this.redisClient.connect();
  }

  async addToBlacklist(token: string, expiresIn: number): Promise<void> {
    try {
      const key = `blacklist:${token}`;
      this.logger.debug(
        `Adding token to blacklist. Expires in: ${expiresIn} seconds`,
      );

      await this.redisClient.set(key, '1', {
        EX: expiresIn,
      });

      // Verify the token was added
      const result = await this.redisClient.get(key);
      this.logger.debug(
        `Token blacklist verification - Value: ${result as string}`,
      );

      if (result !== '1') {
        throw new Error('Failed to verify token was added to blacklist');
      }
    } catch (error) {
      this.logger.error(
        `Error adding token to blacklist: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    try {
      const key = `blacklist:${token}`;
      this.logger.debug('Checking if token is blacklisted');

      const result = await this.redisClient.get(key);
      this.logger.debug(
        `Token blacklist check result - Value: ${result as string}`,
      );

      return result === '1';
    } catch (error) {
      this.logger.error(
        `Error checking token blacklist: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }
}
