import { Seeder, DataFactory } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { UserEntity } from 'modules/user/user.entity';
import { DEFAULT_ADMIN_EMAIL } from 'core/environments';
import { UserAccessRole } from 'modules/user/user.interface';

@Injectable()
export default class GlobalSeeder implements Seeder {
  constructor(
    @InjectModel('UserEntity')
    private readonly userModel: Model<UserEntity>,
  ) {}

  async seed(): Promise<any> {
    // number of customers
    const customerIdsLength = 10;
    // number of salesmans
    const salesmanIdsLength = 3;
    // number of admins
    const adminIdsLength = 2;

    // Generate arrays
    const customerIds = Array.from({ length: customerIdsLength }, () => uuid());
    const salesmanIds = Array.from({ length: salesmanIdsLength }, () => uuid());
    const adminIds = Array.from({ length: adminIdsLength }, () => uuid());

    // Reserved account
    const ADMIN = uuid();

    const adminData = DataFactory.createForClass(UserEntity).generate(1, {
      id: ADMIN,
      firstName: 'Rakib',
      lastName: 'Miah',
      email: DEFAULT_ADMIN_EMAIL,
      accessRole: UserAccessRole.SuperAdmin,
    });

    await this.userModel.create(adminData);

    // Generate user seeds with accessRole of customer and save to database
    for (let i = 0; i < customerIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: customerIds[i],
        accessRole: UserAccessRole.Customer,
      });
      await this.userModel.create(userData);
    }

    // Generate user seeds with accessRole of salesman and save to database
    for (let i = 0; i < salesmanIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: salesmanIds[i],
        accessRole: UserAccessRole.Salesman,
      });
      await this.userModel.create(userData);
    }

    // Generate user seeds with accessRole of admin and save to database
    for (let i = 0; i < adminIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: adminIds[i],
        accessRole: UserAccessRole.Admin,
      });
      await this.userModel.create(userData);
    }
  }

  // Drop the collection
  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}
