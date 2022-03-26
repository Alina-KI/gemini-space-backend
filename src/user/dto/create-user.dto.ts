export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
  readonly lastname: string;
  readonly dateOfBirth: string;
  readonly phone: string;
  readonly town: string;
  readonly login: string;
  readonly email: string;
  readonly password: string;
}

export class UserInfo {
  readonly name: string;
  readonly surname: string;
  readonly lastname: string;
  readonly dateOfBirth: string;
  readonly phone: string;
  readonly town: string;
  readonly login: string;
  readonly email: string;
}
