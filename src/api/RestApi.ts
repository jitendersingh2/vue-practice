import axios from 'axios';

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

export default class RestApi {
  public static get(url: string, data: any = {}) {
    return RestApi.master(Method.Get, url, { params: data });
  }
  public static post(url: string, data: any = {}) {
    return RestApi.master(Method.Post, url, { data });
  }
  public static put(url: string, data: any = {}) {
    return RestApi.master(Method.Put, url, { data });
  }
  public static delete(url: string, data: any = {}) {
    return RestApi.master(Method.Delete, url, { data });
  }
  public static setInterceptor(func: ((error: any) => any) | undefined) {
    axios.interceptors.response.use((response) =>
      response.data.result ? response.data.result : response.data
      , func);
  }
  public static setHeaders(headers: any = {}) {
    Object.assign(axios.defaults.headers, headers);
  }
  private static master(method: Method, url: string, data: { params?: any, data?: any }) {
    return axios.request({
      method,
      url,
      data: data.data,
      params: data.params,
    }).then((result) => result).catch((error) => error);
  }
}
