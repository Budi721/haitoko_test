import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @Length(8)
  @ApiProperty()
  public password: string;
}

export class RequestToken {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public refreshToken: string;
}
