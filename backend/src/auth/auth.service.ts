import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log(`validating user:  ${username}`);
    const user = await this.usersService.findOneByEmail(username);
    this.logger.log("finding user based on username")
    if (user) {
      if (await bcrypt.compare(password, user.passwordHash)) {
        this.logger.log(`user creds validated success`);
        return {
          email: user.email,
          name: user.name,
          id: user._id,
        };
      } else {
        this.logger.error(`invalid jwttoken`);
      }
    } else {
      this.logger.error(`no user found.`);
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    this.logger.log(`generating JWT for payload :: ${JSON.stringify(user)}`);
    return {
      token: this.jwtService.sign(payload),
    };
  }
}