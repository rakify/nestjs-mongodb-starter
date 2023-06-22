import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAccessRole } from './user.interface';
import { Factory } from 'nestjs-seeder';
import { constant } from 'core/default';
import { Document } from 'mongoose';
import { BaseFieldsSchema } from 'modules/common/common.schema';

@ObjectType({ description: 'user schema' })
@Schema({ timestamps: true })
export class User extends Document {
  @Field()
  @Prop({ type: String, length: 36, default: constant.DEFAULT_USER })
  createdBy: string;

  @Field()
  @Prop({ type: String, length: 36, default: constant.DEFAULT_USER })
  updatedBy: string;

  @Factory((faker, ctx) =>
    ctx.firstName ? ctx.firstName : faker.name.firstName(),
  )
  @Field({ nullable: true })
  @Prop({ type: String, nullable: true })
  firstName: string;

  @Factory((faker, ctx) =>
    ctx.lastName ? ctx.lastName : faker.name.lastName(),
  )
  @Field({ nullable: true })
  @Prop({ type: String, nullable: true })
  lastName: string;

  @Factory((faker, ctx) =>
    ctx.email ? ctx.email : faker.internet.email().toLowerCase(),
  )
  @Field()
  @Prop({ type: String, unique: true })
  email: string;

  @Factory(
    (faker, ctx) =>
      ctx.password
        ? ctx.password
        : '$2b$10$/3sioxoWNCCo3g/efr.cXuuXNvUWcPJM/PoBmKNVcHTaXtvgASF7C', //1234
  )
  @Field()
  @Prop({ type: String, required: true })
  password: string;

  @Factory((faker) => faker.image.avatar())
  @Field({ nullable: true })
  @Prop({ type: String, nullable: true })
  avatarLink: string;

  @Factory((faker) => faker.image.cats())
  @Field({ nullable: true })
  @Prop({ type: String, nullable: true })
  coverLink: string;

  @Field()
  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Prop({ type: String, length: 10, nullable: true })
  country: string;

  @Field(() => UserAccessRole)
  @Prop({
    type: String,
    enum: UserAccessRole,
    default: UserAccessRole.Customer,
  })
  accessRole: UserAccessRole;
}

export const UserSchema =
  SchemaFactory.createForClass(User).add(BaseFieldsSchema);
