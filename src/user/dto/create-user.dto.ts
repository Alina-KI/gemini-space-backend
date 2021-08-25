export class CreateUserDto {
  readonly name;
  readonly surname;
  readonly phone;
  readonly login;
  readonly email;
  readonly password;
}

export class UserInfo {
  readonly name;
  readonly login;
  readonly email;
}
