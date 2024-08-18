import { Task } from "@client/Postgres/generated.clientPostgres";

export class TaskEntity implements Task {
  id: number;

  title: string;

  description: string;

  created_at: Date;

  completed: boolean;

  confirmCustomer: boolean;

  submitterId: number;

  customerId: number
}
