import useSWR, { mutate } from "swr";
import { ListModel } from "../models/list";
import { SizeModel } from "../models/size";
import { serialize } from ".";
import { AreaModel } from "../models/area";

export function mutateList(payload) {
  const key = "/api/post-list";
  return fetch(key, { method: "POST", body: JSON.stringify([payload]) });
}

export function useList(query) {
  const key = "/api/list";
  return useSWR(`${key}?${serialize(query)}`, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
    revalidateOnMount: true,
  });
}

export function useProvince() {
  const key = "/api/option_area?filter=province";
  return useSWR(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}

export function useCity() {
  const key = "/api/option_area?filter=city";
  return useSWR(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}

export function useArea() {
  const key = "/api/option_area";
  return useSWR<AreaModel>(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}

export function useSize() {
  const key = "/api/option_size";
  return useSWR(key, {
    onSuccess: (list) => localStorage.setItem(key, JSON.stringify(list)),
    onError: () => localStorage.removeItem(key),
  });
}
