import axios, { Method } from "axios";
import { API_BASE_URL } from "../constants/urlConstants";

class RequestService {
  get = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
    return createRequest("GET", url, null, isAuthRequired, contentType);
  }

  post = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
    return createRequest("POST", url, body, isAuthRequired, contentType)
  }

  put(url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") {
    return createRequest("PUT", url, body, isAuthRequired, contentType)
  }
}

const createRequest = (method: Method, url: string, body: any, isAuthRequired: boolean, contentType: string) => {
  return axios({
    method,
    url: API_BASE_URL + url,
    data: body,
    headers: getHeader(isAuthRequired, contentType)
  })
}

const getHeader = (isAuthRequired: boolean, contentType: string) => {
  const headers: any = {}
  if (isAuthRequired) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
  }

  headers["Content-Type"] = contentType;
  return headers
}

export default new RequestService();