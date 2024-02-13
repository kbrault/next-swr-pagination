import React, { useState } from 'react'
import useSWR from 'swr';
import { Post } from '../data';
import Loader from '../components/Loader';
import FailLoad from '../components/FailLoad';
import Link from 'next/link';
import Pagination from '../components/Pagination';
import Loupe from '../components/Loupe';

interface ApiResponse {
    posts: Post[];
    totalPages: number;
}

const fetcher = async (url: string): Promise<ApiResponse> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const Posts: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { data, error } = useSWR(`/api/posts?page=${page}&search=${search}`, fetcher);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1); // Reset page number when searching
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    if (error) return <FailLoad />;
    if (!data) return <Loader />;

    return (
        <div className="w-4/5 md:w-5/6 lg:w-9/12 pt-4 mx-auto ">
            <h1 className="text-5xl font-bold pb-5">NEXT-SWR-PAGINATION</h1>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Loupe />
                </div>

                <input id="default-search" className="block w-full p-2 ps-10  text-gray-900 border border-gray-300  bg-gray-50  mb-2"
                    autoFocus
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search posts..." />
                <button onClick={() => setSearch("")} className="rounded-md text-red-600 absolute end-2 top-2 bottom-2 bg-red-100 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-3 py-0.5 ">clear</button>
            </div>

            <div className="relative overflow-x-auto">

                <table className="w-full text-sm text-left text-gray-500 table-auto ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 0">
                        <tr>
                            <th scope="col" className="px-2 py-2 text-base">
                                ID
                            </th>
                            <th scope="col" className="px-2 py-2 text-base">
                                Title
                            </th>
                            <th scope="col" className="px-2 py-2 text-base">
                                Content
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.posts.map((post) => (
                            <tr key={post.id} className=" border-b odd:bg-white even:bg-gray-100 hover:bg-blue-500 hover:text-white">
                                <td className="p-2">
                                    <Link legacyBehavior href={`/post/${post.id}`}>
                                        <a className="block px-2 py-2">{post.id}</a>
                                    </Link>
                                </td>
                                <td>
                                    <Link legacyBehavior href={`/post/${post.id}`}>
                                        <a className="block px-2 py-2">{post.title}</a>
                                    </Link>
                                </td>
                                <td>
                                    <Link legacyBehavior href={`/post/${post.id}`}>
                                        <a className="block px-2 py-2">{post.body}</a>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={data.totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                maxVisiblePages={3} />

            <p className="pb-2 text-lg">Example of React Hooks for Data Fetching "SWR" (stale-while-revalidate)</p>
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
    );
};

export default Posts;