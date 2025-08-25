import { api } from "@/core/rtk/api";
import type {ILoginResponse } from "@/types";

const homeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    uploadScreenshot: builder.mutation<ILoginResponse, FormData>({
      query: (body) => ({
        url: '/api/screenshot',
        method: 'POST',
        body,
        headers:{}
      }),
    })
  }),
})

export const { 
  useUploadScreenshotMutation 
} = homeApi;
export default homeApi;