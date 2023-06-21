import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from 'modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { isAdmin } from '../authorize';
import { UserService } from 'modules/user/user.service';

// this guard checks if requested user is an admin
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const token = ctx.getContext().token as string;

    const result = await this.jwtService.verifyAsync(token);
    if (!result) return false;

    const role = result['accessRole'];

    if (!isAdmin(role)) return false;

    const user: UserEntity | undefined | null =
      await this.userService.findByEmail(result['email']);
    // Checking if the user exists and isActive
    if (user && !user.isActive) return false;

    const gqlContext = GqlExecutionContext.create(context);
    gqlContext.getContext().user = user; // Set the user in the execution context so CurrentUser gets this user

    return true;
  }
}
