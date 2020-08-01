import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../config';
import { AreaModel } from '../../models/area';

export default async (_: Request, res: Response) => {
  try {
    const response = await superagent.get(`${API_URI}/option_area`);
    const filteredResponse = response?.body?.filter((item: AreaModel) => item.city !== null);
    res.json(filteredResponse);
  } catch (error) {
    throw Error(error);   
  }
}
