import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../config';
import { SizeModel } from '../../models/size';

export default async (_: Request, res: Response) => {
  try {
    const response = await superagent.get(`${API_URI}/option_size`);
    const filteredResponse = response?.body?.filter((item: SizeModel) => item.size !== null);
    res.json(filteredResponse);
  } catch (error) {
    throw Error(error);   
  }
}
