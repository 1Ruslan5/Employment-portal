import { UserEntity } from "../user.entity";

export type TokenType = Omit<UserEntity, 'password'|'email'>;