import type { APIRoute } from 'astro';
import { db, eq, and, reactions } from 'astro:db';


function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/sessionId=([^;]+)/);
  
  if (sessionMatch) {
    return sessionMatch[1];
  }
  
  
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
    
    const allReactions = await db.select().from(reactions);
    const filtered = allReactions.filter(r => r.postId === postId);
    
    const reactionCounts: Record<string, { emoji: string; count: number; hasReacted: boolean }> = {};
    
    filtered.forEach((reaction: any) => {
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching reactions:', errorMessage, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reactions', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('POST /api/reactions - Request received');
    const body = await request.json();
    const { postId, emoji, remove } = body;
    console.log('POST /api/reactions - Body:', { postId, emoji, remove });

    if (!postId || !emoji) {
      return new Response(JSON.stringify({ error: 'Post ID and emoji required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sessionId = getSessionId(request);
    console.log('POST /api/reactions - Session ID:', sessionId);

    if (remove) {
      
      console.log('POST /api/reactions - Removing reaction');
      const allData = await db.select().from(reactions);
      const existing = allData.filter(r => 
        r.postId === postId && 
        r.emoji === emoji && 
        r.sessionId === sessionId
      );
      
      if (existing.length > 0) {
        console.log('POST /api/reactions - Deleting reaction:', existing[0].id);
        await db.delete(reactions).where(eq(reactions.id, existing[0].id));
        console.log('POST /api/reactions - Deleted successfully');
      }
    } else {
      
      console.log('POST /api/reactions - Adding reaction');
      const existing = await db
        .select()
        .from(reactions)
        .where(and(
          eq(reactions.postId, postId),
          eq(reactions.emoji, emoji),
          eq(reactions.sessionId, sessionId)
        ));
      
      console.log('POST /api/reactions - Existing reaction:', existing);
      
      if (existing.length === 0) {
        
        console.log('POST /api/reactions - Creating new reaction');
        const reactionId = `reaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await db.insert(reactions).values({
          id: reactionId,
          postId,
          emoji,
          sessionId,
          createdAt: new Date(),
        });
        console.log('POST /api/reactions - Created reaction:', reactionId);
      } else {
        console.log('POST /api/reactions - User already reacted with this emoji');
      }
    }

    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const hasSessionCookie = request.headers.get('cookie')?.includes('sessionId=');
    
    if (!hasSessionCookie) {
      headers.set(
        'Set-Cookie',
        `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`
      );
    }

    console.log('POST /api/reactions - Success');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error updating reaction:', errorMessage, error);
    return new Response(JSON.stringify({ error: 'Failed to update reaction', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
