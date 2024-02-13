NEXT-SWR-PAGINATION
===

Example of React Hooks for Data Fetching "SWR" (stale-while-revalidate)

SWR is a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

Here some technical details :

*  The API endpoint is /api/posts which is called by SWR
*  The back fetches a dummy [dataset](https://github.com/kbrault/next-swr-pagination/blob/main/data.ts)
*  This API accept two parameters :
    *  page : index of the pagination
    *  search : search term