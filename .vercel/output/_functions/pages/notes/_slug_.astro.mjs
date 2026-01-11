import '../../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, d as createAstro, f as addAttribute, a as renderHead, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import { $ as $$Index } from '../../chunks/index_BVifUYP0.mjs';
/* empty css                                    */
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { s as styles } from '../../chunks/_slug_.d0da9b78_vaJHudaZ.mjs';
import { s as sanity } from '../../chunks/sanityClient_DuniQa85.mjs';
export { renderers } from '../../renderers.mjs';

const PortableTextRenderer = ({ value }) => {
  if (!value) return null;
  const components = {
    /* =====================
     * CUSTOM BLOCK TYPES
     * ===================== */
    types: {
      image: ({ value: value2 }) => {
        const url = value2?.asset?.url;
        if (!url) return null;
        return /* @__PURE__ */ jsxs("figure", { className: "portable-image", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: url,
              alt: value2.alt || "",
              loading: "lazy"
            }
          ),
          value2.caption && /* @__PURE__ */ jsx("figcaption", { children: value2.caption })
        ] });
      },
      code: ({ value: value2 }) => /* @__PURE__ */ jsxs("div", { className: "code-block", children: [
        value2.language && /* @__PURE__ */ jsx("div", { className: "language-badge", children: value2.language }),
        /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { className: `language-${value2.language || "javascript"}`, children: value2.code }) })
      ] }),
      callout: ({ value: value2 }) => /* @__PURE__ */ jsxs("div", { className: `callout callout-${value2.type || "info"}`, children: [
        value2.title && /* @__PURE__ */ jsx("strong", { className: "callout-title", children: value2.title }),
        value2.message && /* @__PURE__ */ jsx("p", { className: "callout-message", children: value2.message })
      ] }),
      divider: () => /* @__PURE__ */ jsx("hr", { className: "portable-divider" }),
      videoEmbed: ({ value: value2 }) => {
        const embedUrl = convertToEmbedUrl(value2?.url);
        if (!embedUrl) return null;
        return /* @__PURE__ */ jsxs("figure", { className: "portable-video", children: [
          /* @__PURE__ */ jsx(
            "iframe",
            {
              src: embedUrl,
              width: "100%",
              height: "400",
              frameBorder: "0",
              allowFullScreen: true,
              loading: "lazy",
              title: value2.caption || "Embedded video"
            }
          ),
          value2.caption && /* @__PURE__ */ jsx("figcaption", { children: value2.caption })
        ] });
      },
      quoteBlock: ({ value: value2 }) => /* @__PURE__ */ jsxs("blockquote", { className: "portable-quote", children: [
        /* @__PURE__ */ jsx("p", { className: "quote-text", children: value2.text }),
        value2.author && /* @__PURE__ */ jsxs("footer", { className: "quote-author", children: [
          "— ",
          value2.author
        ] })
      ] }),
      highlight: ({ value: value2 }) => /* @__PURE__ */ jsx("mark", { className: `highlight highlight-${value2.color || "yellow"}`, children: value2.text }),
      previewBlock: ({ value: value2 }) => /* @__PURE__ */ jsxs("div", { className: `preview-block preview-${value2.bgType || "light"}`, children: [
        value2.title && /* @__PURE__ */ jsx("h4", { className: "preview-title", children: value2.title }),
        value2.description && /* @__PURE__ */ jsx("p", { className: "preview-description", children: value2.description }),
        value2.previewContent && /* @__PURE__ */ jsx("div", { className: "preview-content", children: value2.previewContent })
      ] })
    },
    /* =====================
     * BLOCK STYLES
     * ===================== */
    block: {
      h1: ({ children }) => /* @__PURE__ */ jsx("h1", { className: "portable-h1", children }),
      h2: ({ children }) => /* @__PURE__ */ jsx("h2", { className: "portable-h2", children }),
      h3: ({ children }) => /* @__PURE__ */ jsx("h3", { className: "portable-h3", children }),
      h4: ({ children }) => /* @__PURE__ */ jsx("h4", { className: "portable-h4", children }),
      blockquote: ({ children }) => /* @__PURE__ */ jsx("blockquote", { className: "portable-blockquote", children }),
      normal: ({ children }) => /* @__PURE__ */ jsx("p", { className: "portable-p", children })
    },
    /* =====================
     * LISTS
     * ===================== */
    list: {
      bullet: ({ children }) => /* @__PURE__ */ jsx("ul", { className: "portable-ul", children }),
      number: ({ children }) => /* @__PURE__ */ jsx("ol", { className: "portable-ol", children })
    },
    listItem: {
      bullet: ({ children }) => /* @__PURE__ */ jsx("li", { className: "portable-li-bullet", children }),
      number: ({ children }) => /* @__PURE__ */ jsx("li", { className: "portable-li-number", children })
    },
    /* =====================
     * INLINE MARKS
     * ===================== */
    marks: {
      strong: ({ children }) => /* @__PURE__ */ jsx("strong", { className: "portable-strong", children }),
      em: ({ children }) => /* @__PURE__ */ jsx("em", { className: "portable-em", children }),
      code: ({ children }) => /* @__PURE__ */ jsx("code", { className: "portable-code", children }),
      underline: ({ children }) => /* @__PURE__ */ jsx("u", { className: "portable-underline", children }),
      "strike-through": ({ children }) => /* @__PURE__ */ jsx("s", { className: "portable-strikethrough", children }),
      link: ({ value: value2, children }) => /* @__PURE__ */ jsx(
        "a",
        {
          href: value2?.href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "portable-link",
          children
        }
      ),
      internalLink: ({ value: value2, children }) => {
        const slug = value2?.reference?.slug?.current;
        if (!slug) return children;
        return /* @__PURE__ */ jsx("a", { href: `/notes/${slug}`, className: "portable-internal-link", children });
      }
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: styles.portableText, children: /* @__PURE__ */ jsx(PortableText, { value, components }) }) });
};
function convertToEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtu")) {
    const id = url.match(/v=([^&]+)/)?.[1] || url.match(/youtu\.be\/([^?]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (url.includes("vimeo")) {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  return url;
}

const REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "🎉", label: "Celebrate" },
  { emoji: "🤔", label: "Thinking" },
  { emoji: "💡", label: "Insightful" }
];
function BlogReactions({ postId }) {
  const [reactions, setReactions] = useState({});
  const [loading, setLoading] = useState(true);
  const [explosions, setExplosions] = useState([]);
  useEffect(() => {
    fetchReactions();
  }, [postId]);
  const triggerExplosion = (emoji, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth * 100;
    const y = (rect.top + rect.height / 2) / window.innerHeight * 100;
    const newExplosion = {
      id: Date.now(),
      emoji,
      x,
      y
    };
    setExplosions((prev) => [...prev, newExplosion]);
    setTimeout(() => {
      setExplosions((prev) => prev.filter((e) => e.id !== newExplosion.id));
    }, 3e3);
  };
  const fetchReactions = async () => {
    try {
      const response = await fetch(`/api/reactions?postId=${postId}`);
      const data = await response.json();
      setReactions(data.reactions || {});
    } catch (error) {
      console.error("Failed to fetch reactions:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleReaction = async (emoji, event) => {
    const currentReaction = reactions[emoji];
    const hasReacted = currentReaction?.hasReacted;
    if (!hasReacted) {
      triggerExplosion(emoji, event);
    }
    setReactions((prev) => ({
      ...prev,
      [emoji]: {
        emoji,
        count: hasReacted ? Math.max(0, (prev[emoji]?.count || 0) - 1) : (prev[emoji]?.count || 0) + 1,
        hasReacted: !hasReacted
      }
    }));
    try {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, emoji, remove: hasReacted })
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Reaction API error:", responseData);
        setReactions((prev) => ({
          ...prev,
          [emoji]: {
            emoji,
            count: hasReacted ? (prev[emoji]?.count || 0) + 1 : Math.max(0, (prev[emoji]?.count || 0) - 1),
            hasReacted
          }
        }));
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
      fetchReactions();
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center justify-center py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: "Loading reactions..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "border-t border-b border-gray-700 py-6 my-8 reactions-container relative overflow-visible", children: [
    explosions.map((explosion) => Array.from({ length: 25 }).map((_, i) => {
      const angle = i / 25 * 360 + explosion.id % 100 * 0.3;
      const distance = 80 + i * 7 % 120;
      const delay = i * 0.01;
      const duration = 0.6 + i * 0.02 % 0.4;
      const rotation = i * 30 - 360;
      const scale = 0.8 + i * 0.025 % 0.6;
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: "fixed text-2xl pointer-events-none",
          style: {
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            zIndex: 9999,
            animation: `emoji-boom ${duration}s ease-out ${delay}s forwards`,
            "--angle": `${angle}deg`,
            "--distance": `${distance}px`,
            "--rotation": `${rotation}deg`,
            "--scale": scale,
            "--gravity": `${50 + i * 2}px`
          },
          children: explosion.emoji
        },
        `${explosion.id}-${i}`
      );
    })),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes emoji-boom {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance) * 0.6)),
              calc(-50% + calc(sin(var(--angle)) * var(--distance) * 0.6))
            ) scale(var(--scale)) rotate(calc(var(--rotation) * 0.3));
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance))),
              calc(-50% + calc(sin(var(--angle)) * var(--distance)) + var(--gravity))
            ) scale(calc(var(--scale) * 0.5)) rotate(var(--rotation));
          }
        }
      ` }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-gray-100", children: "Reactions" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: REACTIONS.map(({ emoji, label }) => {
      const reaction = reactions[emoji];
      const count = reaction?.count || 0;
      const hasReacted = reaction?.hasReacted || false;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: (e) => handleReaction(emoji, e),
          className: `
                flex items-center gap-2 px-4 py-2 rounded-full 
                border transition-all duration-200
                ${hasReacted ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-200"}
                hover:scale-105 active:scale-95
              `,
          title: label,
          "aria-label": `${label} reaction${count > 0 ? `, ${count} reactions` : ""}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl bg-transparent", children: emoji }),
            count > 0 && /* @__PURE__ */ jsx("span", { className: `text-sm font-medium bg-transparent ${hasReacted ? "text-blue-400" : "text-gray-400"}`, children: count })
          ]
        },
        emoji
      );
    }) })
  ] });
}

function BlogComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: ""
  });
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetchComments();
  }, [postId]);
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, ...formData })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({
          type: "success",
          text: "Comment submitted! It will appear after approval."
        });
        setFormData({ name: "", email: "", content: "" });
        setShowForm(false);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to submit comment" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to submit comment. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-gray-700 pt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-100", children: [
        "Comments ",
        comments.length > 0 && `(${comments.length})`
      ] }),
      !showForm && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowForm(true),
          className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white",
          children: "Leave a comment"
        }
      )
    ] }),
    message && /* @__PURE__ */ jsx(
      "div",
      {
        className: `mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 border border-green-500 text-green-400" : "bg-red-500/10 border border-red-500 text-red-400"}`,
        children: message.text
      }
    ),
    showForm && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mb-8 p-6 border border-gray-700 rounded-lg ", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-100", children: "Leave a comment" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(false),
            className: "text-gray-400 hover:text-gray-300",
            "aria-label": "Close form",
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "name", className: "block text-sm font-medium mb-2 text-gray-300", children: [
            "Name ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "name",
              required: true,
              maxLength: 100,
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
              placeholder: "Your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "block text-sm font-medium mb-2 text-gray-300", children: [
            "Email ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              className: "w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
              placeholder: "your.email@example.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "content", className: "block text-sm font-medium mb-2 text-gray-300", children: [
            "Comment ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "content",
              required: true,
              maxLength: 1e3,
              rows: 4,
              value: formData.content,
              onChange: (e) => setFormData({ ...formData, content: e.target.value }),
              className: "w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y",
              placeholder: "Share your thoughts..."
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
            formData.content.length,
            "/1000 characters"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: submitting,
              className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white",
              children: submitting ? "Submitting..." : "Submit Comment"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-100",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "Loading comments..." }) : comments.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic", children: "No comments yet. Be the first to share your thoughts!" }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: comments.map((comment) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors ",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold bg-transparent text-lg text-gray-100", children: comment.name }),
            /* @__PURE__ */ jsx("time", { className: "text-sm text-gray-500", children: formatDate(comment.createdAt) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed whitespace-pre-wrap", children: comment.content })
        ]
      },
      comment._id
    )) })
  ] });
}

