import type { APIRoute } from 'astro';
import { sanityClient } from '../../utils/sanityClient';

// Helper to get/create session ID
function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/sessionId=([^;]+)/);
  
  if (sessionMatch) {
    return sessionMatch[1];
  }
  
  // Generate new session ID
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const GET: APIRoute = async ({ request, url }) => {
  const postId = url.searchParams.get('postId');
  
  if (!postId) {
    return new Response(JSON.stringify({ error: 'Post ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const sessionId = getSessionId(request);

    // Get all reactions for this post
    const query = `*[_type == "reaction" && post._ref == $postId] {
      emoji,
      sessionId
    }`;
    
    const reactions = await sanityClient.fetch(query, { postId });

    // Count reactions by emoji
    const reactionCounts: Record<string, { emoji: string; count: number; hasReacted: boolean }> = {};
    
    reactions.forEach((reaction: { emoji: string; sessionId: string }) => {
      if (!reactionCounts[reaction.emoji]) {
        reactionCounts[reaction.emoji] = {
          emoji: reaction.emoji,
          count: 0,
          hasReacted: false,
        };
      }
      reactionCounts[reaction.emoji].count++;
      
      if (reaction.sessionId === sessionId) {
        reactionCounts[reaction.emoji].hasReacted = true;
      }
    });

    return new Response(JSON.stringify({ reactions: reactionCounts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reactions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId, emoji, remove } = body;

    if (!postId || !emoji) {
      return new Response(JSON.stringify({ error: 'Post ID and emoji required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sessionId = getSessionId(request);

    if (remove) {
      // Remove reaction
      const query = `*[_type == "reaction" && post._ref == $postId && emoji == $emoji && sessionId == $sessionId][0]._id`;
      const reactionId = await sanityClient.fetch(query, { postId, emoji, sessionId });
      
      if (reactionId) {
        await sanityClient.delete(reactionId);
      }
    } else {
      // Check if user already reacted with this emoji
      const existingQuery = `*[_type == "reaction" && post._ref == $postId && emoji == $emoji && sessionId == $sessionId][0]`;
      const existing = await sanityClient.fetch(existingQuery, { postId, emoji, sessionId });
      
      if (!existing) {
        // Add reaction
        await sanityClient.create({
          _type: 'reaction',
          post: {
            _type: 'reference',
            _ref: postId,
          },
          emoji,
          sessionId,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // Set session cookie
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const hasSessionCookie = request.headers.get('cookie')?.includes('sessionId=');
    
    if (!hasSessionCookie) {
      headers.set(
        'Set-Cookie',
        `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return new Response(JSON.stringify({ error: 'Failed to update reaction' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
