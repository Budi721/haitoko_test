import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @Length(8)
  public password: string;
}
