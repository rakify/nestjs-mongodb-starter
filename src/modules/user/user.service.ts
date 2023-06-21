import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { constant } from 'core/default';
import { AuthService } from 'modules/auth/auth.service';
import { IUserAccessTokenPayload } from './user.interface';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.dto';
import { ReturnUserData } from './dto/login-response.input';
import { RegisterUserInput } from './dto/register-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  // register the user into the system
  async registerUser(registerUserData: RegisterUserInput): Promise<any> {
    const { email, password } = registerUserData;
    const lowerEmail = email.toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email: lowerEmail },
      select: ['email'],
    });
    if (user && user.email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }

    const hashPasswordValue = await this.authService.hashPassword(password);

    const dataObject: RegisterUserInput = {
      email: lowerEmail,
      password: hashPasswordValue,
    };
    const newUserData = this.userRepository.create(dataObject);
    const newUser = await this.userRepository.save(newUserData);

    const payload: IUserAccessTokenPayload = {
      email: newUser.email,
      accessRole: newUser.accessRole,
    };
    const access_token = await this.authService.generateAccessToken(payload);

    return {
      message: constant.REGISTRATION_SUCCESSFUL,
      userData: newUser,
      access_token,
    };
  }

  // login into the system
  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException(constant.PROVIDED_WRONG_EMAIL);
    }

    const isValidPassword = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException(constant.PROVIDED_WRONG_PASSWORD);
    }

    const payload = { email: user.email, accessRole: user.accessRole };
    const access_token = await this.authService.generateAccessToken(payload);

    return {
      message: constant.LOGIN_SUCCESSFUL,
      userData: user,
      access_token,
    };
  }

  async getCurrentUser(reqUser: UserEntity): Promise<ReturnUserData> {
    return reqUser;
  }

  // update user by id when user exists
  async updateUserPersonalInfo(
    id: string,
    input: UpdateUserPersonalInfoInput,
    reqUser: UserEntity,
  ) {
    if (reqUser.id !== id)
      throw new BadRequestException(constant.UNAUTHORIZED_OWNER_MESSAGE);

    const user = await this.findbyId(id);
    if (!user) throw new Error(constant.USER_NOT_EXIST);

    Object.assign(user, { ...input });

    const updatedUser = await user.save();

    const response: UpdateUserResponseDTO = {
      message: constant.UPDATE_USER_SUCCESSFUL,
      userData: updatedUser,
    };
    return response;
  }

  // find user by email when user exists
  async findByEmail(email: string) {
    return await UserEntity.findOne({
      where: {
        email: email,
      },
    });
  }

  // find user by id when user exists
  async findbyId(id: string) {
    return await UserEntity.findOne({
      where: {
        id: id,
      },
    });
  }
}
