import type { APIRoute } from 'astro';
import { sanityClient } from '../../utils/sanityClient';

// Helper to get/create session ID
function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/sessionId=([^;]+)/);
  
  if (sessionMatch) {
    return sessionMatch[1];
  }
  
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Basic email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Basic content sanitization
function sanitizeContent(content: string): string {
  return content.trim().replace(/<[^>]*>/g, '');
}

export const GET: APIRoute = async ({ url }) => {
  const postId = url.searchParams.get('postId');
  
  if (!postId) {
    return new Response(JSON.stringify({ error: 'Post ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get approved comments for this post
    const query = `*[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      name,
      content,
      createdAt
    }`;
    
    const comments = await sanityClient.fetch(query, { postId });

    return new Response(JSON.stringify({ comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId, name, email, content } = body;

    // Validation
    if (!postId || !name || !content) {
      return new Response(
        JSON.stringify({ error: 'Post ID, name, and content are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be 100 characters or less' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (content.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Comment must be 1000 characters or less' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (email && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const sessionId = getSessionId(request);
    const sanitizedContent = sanitizeContent(content);
    const sanitizedName = sanitizeContent(name);

    // Create comment (unapproved by default)
    const comment = await sanityClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: postId,
      },
      name: sanitizedName,
      email: email || undefined,
      content: sanitizedContent,
      approved: false,
      sessionId,
      createdAt: new Date().toISOString(),
    });

    // Set session cookie
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const hasSessionCookie = request.headers.get('cookie')?.includes('sessionId=');
    
    if (!hasSessionCookie) {
      headers.set(
        'Set-Cookie',
        `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Comment submitted for approval',
        commentId: comment._id 
      }),
      {
        status: 201,
        headers,
      }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create comment' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
