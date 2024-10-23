import { Logger, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: '78790372ff081772acd0feb1f0343296837131f9bdea508d6234d640fef73c64',
          signOptions: { expiresIn: '30m' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, Logger, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}