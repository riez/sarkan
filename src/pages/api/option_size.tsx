import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../config';

export default async (_: Request, res: Response) => {
  try {
    const response = await superagent.get(`${API_URI}/option_size`);
    res.json(response.body);
  } catch (error) {
    throw Error(error);   
  }
}
