import { sanity } from './sanityClient';

export async function getSanityPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
    publishedAt,
    slug,
    tags,
    body
  }`;
  return await sanity.fetch(query, { slug });
}
