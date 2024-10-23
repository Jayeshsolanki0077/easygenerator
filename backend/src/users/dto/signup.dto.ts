import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: `Password requirements:
        - It should be minimum length of 8 characters.
        - It should contain atleast 1 letter.
        - It should contain atleast 1 number.
        - It should contain atleast 1 special character.`,
  })
  password: string;
}