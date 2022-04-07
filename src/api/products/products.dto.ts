import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;
}
