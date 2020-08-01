import superagent from "superagent";
import paginate from "jw-paginate";
import { Request, Response } from "express";
import { API_URI } from "../../config";
import { ListModel } from "../../models/list";

export default async (req: Request, res: Response) => {
  try {
    const query = req?.query || {};
    const {
      page: queryPage,
      sortField,
      sortDirection,
      searchQuery,
      limit,
      ...search
    } = query;
    const response = await superagent.get(
      `${API_URI}/list${
        Object.keys(search).length !== 0
          ? `?search=${JSON.stringify(search)}`
          : ""
      }`
    );
    const page = parseInt(queryPage?.toString()) || 1;
    let filteredResponse = response?.body?.filter((item: ListModel) => item.uuid !== null);
    if (sortField && sortDirection === "asc") {
      filteredResponse = filteredResponse?.sort((a: ListModel, b: ListModel) => {
        if (a[sortField.toString()] < b[sortField.toString()]) {
          return -1;
        }
        return 1;
      });
    }
    if (sortField && sortDirection === "desc") {
      filteredResponse = filteredResponse?.sort((a: ListModel, b: ListModel) => {
        if (a[sortField.toString()] < b[sortField.toString()]) {
          return 1;
        }
        return -1;
      });
    }
    if (searchQuery) {
      const query = new RegExp(searchQuery.toString(), 'i');
      filteredResponse = filteredResponse?.filter(
        (item: ListModel) =>
          item?.komoditas?.match(query) ||
          item?.area_provinsi?.match(query) ||
          item?.area_kota?.match(query)
      );
    }
    if (limit) {
      const temp = filteredResponse?.splice(0, limit);
      filteredResponse = temp;
    }
    const pageSize = 10;
    const pagination = paginate(filteredResponse?.length, page, pageSize);
    const items = filteredResponse?.slice(
      pagination?.startIndex,
      pagination?.endIndex + 1
    );
    res.json({ pagination, items });
  } catch (error) {
    throw Error(error);
  }
};
