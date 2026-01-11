import { d as db, c as comments } from '../../chunks/_astro_db_Dc_pLuBa.mjs';
export { renderers } from '../../renderers.mjs';

function getSessionId(request) {
  const cookies = request.headers.get("cookie") || "";
  const sessionMatch = cookies.match(/sessionId=([^;]+)/);
  if (sessionMatch) {
    return sessionMatch[1];
  }
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function sanitizeContent(content) {
  return content.trim().replace(/<[^>]*>/g, "");
}
const GET = async ({ url }) => {
  const postId = url.searchParams.get("postId");
  if (!postId) {
    return new Response(JSON.stringify({ error: "Post ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const allComments = await db.select().from(comments);
    const filtered = allComments.filter((c) => c.postId === postId);
    const approvedComments = filtered.filter((c) => c.approved).map((c) => ({
      _id: c.id,
      name: c.name,
      content: c.content,
      createdAt: c.createdAt
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return new Response(JSON.stringify({ comments: approvedComments }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching comments:", errorMessage, error);
    return new Response(JSON.stringify({ error: "Failed to fetch comments", details: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { postId, name, email, content } = body;
    if (!postId || !name || !content) {
      return new Response(
        JSON.stringify({ error: "Post ID, name, and content are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be 100 characters or less" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (content.length > 1e3) {
      return new Response(
        JSON.stringify({ error: "Comment must be 1000 characters or less" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (email && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const sessionId = getSessionId(request);
    const sanitizedContent = sanitizeContent(content);
    const sanitizedName = sanitizeContent(name);
    const commentId = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(comments).values({
      id: commentId,
      postId,
      name: sanitizedName,
      email: email || void 0,
      content: sanitizedContent,
      approved: false,
      sessionId,
      createdAt: /* @__PURE__ */ new Date()
    });
    const headers = new Headers({ "Content-Type": "application/json" });
    const hasSessionCookie = request.headers.get("cookie")?.includes("sessionId=");
    if (!hasSessionCookie) {
      headers.set(
        "Set-Cookie",
        `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}`
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Comment submitted for approval",
        commentId
      }),
      {
        status: 201,
        headers
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating comment:", errorMessage, error);
    return new Response(
      JSON.stringify({ error: "Failed to create comment", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
