import '../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, a as renderHead, b as renderComponent, f as addAttribute, r as renderTemplate } from '../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import { $ as $$Index$1 } from '../chunks/index_BVifUYP0.mjs';
/* empty css                                 */
import { s as sanity } from '../chunks/sanityClient_DuniQa85.mjs';
export { renderers } from '../renderers.mjs';

async function getSanityPosts() {
  const query = `*[_type == "post"]|order(publishedAt desc){
    _id,
    title,
    description,
    publishedAt,
    slug,
    tags,
    body
  }`;
  return await sanity.fetch(query);
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getSanityPosts();
  return renderTemplate`<!-- ts-nocheck --><html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Personal notes and thoughts on technology, programming, and life"><meta name="author" content="Obiabo"><meta property="og:title" content="Notes"><meta property="og:description" content="Personal notes and thoughts on technology, programming, and life"><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="Notes"><meta name="twitter:description" content="Personal notes and thoughts on technology, programming, and life"><title>Notes</title><link rel="stylesheet" href="/src/style/index.css">${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Index$1, { "title": "Notes" })} <main class="max-w-4xl mx-auto px-4 py-8"> <header class="mb-8"> <h1 class="text-xl font-bold mb-4"> <span class="text-default text-md">Welcome to my corner of the internet!</span> </h1> <p class="text-sn italic mb-6">
This is where I share notes, thoughts, things I've tried and want to try, and personal experiences and learnings.
</p> <p class="mb-8">
Feel free to explore and learn something along the way.
</p> </header> <section class="mb-12"> <div class="space-y-6 "> ${posts.map((post) => renderTemplate`<div class="mt-4"> <div> <h3 class="text-md italic font-medium mb-3"> <a${addAttribute(`/notes/${post.slug.current}`, "href")} class="text-default hover:underline"> ${post.title} </a> </h3> ${post.description && renderTemplate`<p class="mb-4 text-sm italic">${post.description}</p>`} <p class="text-sm italic">
Published on ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" }) : "Unknown"} </p> </div> </div>`)} </div> </section> <footer class="mt-12 pt-8  text-center text-sm"> <p class="text-gray-400">Stay cheesed up for this, drink some cup of water and do the calms</p> </footer> </main> </body></html>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/notes/index.astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/notes/index.astro";
const $$url = "/notes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
