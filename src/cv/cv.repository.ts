import { MongoPrismaService } from "@app/prisma/prisma.postgres.service";
import { Injectable } from "@nestjs/common";
import { CvEntity } from "./cv.entity";
import { CreateCvDto } from "./dto/createCv.dto";
import { UpdateCvDto } from "./dto/updateCv.dto";


@Injectable()
export class CvRepository {
  constructor(private prisma: MongoPrismaService) {}

  async createCv(
    user_id: string,
    createCvDto: CreateCvDto,
    prisma = this.prisma
  ): Promise<CvEntity> {
    return await prisma.cv.create({
      data: {
        user_id,
        ...createCvDto
      }
    });
  }

  async findCvBySubmitterId(
    user_id: string, 
    prisma = this.prisma
  ): Promise<CvEntity> {
    return await prisma.cv.findFirst({
      where: {
        user_id,
      },
    });
  }

  async updateCv(
    cvId: string,
    updateCv: UpdateCvDto,
    prisma = this.prisma
  ): Promise<CvEntity> {
    return await prisma.cv.update({
      where: {
        id: cvId
      },
      data: updateCv
    })
  }

  async findAllCv(
    prisma = this.prisma
  ): Promise<CvEntity[]>{
    return await prisma.cv.findMany();
  }
}