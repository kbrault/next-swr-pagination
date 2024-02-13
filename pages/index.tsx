import Posts from './posts';

const Index = () => {
  return (
    <>
      <div className="w-4/5 md:w-5/6 lg:w-9/12 pt-4 mx-auto ">
        <h1 className="text-5xl font-bold pb-5">NEXT-SWR-PAGINATION</h1>
        <Posts />
        <p className="pb-2 text-lg">Example of React Hooks for Data Fetching &quot;SWR&ldquo; (stale-while-revalidate)</p>
        <p className="pb-2 text-lg">SWR is a HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.</p>
        <p className="pb-2 text-lg">Here some technical details :</p>
        <ul className="pl-10 pb-8 max-w-md  text-gray-500 list-disc">
          <li>The API endpoint is /api/posts which is called by SWR</li>
          <li>The back fetches a dummy <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/kbrault/next-swr-pagination/blob/main/data.ts">dataset</a></li>
          <li>This API accept two parameters :</li>
          <ul className="pl-5 max-w-md text-gray-500 list-disc">
            <li>page : index of the pagination</li>
            <li>search : search term</li>
          </ul>
          <li>The whole code is accessible here : <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/kbrault/next-swr-pagination">https://github.com/kbrault/next-swr-pagination</a></li>
        </ul>
      </div>
    </>
  );
};

export default Index;