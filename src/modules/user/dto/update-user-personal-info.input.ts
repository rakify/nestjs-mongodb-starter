import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserPersonalInfoInput {
  @Field({ nullable: true, description: 'user input value for Email' })
  @IsEmail()
  @MaxLength(100, {
    message: 'Email address is too long',
  })
  email: string;

  @Field({ nullable: true, description: 'user input value for Password' })
  @IsString()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;

  @Field({ nullable: true, description: 'user input value for FirstName' })
  @IsString()
  @MinLength(2, {
    message: 'First name is too short',
  })
  @MaxLength(50, {
    message: 'First name is too long',
  })
  firstName: string;

  @Field({ nullable: true, description: 'user input value for LastName' })
  @IsString()
  @MinLength(2, {
    message: 'Last name is too short',
  })
  @MaxLength(50, {
    message: 'Last name is too long',
  })
  lastName: string;

  @Field({ nullable: true, description: 'user input value for avatarLink' })
  @IsString()
  @MaxLength(200, {
    message: 'Link is too long',
  })
  avatarLink: string;

  @Field({ nullable: true, description: 'user input value for coverLink' })
  @IsString()
  @MaxLength(200, {
    message: 'Link is too long',
  })
  coverLink: string;
}
