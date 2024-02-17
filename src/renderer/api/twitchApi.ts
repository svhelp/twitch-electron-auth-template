import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "renderer/store";
import { GetUsersApiResponse, GetUsersApiModel } from "./models";

export const TwitchBaseUrl = 'https://api.twitch.tv/helix/'

export const twitchApi = createApi({
    reducerPath: 'twitchApi',
    baseQuery: fetchBaseQuery({
      baseUrl: TwitchBaseUrl,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).mainLayoutReducer.authToken;

        headers.set('Client-Id', process.env.TWITCH_API_KEY);
    
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
    
        return headers
      }
    }),
    endpoints: (build) => ({
        getUsers: build.query<GetUsersApiResponse, GetUsersApiModel>({
            query: (model) => ({
                url: `users`,
                params: model,
            }),
        }),
    })
})

export const {
    useGetUsersQuery,
} = twitchApi;