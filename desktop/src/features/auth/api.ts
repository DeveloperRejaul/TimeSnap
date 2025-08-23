import { api } from "@/core/rtk/api";
import type { ILoginPayload, ILoginResponse } from "@/types";

const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (body) => ({
        url: '/api/login',
        method: 'POST',
        body,
      }),
    })
  }),
})

export const { 
  useLoginMutation 
} = authApi;
export default authApi;