import { Injectable } from "@nestjs/common";
import { CvEntity } from "./cv.entity";
import { CreateCvDto } from "./dto/createCv.dto";
import { UpdateCvDto } from "./dto/updateCv.dto";
import { PostgreSqlPrismaService } from "@app/prisma/prisma.postgres.service";


@Injectable()
export class CvRepository {
  constructor(private prisma: PostgreSqlPrismaService) {}

  async createCv(
    submitterId: number,
    createCvDto: CreateCvDto,
    prisma = this.prisma
  ): Promise<CvEntity> {
    return await prisma.cv.create({
      data: {
        submitterId,
        ...createCvDto
      }
    });
  }

  async findCvBySubmitterId(
    submitterId: number, 
    prisma = this.prisma
  ): Promise<CvEntity> {
    return await prisma.cv.findFirst({
      where: {
        submitterId,
      },
    });
  }

  async updateCv(
    cvId: number,
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