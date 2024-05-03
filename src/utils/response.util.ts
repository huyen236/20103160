import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

Injectable();
export class ResponseUtil {
  GLOBAL_RESPONSES = new Map();
  constructor() {}

  setRestfulResponse(id: string, res: Response) {
    this.GLOBAL_RESPONSES.set(id, res);
  }
  getRestfulResponse(id: string): Response {
    return this.GLOBAL_RESPONSES.get(id);
  }
  removeRestfulResponse(id: string) {
    this.GLOBAL_RESPONSES.delete(id);
  }
  success(params: { data: any; res: Response }): any {
    const { data, res } = params;
    const result = {
      success: true,
      data,
    };
    res.status(200).send(result);
    return result;
  }
  processing(params: { data: any; res: Response }): any {
    const { data, res } = params;
    const result = {
      success: true,
      ...data,
    };
    res.status(200).send(result);
    return result;
  }
  failed(params: { data?: any; res: Response; message: string }): any {
    let { data, message } = params;

    // if (!data || !data.error_code) {
    //   data = {
    //     ...data,
    //   };
    // }
    const result = {
      success: false,
      ...data,
      message,
    };
    params.res.status(422).send(result);
    return result;
  }
}
