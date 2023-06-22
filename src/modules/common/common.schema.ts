import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { constant } from 'core/default';
import { Document, Schema } from 'mongoose';

@ObjectType()
export class BaseFields extends Document {
  @Field(() => String)
  _id: Schema.Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ description: 'contains the user id who created this entry.' })
  @Prop({ type: String, default: constant.DEFAULT_USER })
  createdBy: string;

  @Field({ description: 'contains the user id who updated this entry.' })
  @Prop({ type: String, default: constant.DEFAULT_USER })
  updatedBy: string;
}
