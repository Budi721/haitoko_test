import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public price: number;
}
