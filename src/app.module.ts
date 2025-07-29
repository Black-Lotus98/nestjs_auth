import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from './redis/redis.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DriversModule } from './drivers/drivers.module';
import { EmploymentsModule } from './employments/employments.module';
import { PhonesModule } from './phones/phones.module';
import { DocumentTypesModule } from './document-types/document-types.module';
import { DocumentsModule } from './documents/documents.module';
import { InspectionDetailsModule } from './inspection-details/inspection-details.module';
import { TailingRecordsModule } from './tailing-records/tailing-records.module';
import { TailingGradesModule } from './tailing-grades/tailing-grades.module';
import { SeederModule } from './database/seeds/seeder.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhonesModule,
    DriversModule,
    RolesModule,
    PermissionsModule,
    RedisModule,
    DbModule,
    DocumentTypesModule,
    DocumentsModule,
    InspectionDetailsModule,
    TailingRecordsModule,
    TailingGradesModule,
    SeederModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
      global: true,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmploymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
}
