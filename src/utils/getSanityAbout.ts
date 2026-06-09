import {sanity} from './sanityClient'

export type SanityAbout = {
  _id: string
  title?: string
  introMarkdown?: string
  fullMarkdown?: string
}

export async function getSanityAbout(): Promise<SanityAbout | null> {
  const query = `*[_type == "about"][0]{
    _id,
    title,
    introMarkdown,
    fullMarkdown
  }`

  return await sanity.fetch(query)
}
