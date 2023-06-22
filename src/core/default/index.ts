export const constant = {
  USER_ALREADY_EXIST: 'Provided email address already exist in system.',
  USER_NOT_EXIST: 'User does not exist.',
  HASH_SALT_COUNT: 10,
  PROVIDED_WRONG_EMAIL: 'Provided email or password is in-correct.',
  PROVIDED_WRONG_PASSWORD: 'Provided email or password is in-correct.',
  LOGIN_SUCCESSFUL: 'You are logged in successfully.',
  REGISTRATION_SUCCESSFUL: 'Your account has been created successfully.',
  UPDATE_USER_SUCCESSFUL: 'User information has been updated successfully.',
  UNAUTHORIZED_ACCESS_MESSAGE: 'Please login first to perform this operation.',
  UNAUTHORIZED_OWNER_MESSAGE:
    'You do not have access to perform this operation.',
  LOGOUT_SUCCESSFUL:
    'You have been logout, please login again to gain the access.',
  DEFAULT_USER: 'default_user',
};

export const validationConstant = {
  PROVIDED_INVALID_EMAIL: 'Email address must be valid',
  PROVIDED_NULL_EMAIL: 'Email address can not be set as null',
  PROVIDED_NULL_PASSWORD: 'Password can not be set as null',
  PROVIDED_TOO_LONG_EMAIL: 'Email address is too long',
  PROVIDED_TOO_SMALL_PASSWORD: 'Password must contain atleast 4 characters',
  PROVIDED_TOO_LONG_PASSWORD: 'Password can not be greater than 100 characters',
  PROVIDED_TOO_SMALL_FIRSTNAME: 'First name must contain at least 2 characters',
  PROVIDED_TOO_LONG_FIRSTNAME:
    'First name can not contain more than 50 characters',
  PROVIDED_TOO_SMALL_LASTNAME: 'Last name must contain at least 2 characters',
  PROVIDED_TOO_LONG_LASTNAME:
    'Last name can not contain more than 50 characters',
  PROVIDED_TOO_LONG_AVATARLINK: 'Avatar link is too long',
  PROVIDED_TOO_LONG_COVERLINK: 'Cover link is too long',
};
