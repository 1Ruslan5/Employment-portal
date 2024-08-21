import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CvEntity } from "./cv.entity";
import { CreateCvDto } from "./dto/createCv.dto";
import { CvRepository } from "./cv.repository";
import { UpdateCvDto } from "./dto/updateCv.dto";


@Injectable()
export class CvService {
  constructor(private cvRepository: CvRepository) {}
  async createCv(submitterId: number, createCvDto: CreateCvDto): Promise<CvEntity> {
    const cvClean = this.prepareCvCreateObject(createCvDto);

    const cvBySubmitterId = await this.cvRepository.findCvBySubmitterId(submitterId);
    if(cvBySubmitterId) {
      throw new HttpException('CV has already created', HttpStatus.UNPROCESSABLE_ENTITY);
    } 

    const cv = await this.cvRepository.createCv(submitterId, cvClean);
    if (!cv) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return cv;
  }

  async updateCv(submitterId: number, updateCvDto: UpdateCvDto): Promise<CvEntity> {
    const cv = await this.getCvBySubmitterId(submitterId);

    const prepareCv = this.prepareCvCreateObject(cv);
    Object.assign(prepareCv, updateCvDto);
    const updatedCv = await this.cvRepository.updateCv(cv.id, prepareCv);
    return updatedCv;
  }

  async getCvBySubmitterId(submitterId: number): Promise<CvEntity>{
    const cv = await this.cvRepository.findCvBySubmitterId(submitterId);
    if(!cv) {
      throw new HttpException('Either repeat your request or repeat it later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return cv;
  }

  async getAllCv (): Promise<CvEntity[]>{
    const cvs = await this.cvRepository.findAllCv();
    if(cvs.length === 0){
      throw new HttpException('No cvs found', HttpStatus.NOT_FOUND);
    }
    return cvs
  }

  private prepareCvCreateObject(cvUpdateDto: CreateCvDto): CreateCvDto {
    const { email, full_name, languages, position, skills, about_your_self, experience, phone_numbers, projects } =
      cvUpdateDto;

    return {
      email,
      full_name,
      languages,
      position,
      skills,
      about_your_self,
      experience,
      phone_numbers,
      projects,
    };
  }
}