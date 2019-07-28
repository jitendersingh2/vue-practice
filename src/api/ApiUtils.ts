import { DocumentNode } from 'graphql';

export default class ApiUtils {

  public static toDate(date: string, time: string) {
    return new Date(date + ' ' + time);
  }

  public static formatTime(date) {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  public static getPath(obj, path: string) {
      return path.split('.').reduce((o, x) => {
          return (typeof o === 'undefined' || o === null) ? o : o[x];
      }, obj);
  }

  public static  getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
  }

  public static nullToEmpty(obj: any) {
    return (obj === null) ? '' : obj;
  }

  public static storeFrameInfo(store: any) {
    store.commit('organizationId', ApiUtils.getQueryString().organizationId);
    store.commit('sessionKey', ApiUtils.getQueryString().sessionKey);
    store.commit('baseUrl', decodeURIComponent(ApiUtils.getQueryString().baseUrl));
  }

  public static getQueryString(): any {
    const queryStringKeyValue = window.parent.location.search.replace('?', '').split('&');
    const qsJsonObject = {};
    if (queryStringKeyValue !== null) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < queryStringKeyValue.length; i++) {
          qsJsonObject[queryStringKeyValue[i].split('=')[0]] = queryStringKeyValue[i].split('=')[1];
      }
    }
    return qsJsonObject;
  }
}
