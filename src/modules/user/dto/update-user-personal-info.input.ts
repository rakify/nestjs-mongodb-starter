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

@InputType()
export class UpdateUserPersonalInfoInput {
  @Field({ nullable: true, description: 'user input value for Email' })
  @ValidateIf((_, value) => value !== undefined)
  @IsDefined({
    // if it is defined but as null
    message: 'Email can not be set as null',
  })
  @IsEmail()
  @MaxLength(100, {
    message: 'Email address is too long',
  })
  email: string;

  @Field({ nullable: true, description: 'user input value for Password' })
  @ValidateIf((_, value) => value !== undefined)
  @IsDefined({
    // if it is defined but as null
    message: 'Password can not be set as null',
  })
  @MinLength(4, {
    message: 'Password must contain atleast 4 characters',
  })
  @MaxLength(50, {
    message: 'Password can not be greater than 50 characters',
  })
  password: string;

  @Field({ nullable: true, description: 'user input value for FirstName' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @MinLength(2, {
    message: 'First name must contain at least 2 characters',
  })
  @MaxLength(50, {
    message: 'First name can not contain more than 50 characters',
  })
  firstName: string;

  @Field({ nullable: true, description: 'user input value for LastName' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsString()
  @MinLength(2, {
    message: 'Last name must contain at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Last name can not contain more than 50 characters',
  })
  lastName: string;

  @Field({ nullable: true, description: 'user input value for avatarLink' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsUrl()
  @MaxLength(400, {
    message: 'Avatar Link is too long',
  })
  avatarLink: string;

  @Field({ nullable: true, description: 'user input value for coverLink' })
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @IsUrl()
  @MaxLength(400, {
    message: 'Cover Link is too long',
  })
  coverLink: string;
}
