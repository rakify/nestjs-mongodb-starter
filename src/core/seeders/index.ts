import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from 'modules/user/user.entity';
import { DEFAULT_ADMIN_EMAIL } from 'core/environments';
import { UserAccessRole } from 'modules/user/user.interface';

@Injectable()
export default class GlobalSeeder implements Seeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      role: UserAccessRole.SuperAdmin,
    });

    await this.userRepository.save(adminData);

    // Generate user seeds with accessRole of customer and save to database
    for (let i = 0; i < customerIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: customerIds[i],
        role: UserAccessRole.Customer,
      });
      await this.userRepository.save(userData);
    }

    // Generate user seeds with accessRole of salesman and save to database
    for (let i = 0; i < salesmanIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: salesmanIds[i],
        role: UserAccessRole.Salesman,
      });
      await this.userRepository.save(userData);
    }

    // Generate user seeds with accessRole of admin and save to database
    for (let i = 0; i < adminIdsLength; i++) {
      const userData = DataFactory.createForClass(UserEntity).generate(1, {
        id: adminIds[i],
        role: UserAccessRole.Admin,
      });
      await this.userRepository.save(userData);
    }
  }

  // Drop the database
  async drop(): Promise<any> {
    return Promise.all([this.userRepository.delete({})]);
  }
}
