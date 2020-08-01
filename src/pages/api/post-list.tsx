import superagent from "superagent";
import paginate from "jw-paginate";
import { Request, Response } from "express";
import { API_URI } from "../../config";

export default async (req: Request, res: Response) => {
  try {
    const payloads = req?.body || {};
    const response = await superagent
      .post(`${API_URI}/list`)
      .set("Content-Type", "application/json")
      .send(payloads);
    res.json(response.body);
  } catch (error) {
    throw Error(error);
  }
};
