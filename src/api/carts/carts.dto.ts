import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCart {
  @IsNumber()
  @IsNotEmpty()
  public productId: number;

  @IsNotEmpty()
  @IsNumber()
  public quantity: number;
}
