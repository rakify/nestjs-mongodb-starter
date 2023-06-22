import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: false, description: 'user input value for Email' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'user input value for Password' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;
}
