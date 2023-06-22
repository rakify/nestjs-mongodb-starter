import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { validationConstant } from 'core/default';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: false, description: 'user input value for Email' })
  @IsEmail(
    {},
    {
      message: validationConstant.PROVIDED_INVALID_EMAIL,
    },
  )
  email: string;

  @Field({ nullable: false, description: 'user input value for Password' })
  @IsString()
  @MinLength(4, {
    message: validationConstant.PROVIDED_TOO_SMALL_PASSWORD,
  })
  @MaxLength(50, {
    message: validationConstant.PROVIDED_TOO_LONG_PASSWORD,
  })
  password: string;
}
