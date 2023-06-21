import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: false, description: 'user input value for Email' })
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'user input value for Password' })
  @IsString()
  password: string;
}
