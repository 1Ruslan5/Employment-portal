import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CvService } from "./cv.service";
import { AuthSubmitterGuard } from "@app/auth/guards/authSubmitter.guard";
import { CvEntity } from "./cv.entity";
import { User } from "@app/decorators/user.decorator";
import { CreateCvDto } from "./dto/createCv.dto";
import { UpdateCvDto } from "./dto/updateCv.dto";
import { AuthCustomerGuard } from "@app/auth/guards/authCustomer.guard";


@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @UseGuards(AuthSubmitterGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createCV(
    @User('id') id: number, 
    @Body('cv') createCvDto: CreateCvDto
  ): Promise<CvEntity> {
    return this.cvService.createCv(id, createCvDto);
  }

  @UseGuards(AuthSubmitterGuard)
  @UsePipes(new ValidationPipe())
  @Put()
  async updateCV(
    @User('id') id:number,
    @Body('cv') updateCvDto: UpdateCvDto
  ): Promise<CvEntity> {
    return this.cvService.updateCv(id, updateCvDto);
  }

  @UseGuards(AuthSubmitterGuard)
  @Get()
  async getSubmitterCv(
    @User('id') id:number, 
  ): Promise<CvEntity> {
    return this.cvService.getCvBySubmitterId(id);
  }

  @UseGuards(AuthCustomerGuard)
  @Get('all')
  async getAllCv(): Promise<CvEntity[]>{
    return this.cvService.getAllCv();
  }
}