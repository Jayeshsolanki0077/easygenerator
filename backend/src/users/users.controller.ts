import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { SignUpDto } from './dto/signup.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    signUpUser(@Body() signUpDto: SignUpDto) {
      return this.usersService.signUpUser(signUpDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getUserData(@Request() req) {
      return this.usersService.getUserData(req.user);
    }

  }