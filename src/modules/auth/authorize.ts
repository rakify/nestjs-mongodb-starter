import { UserEntity } from 'modules/user/user.entity';
import { UserAccessRole } from 'modules/user/user.interface';

/**
 * isSalesman, SuperAdmin has access too
 * @param accessRole
 * @return boolean
 */
export function isSalesman(accessRole: UserAccessRole): boolean {
  return (
    accessRole === UserAccessRole.Salesman ||
    accessRole === UserAccessRole.SuperAdmin
  );
}

/**
 * isAdmin, SuperAdmin has access too
 * @param accessRole
 * @return boolean
 */
export function isAdmin(accessRole: UserAccessRole): boolean {
  return (
    accessRole === UserAccessRole.Admin ||
    accessRole === UserAccessRole.SuperAdmin
  );
}

/**
 * isSuperAdmin Checking if requested user is an Super admin
 * @param accessRole
 * @return boolean
 */
export function isSuperAdmin({ accessRole }: UserEntity): boolean {
  return accessRole === UserAccessRole.SuperAdmin;
}
