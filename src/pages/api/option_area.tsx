import superagent from "superagent";
import { Request, Response } from "express";
import { API_URI } from "../../config";
import { AreaModel } from "../../models/area";

export default async (req: Request, res: Response) => {
  try {
    const query = req?.query || {};
    const response = await superagent.get(`${API_URI}/option_area`);
    let filteredResponse = response?.body?.filter(
      (item: AreaModel) => item.city !== null
    );
    const haveSeen = {};
    if (query?.filter === "province") {
      const uniqueResponse = [];
      filteredResponse.forEach((element) => {
        if (!haveSeen[element.province]) {
          uniqueResponse.push({ province: element.province });
        }
        haveSeen[element.province] = element.province;
      });
      return res.json(uniqueResponse);
    }
    res.json(filteredResponse);
  } catch (error) {
    throw Error(error);
  }
};
