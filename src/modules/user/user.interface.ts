import { registerEnumType } from '@nestjs/graphql';

enum UserAccessRole {
  /**
   * 1. Can purchase products
   * 2. Can ask question about products
   * 3. Can follow shops
   */
  Customer = 'customer',
  /**
   * 1. Can own shop
   * 2. Can create, update & manage products
   * 3. Can create, update & manage orders
   */
  Salesman = 'salesman',
  /**
   * 1. Can add new salesman and customer
   * 2. Can remove salesman and customer
   * 3. Can manage followers list
   * 4. Can purchase products
   */
  Admin = 'admin',
  /**
   * 1. Can add customer and make customers admin or saleman
   * 2. Can remove customer and admin
   * 3. Can add, edit and manage orders or products
   * 4. Can manage followers list
   */
  SuperAdmin = 'super-admin',
}
registerEnumType(UserAccessRole, { name: 'UserAccessRole' });

interface IUserAccessTokenPayload {
  email: string;
  accessRole: UserAccessRole;
}

export { IUserAccessTokenPayload, UserAccessRole };
