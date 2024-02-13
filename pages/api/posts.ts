import { NextApiRequest, NextApiResponse } from 'next';
import posts, { Post } from '../../data';

const PAGE_SIZE = 6;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const searchQuery = req.query.search as string || ''; // Get the search query from the request parameters
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  let filteredPosts = posts;

  // Filter the posts based on the search query
  if (searchQuery.trim() !== '') {
    const searchRegex = new RegExp(searchQuery, 'i');
    filteredPosts = posts.filter((post: Post) => searchRegex.test(post.title) || searchRegex.test(post.body));
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Simulate latency
  //await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate failed load 
  // res.status(500).json({ message : "error loading data" });

  res.status(200).json({ posts: paginatedPosts, totalPages });
}
