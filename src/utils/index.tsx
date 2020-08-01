export const isSSR = typeof window === "undefined";

export const getWidth = () => {
  return isSSR ? 0 : Number(window.innerWidth);
};

export const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
