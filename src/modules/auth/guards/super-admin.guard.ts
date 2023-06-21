import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'modules/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { isSuperAdmin } from '../authorize';
import { UserService } from 'modules/user/user.service';

// this guard checks if requested user is a super admin
@Injectable()
export class SuperAdminGuard implements CanActivate {
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

    if (!isSuperAdmin(role)) return false;

    const user: User | undefined | null = await this.userService.findByEmail(
      result['email'],
    );
    // Checking if the user exists and isActive
    if (user && !user.isActive) return false;

    const gqlContext = GqlExecutionContext.create(context);
    gqlContext.getContext().user = user; // Set the user in the execution context so CurrentUser gets this user

    return true;
  }
}
