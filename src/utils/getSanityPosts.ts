import { sanity } from './sanityClient';

export async function getSanityPosts() {
  const query = `*[_type == "post"]|order(coalesce(firstPublishedAt, publishedAt) desc){
    _id,
    title,
    description,
    firstPublishedAt,
    publishedAt,
    slug,
    tags,
    body
  }`;
  return await sanity.fetch(query);
}
