import {useLocation} from "react-router-dom";

export const useQueryParams = (string: string): string => {
  const {search} = useLocation();
  return new URLSearchParams(search).get(string) || "";
};
