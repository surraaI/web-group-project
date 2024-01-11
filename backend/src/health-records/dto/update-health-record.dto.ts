import { IsNumber, IsString } from 'class-validator';

export class UpdateHealthRecordDto {
  @IsNumber()
  Calories_Amount: number;

  @IsString()
  food_type: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  minutes_of_exercise: number;

  @IsNumber()
  amount_of_water_taker: number;

}
