import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserPersonalInfoInput {
  @Field({ nullable: true, description: 'user input value for Email' })
  @IsEmail()
  email: string;

  @Field({ nullable: true, description: 'user input value for Password' })
  @IsString()
  password: string;

  @Field({ nullable: true, description: 'user input value for FirstName' })
  @IsString()
  firstName: string;

  @Field({ nullable: true, description: 'user input value for LastName' })
  @IsString()
  lastName: string;
}
