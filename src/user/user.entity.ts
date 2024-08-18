import { User, $Enums } from "@client/Postgres/generated.clientPostgres";

export class UserEntity implements User {
  id: number;

  email: string;

  password: string;

  role: $Enums.UserRoles;
}
