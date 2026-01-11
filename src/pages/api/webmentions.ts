import type { APIRoute } from 'astro';
import { db, webmentions, eq } from 'astro:db';



export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    
    if (!data.source || !data.target) {
      return new Response(JSON.stringify({ error: 'Missing source or target' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    const targetUrl = new URL(data.target);
    const postMatch = targetUrl.pathname.match(/notes\/([^/]+)/);
    const postId = postMatch ? postMatch[1] : null;

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Invalid post URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    const mentionId = `mention_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    
    await db.insert(webmentions).values({
      id: mentionId,
      postId,
      source: data.source,
      author: data.author?.name || data.source,
      authorUrl: data.author?.url,
      authorImage: data.author?.photo,
      type: data['wm-property'] || 'mention', 
      content: data.content?.text,
      published: data.published ? new Date(data.published) : undefined,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ 
      success: true, 
      id: mentionId,
      message: 'Webmention received' 
    }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webmention error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process webmention' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};


export const GET: APIRoute = async ({ url }) => {
  const postId = url.searchParams.get('postId');

  if (!postId) {
    return new Response(JSON.stringify({ error: 'Missing postId parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const mentions = await db
      .select()
      .from(webmentions)
      .where(eq(webmentions.postId, postId));

    return new Response(JSON.stringify({ webmentions: mentions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching webmentions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch webmentions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
