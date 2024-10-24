import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    forwardRef,
  } from '@nestjs/common';
  import { SignUpDto } from './dto/signup.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User } from './schemas/user.schema';
  import * as bcrypt from 'bcrypt';
  import { AuthService } from 'src/auth/auth.service';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService,
      private readonly logger: Logger,
    ) {
      this.logger = new Logger(UsersService.name);
    }
  
    async signUpUser(createUserDto: SignUpDto) {
      this.logger.log(`signing up user`);
  
      try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createUserDto.password, salt);
        this.logger.log(`generated password in hash format`);
        const createdUser = new this.userModel({
          ...createUserDto,
          passwordHash,
        });
  
        const saved = await createdUser.save();
        this.logger.log(`user generated succesfully and saved`);
  
        return { name: saved.name, email: saved.email, _id: saved._id };
      } catch (err) {
        this.logger.error(`failed signed up the user: ${err.message}`);
        throw new InternalServerErrorException(err.message);
      }
    }
  
    async getUserData(user: any) {
      const loggedInUser = await this.userModel.findById(user.userId);
      return {
        email: loggedInUser.email,
        name: loggedInUser.name,
      };
    }
  
    list(): Promise<User[]> {
      return this.userModel.find().exec();
    }
  
    findOneByEmail(email: string) {
      return this.userModel.findOne({ email });
    }
  }