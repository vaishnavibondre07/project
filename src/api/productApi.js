import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi =  createApi ({
    reducerPath : 'productApi',

    baseQuery : fetchBaseQuery({
        baseUrl : 'https://dummyjson.com/'
    }),

    tagTypes : ['Products', 'IndvProduct'],

    endpoints: (builder) => ({

        getProducts : builder.query({
            query : () => 'products',

            provideTags : ['Products']

        }),

         getDetails : builder.query({
           query : (id) => `products/${id}`,

           provideTags : ['IndvProducts']
        })
    }),

})

export const {useGetProductsQuery, useGetDetailsQuery} = productApi;