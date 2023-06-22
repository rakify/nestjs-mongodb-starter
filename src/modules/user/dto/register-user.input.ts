import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: false, description: 'user input value for Email' })
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'user input value for Password' })
  @IsString()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;
}
