import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { CurrentUser } from 'modules/auth/decorator/current-user.decoder';
import { User } from './user.schema';
// DTOS
import {
  LoginResponseDTO,
  LogoutResponseDTO,
  RegisterResponseDTO,
  RegisterUserInput,
  ReturnUserData,
  UpdateUserPersonalInfoInput,
  UpdateUserResponseDTO,
} from './dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // to register the user into the system
  @Mutation(() => RegisterResponseDTO, {
    description: 'to register user into the system',
  })
  registerUser(
    @Args('registerUser') registerUser: RegisterUserInput,
  ): Promise<RegisterResponseDTO> {
    return this.userService.registerUser(registerUser);
  }

  @Mutation(() => LoginResponseDTO, {
    description: 'to login user into the system',
  })
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDTO> {
    return this.userService.loginUser(email, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => ReturnUserData)
  async getLoggedUser(@CurrentUser() reqUser: User) {
    return this.userService.getCurrentUser(reqUser);
  }

  // update user personal info
  @UseGuards(AuthGuard)
  @Mutation(() => UpdateUserResponseDTO, {
    description: 'to update user personal informations',
  })
  updateUserPersonalInfo(
    @Args('input') input: UpdateUserPersonalInfoInput,
    @CurrentUser() reqUser: User,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.updateUserPersonalInfo(input, reqUser);
  }
  // logout user from the system
  @Query(() => LogoutResponseDTO, { description: 'logout to the system' })
  logoutUser(): LogoutResponseDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
