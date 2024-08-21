import { Cv } from "@client/Postgres/generated.clientPostgres";


export class CvEntity implements Cv {
  id: number;
  position: string;
  full_name: string;
  email: string;
  phone_numbers: string | null;
  about_your_self: string | null;
  skills: string;
  experience: string | null;
  languages: string;
  projects: string | null;
  submitterId: number;
}