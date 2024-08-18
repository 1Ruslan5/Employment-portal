import { Module } from "@nestjs/common";
import { CvController } from "./cv.controller";
import { CvService } from "./cv.service";
import { AuthSubmitterGuard } from "@app/auth/guards/authSubmitter.guard";
import { AuthCustomerGuard } from "@app/auth/guards/authCustomer.guard";
import { PrismaModule } from "@app/prisma/prisma.module";
import { CvRepository } from "./cv.repository";



@Module({
  controllers: [CvController],
  providers: [
    CvService, CvRepository, 
    AuthSubmitterGuard, AuthCustomerGuard,
  ],
  imports: [PrismaModule],
})
export class CvModule {}