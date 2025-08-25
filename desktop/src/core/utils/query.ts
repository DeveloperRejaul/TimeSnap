import type {  Error, StoreKeyTypes, Success } from '../../types';
import { storage } from '../context/AppProvider';

export type Options = {
  apiType?: 'REST' | 'GRAPHQL',
  timeout?:number;
}

class Query {
  constructor() {  }

  private async getHeader (args:any) {

    const headers = args.headers ? new Headers(args.headers) : new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const token = await storage?.get("USER_TOKEN")
    headers.set('Authorization', `Bearer ${token}`);
    
    return headers;
  }

  private success<T = any>(data:Success<T>){
    return {data};
  }

  private error(err:Error) {
    return {
      error:{
        status: err?.status || 500,
        data: {
          message: err?.message || 'Something went wrong',
        },
      },
    };
  }

  baseQuery = (params:Options)=> async (args:any  /* , api, extraOptions  */)=> {
    /* const { signal, dispatch, getState } = api; */
    const baseUrl = await storage?.get<StoreKeyTypes>("BASE_URL")
    const {
      apiType = 'REST',
      timeout = 6000, //6-second timeout
    } = params;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);


    // Construct URL properly
    const url = typeof args === 'string' ? `${baseUrl}${args}` : `${baseUrl}${args.url}`;

    try {
      const headers  = await this.getHeader(args);
    
      // fetch api call
      const response = await fetch(url, {
        method: args?.method || 'GET',
        headers,
        body: (args?.body && args.headers)? args?.body :args?.body ? JSON.stringify(args.body) : undefined,
        signal: controller.signal,
        credentials:'include',
      });

      clearTimeout(timeoutId);
      if (!response.ok) {
        return this.error({status: response.status, message: `HTTP error! Status: ${response.status}`});
      }
      const res = await response.json();
      // GraphQL API response handling
      if (apiType === 'GRAPHQL') return this.success(res);
      return this.success(res);

    } catch (error) {
      clearTimeout(timeoutId);
      return this.error(error as Error);
    }
  };
}

export default new Query();