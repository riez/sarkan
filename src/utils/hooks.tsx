import useSWR, { mutate } from "swr";
import {ListModel} from "../models/list";
import { SizeModel } from "../models/size";
import { serialize } from ".";

export function useList(query) {
  const key = "/api/list"
  return useSWR(`${key}?${serialize(query)}`, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
    revalidateOnMount: true,
  });
}

export function useArea() {
  const key = "/api/option_area"
  return useSWR<ListModel>(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}

export function useSize() {
  const key = "/api/option_size"
  return useSWR<SizeModel>(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}