import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, IsDate } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class HealthRecord extends Document {
  // @Prop()
  // @IsString()
  // userId: string;

  @Prop()
  @IsNumber()
  caloriesAmount: number;

  @Prop()
  @IsString()
  foodType: string;

  @Prop()
  @IsNumber()
  weight: number;

  @Prop()
  @IsNumber()
  height: number;

  @Prop()
  @IsNumber()
  minutesOfExercise: number;

  @Prop()
  @IsNumber()
  amountOfWaterTaken: number;

  @Prop({ default: Date.now }) // Set default value to the current date
  @IsDate()
  date: Date;
}

export const HealthRecordSchema = SchemaFactory.createForClass(HealthRecord);