async function getSanityPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
    publishedAt,
    slug,
    tags,
    mainImage {
      asset -> {
        url
      },
      alt,
      caption
    },
    body[] {
      ...,
      _type == "image" => {
        asset -> {
          url
        },
        alt,
        caption
      }
    }
  }`;
  return await sanity.fetch(query, { slug });
}

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
  }
  const post = await getSanityPostBySlug(slug);
  if (!post) {
    return new Response(null, {
      status: 404,
      statusText: "Note not found"
    });
  }
  const { title, description: desc, tags, publishedAt, body, mainImage } = post;
  return renderTemplate`<html lang="en" data-astro-cid-fezs4xpw> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(desc || "Personal notes and thoughts", "content")}><meta name="author" content="Obiabo"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(desc || "Personal notes and thoughts", "content")}><meta property="og:type" content="article"><meta property="article:published_time"${addAttribute(publishedAt ? new Date(publishedAt).toISOString() : "", "content")}><!-- @ts-ignore -->${tags && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}<meta name="twitter:card" content="summary"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(desc || "Personal notes and thoughts", "content")}><title>${title} | Notes</title><link rel="stylesheet" href="/src/style/index.css">${renderHead()}</head> <body data-astro-cid-fezs4xpw> ${renderComponent($$result, "Header", $$Index, { "title": title, "data-astro-cid-fezs4xpw": true })} <main class="container mx-auto px-4 py-8 max-w-4xl" data-astro-cid-fezs4xpw> <div class="w-fit max-w-full flex items-start gap-2 mt-6 mx-auto" data-astro-cid-fezs4xpw> <main class="container" data-astro-cid-fezs4xpw> <h1 class="text-xl md:text-2xl italic font-bold leading-tight tracking-normal text-default" data-astro-cid-fezs4xpw>${title}</h1> ${desc && renderTemplate`<p class="text-md mt-4 mb-6 italic" data-astro-cid-fezs4xpw>${desc}</p>`} ${mainImage?.asset?.url && renderTemplate`<img${addAttribute(mainImage.asset.url, "src")}${addAttribute(mainImage.alt || title, "alt")} class="w-full rounded-lg shadow-lg mb-8 max-h-96 object-cover" data-astro-cid-fezs4xpw>`} <p class="mb-8 text-sm italic" data-astro-cid-fezs4xpw>Published on <b data-astro-cid-fezs4xpw>${publishedAt ? new Date(publishedAt).toLocaleDateString("en-US", { dateStyle: "long" }) : "Unknown"}</b></p> <article class="prose prose-md max-w-none" data-astro-cid-fezs4xpw> ${renderComponent($$result, "PortableTextRenderer", PortableTextRenderer, { "client:load": true, "value": body, "client:component-hydration": "load", "client:component-path": "/Users/obiabo/Desktop/Container/personal/obiabo/src/utils/PortableTextRenderer", "client:component-export": "default", "data-astro-cid-fezs4xpw": true })} </article> ${renderComponent($$result, "BlogReactions", BlogReactions, { "client:load": true, "postId": post._id, "client:component-hydration": "load", "client:component-path": "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/BlogReactions", "client:component-export": "default", "data-astro-cid-fezs4xpw": true })} ${renderComponent($$result, "BlogComments", BlogComments, { "client:load": true, "postId": post._id, "client:component-hydration": "load", "client:component-path": "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/BlogComments", "client:component-export": "default", "data-astro-cid-fezs4xpw": true })} <div class="mt-12 pt-8 " data-astro-cid-fezs4xpw> <a href="/notes" class="text-default hover:underline" data-astro-cid-fezs4xpw>← Back to Notes</a> </div> </main> </div> </main>  </body> </html>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/notes/[slug].astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/notes/[slug].astro";
const $$url = "/notes/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
