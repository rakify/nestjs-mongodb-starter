import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.schema';
import { constant } from 'core/default';
import { AuthService } from 'modules/auth/auth.service';
import { IUserAccessTokenPayload } from './user.interface';
import { UpdateUserPersonalInfoInput } from './dto/update-user-personal-info.input';
import { UpdateUserResponseDTO } from './dto/update-user-response.dto';
import { LoginResponseDTO, ReturnUserData } from './dto/login-response.input';
import { RegisterUserInput } from './dto/register-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterResponseDTO } from './dto/register-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  // register the user into the system
  async registerUser(
    registerUserData: RegisterUserInput,
  ): Promise<RegisterResponseDTO> {
    const { email, password } = registerUserData;
    const lowerEmail = email.toLowerCase();

    const user = await this.userModel.findOne(
      { email: lowerEmail },
      { email: 1 },
    );

    if (user && user.email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }

    const hashPasswordValue = await this.authService.hashPassword(password);

    const dataObject: RegisterUserInput = {
      email: lowerEmail,
      password: hashPasswordValue,
    };
    const newUserData = new this.userModel(dataObject);
    const newUser = await newUserData.save();

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
  async loginUser(email: string, password: string): Promise<LoginResponseDTO> {
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

  async getCurrentUser(reqUser: User): Promise<ReturnUserData> {
    return reqUser;
  }

  // update user by id when user exists
  async updateUserPersonalInfo(
    input: UpdateUserPersonalInfoInput,
    reqUser: User,
  ): Promise<UpdateUserResponseDTO> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: reqUser._id },
      input,
      { new: true },
    );

    if (!updatedUser) throw new Error(constant.USER_NOT_EXIST);

    const response: UpdateUserResponseDTO = {
      message: constant.UPDATE_USER_SUCCESSFUL,
      userData: updatedUser,
    };
    return response;
  }

  // find user by email when user exists
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  // find user by id when user exists
  async findbyId(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }
}
