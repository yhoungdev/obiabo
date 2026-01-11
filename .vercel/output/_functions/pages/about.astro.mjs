import '../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate, a as renderHead, b as renderComponent } from '../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import { $ as $$Index$1 } from '../chunks/index_BVifUYP0.mjs';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

const html = () => "<p>I’m a software engineer passionate about Linux, open-source ecosystems, and systems engineering. I build software ranging from developer tools to real-world applications and enjoy exploring systems that run close to the metal.</p>\n<br>\n<p>I have solid experience with Linux and its various distributions, including Ubuntu, Kali Linux, Tails OS, Parrot OS, and Kubuntu. A few years ago, I experimented with running a Bitcoin node and personal server on a Raspberry Pi 4, but it didn’t go as planned due to hardware limitations, something I’d love to revisit in the future with better hardware.</p>\n<br>\n<p>I was a Solana Summer Fellow ‘24 and continue to work on decentralized applications and blockchain systems.</p>\n<br>\n<p>Recent projects include the <a class=\"text-default font-semibold\" href=\"https://docs.useplunk.com/guides/rust-sdk\">Plunk Rust SDK</a>, now the official community SDK, and an unofficial SDK for <a class=\"text-default font-semibold\" href=\"https://polar.sh/\">Polar.sh</a>.</p>\n<br>\n<p>Currently, I’m building <a class=\"text-default font-semibold\" href=\"https://www.ourpocket.xyz/\">OurPocket</a> - an infrastructure API that enables B2B platforms to manage wallets across multiple payment and crypto providers through a single, secure integration.</p>\n<br>\n<p>Outside of development, I play drums and enjoy diving into technical reads. Over time, I’ve curated an awesome reading list from some amazing corners of the web, think of it as a gold mine of knowledge you can explore <a class=\"text-default font-semibold underline\" href=\"https://sudowhoami.notion.site/Some-Good-Reads-in-no-particular-order-25a13d4f6e9a80c88637e0b72955c0d8?pvs=74\"> here </a>\n. I’ve also got a few titles lined up on my personal reading list, including Mastering Bitcoin, <a href=\"https://en.wikipedia.org/wiki/The_Garden_of_Forking_Paths\"> The Garden of Forking Paths  </a> , <a href=\"https://en.wikipedia.org/wiki/Many-worlds_interpretation\" class=\"text-default\">Many worlds interpretation</a>, <a class=\"text-default\" href=\"https://craftinginterpreters.com/\">Crafting Interpreters</a>, and <a class=\"text-default\" href=\"https://archive.org/details/cu31924028741175\"> The Dual Mandate in British Tropical Africa (1922) by Lord Frederick Lugard </a>.</p>";

				const frontmatter = {};
				const file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/data/about.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>👋🏾 Howdy</title>${renderHead()}</head> <body> <section id="about" class="max-w-2xl mx-auto px-4 py-8 font-serif"> ${renderComponent($$result, "Header", $$Index$1, {})} ${renderComponent($$result, "AboutMe", Content, {})} </section> </body></html>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/about/index.astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/about/index.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
