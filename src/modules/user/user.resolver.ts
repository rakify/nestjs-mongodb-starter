import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { constant } from 'core/default';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { CurrentUser } from 'modules/auth/decorator/current-user.decoder';
import { UserEntity } from './user.entity';
// DTOS
import { RegisterResponseDTO } from './dto/register-response.dto';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginResponseDTO, ReturnUserData } from './dto/login-response.input';
import { LogOutUserDTO } from './dto/logout-user.dto';
import { UpdateUserResponseDTO } from './dto/update-user-response.dto';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';

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
  async getLoggedUser(@CurrentUser() reqUser: UserEntity) {
    return this.userService.getCurrentUser(reqUser);
  }

  // update user personal info
  @UseGuards(AuthGuard)
  @Mutation(() => UpdateUserResponseDTO, {
    description: 'to update user personal informations',
  })
  updateUserPersonalInfo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserPersonalInfoInput,
    @CurrentUser() reqUser: UserEntity,
  ): Promise<UpdateUserResponseDTO> {
    return this.userService.updateUserPersonalInfo(id, input, reqUser);
  }
  // logout from the system
  @Query(() => LogOutUserDTO, { description: 'logout to the system' })
  logoutUser(): LogOutUserDTO {
    return { Message: constant.LOGOUT_SUCCESSFUL };
  }
}
