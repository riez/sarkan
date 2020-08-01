import superagent from 'superagent';
import paginate from 'jw-paginate';
import { Request, Response } from 'express';
import { API_URI } from '../../config';

export default async (req: Request, res: Response) => {
  try {
    const query = req?.query || {};
    const response = await superagent.get(`${API_URI}/list?${query}`);
    const page = parseInt(req?.query?.page?.toString()) || 2;
    const filteredResponse = response?.body?.filter(item => item.uuid !== null);
    const pageSize = 10;
    const pagination = paginate(filteredResponse?.length, page, pageSize);
    const items = filteredResponse?.slice(pagination?.startIndex, pagination?.endIndex + 1);
    res.json({pagination, items});
  } catch (error) {
    throw Error(error);   
  }
}
