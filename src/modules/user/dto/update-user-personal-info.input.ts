import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { validationConstant } from 'core/default';

@InputType()
export class UpdateUserPersonalInfoInput {
  @Field({ nullable: true, description: 'user input value for Email' })
  @ValidateIf((_, value) => value !== undefined)
  @IsDefined({
    // if it is defined but as null
    message: validationConstant.PROVIDED_NULL_EMAIL,
  })
  @IsEmail()
  @MaxLength(100, {
    message: validationConstant.PROVIDED_TOO_LONG_EMAIL,
  })
  email: string;

  @Field({ nullable: true, description: 'user input value for Password' })
  @ValidateIf((_, value) => value !== undefined)
  @IsDefined({
    // if it is defined but as null
    message: validationConstant.PROVIDED_NULL_PASSWORD,
  })
  @MinLength(4, {
    message: validationConstant.PROVIDED_TOO_SMALL_PASSWORD,
  })
  @MaxLength(100, {
    message: validationConstant.PROVIDED_TOO_LONG_PASSWORD,
  })
  password: string;

  @Field({ nullable: true, description: 'user input value for FirstName' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @MinLength(2, {
    message: validationConstant.PROVIDED_TOO_SMALL_FIRSTNAME,
  })
  @MaxLength(50, {
    message: validationConstant.PROVIDED_TOO_LONG_FIRSTNAME,
  })
  firstName: string;

  @Field({ nullable: true, description: 'user input value for LastName' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MinLength(2, {
    message: validationConstant.PROVIDED_TOO_SMALL_LASTNAME,
  })
  @MaxLength(50, {
    message: validationConstant.PROVIDED_TOO_LONG_LASTNAME,
  })
  lastName: string;

  @Field({ nullable: true, description: 'user input value for avatarLink' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsUrl()
  @MaxLength(400, {
    message: validationConstant.PROVIDED_TOO_LONG_AVATARLINK,
  })
  avatarLink: string;

  @Field({ nullable: true, description: 'user input value for coverLink' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsUrl()
  @MaxLength(400, {
    message: validationConstant.PROVIDED_TOO_LONG_COVERLINK,
  })
  coverLink: string;
}
