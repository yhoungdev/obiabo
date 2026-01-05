/**
 * Example usage in Astro components
 * 
 * For Rich Text (Portable Text):
 * ==============================
 * import { getSanityPostBySlug } from '@/utils/getSanityPostBySlug'
 * import PortableTextRenderer from '@/utils/PortableTextRenderer'
 * 
 * const post = await getSanityPostBySlug('my-post-slug')
 * 
 * <PortableTextRenderer value={post.body} />
 * 
 * 
 * For Markdown:
 * =============
 * import { renderMarkdown } from '@/utils/markdownRenderer'
 * 
 * const htmlContent = renderMarkdown(post.markdown)
 * <div set:html={htmlContent} />
 * 
 * 
 * For Combined Content (auto-detect):
 * ====================================
 * import { renderPostContent, getContentType } from '@/utils/contentRenderer'
 * import PortableTextRenderer from '@/utils/PortableTextRenderer'
 * 
 * const post = await getSanityPostBySlug('my-post-slug')
 * const contentType = getContentType({ body: post.body, markdown: post.markdown })
 * 
 * {contentType === 'markdown' && (
 *   <div set:html={renderMarkdown(post.markdown)} />
 * )}
 * 
 * {contentType === 'portable' && (
 *   <PortableTextRenderer value={post.body} />
 * )}
 */

export const USAGE_EXAMPLES = true
