import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCareerDto, GetListJobDto } from 'src/dtos';
import { ICareerDocument } from 'src/interfaces';

@Injectable()
export class CareersService {
  constructor(
    @InjectModel('careers')
    private readonly careerModel: Model<ICareerDocument>,
  ) { }

  // tao job cho cong ty
  async createCareer(body: CreateCareerDto) {
    const { code } = body
    const checkCareer = await this.careerModel.findOne({
      code
    })
    if (checkCareer) {
      throw new Error("career exists")
    }
    return await this.careerModel.create(body);
  }

  // get list job cua cong ty cho user hoac admin thay
  async getListCareer() {
    return await this.careerModel.find();
  }
}
