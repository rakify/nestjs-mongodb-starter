import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { constant } from 'core/default';
import { Schema } from 'mongoose';

@ObjectType()
export class BaseFields {
  @Field(() => Schema.Types.ObjectId)
  _id: Schema.Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  @Prop({ type: String, length: 36, default: constant.DEFAULT_USER })
  createdBy: string;

  @Field()
  @Prop({ type: String, length: 36, default: constant.DEFAULT_USER })
  updatedBy: string;
}

export const BaseFieldsSchema = SchemaFactory.createForClass(BaseFields);
