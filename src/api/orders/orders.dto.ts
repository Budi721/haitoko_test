import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrder {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  public productsId: number[];
}
