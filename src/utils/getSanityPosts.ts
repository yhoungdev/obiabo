import { sanity } from './sanityClient';

export async function getSanityPosts() {
  // GROQ query to fetch posts
  const query = `*[_type == "post"]|order(publishedAt desc){
    _id,
    title,
    description,
    publishedAt,
    slug,
    tags,
    body
  }`;
  return await sanity.fetch(query);
}
