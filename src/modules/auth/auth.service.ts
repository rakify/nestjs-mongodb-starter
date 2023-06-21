import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { constant } from 'core/default';
import * as bcrypt from 'bcrypt';
import { IUserAccessTokenPayload } from 'modules/user/user.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(payload: IUserAccessTokenPayload) {
    return await this.jwtService.signAsync(payload);
  }

  async hashPassword(plainPassword: string) {
    return await bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);
  }

  async comparePassword(plainPassword: string, hashPassword: string) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
