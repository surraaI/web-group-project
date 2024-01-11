import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';
import { HealthRecord } from '../../health-records/schemas/healthRecord.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: [Role.User] }) // Assign "user" role by default
  roles: Role[];

  @Prop({ type: [HealthRecord], default: [] })
  myhealthRecords: HealthRecord[];
}

export const userSchema = SchemaFactory.createForClass(User);