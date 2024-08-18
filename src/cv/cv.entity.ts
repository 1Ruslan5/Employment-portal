import { cv } from "@prisma/client";


export class CvEntity implements cv {
  id: string;
  user_id: string;
  position: string;
  full_name: string;
  email: string;
  phone_numbers: string | null;
  about_your_self: string | null;
  skills: string;
  experience: string | null;
  languages: string;
  projects: string | null;
}