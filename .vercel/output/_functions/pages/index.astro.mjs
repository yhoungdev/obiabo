import '../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, m as maybeRenderHead, f as addAttribute, r as renderTemplate, u as unescapeHTML, d as createAstro, b as renderComponent, a as renderHead } from '../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import { $ as $$Index$1 } from '../chunks/index_BVifUYP0.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const projects = [
	{
		name: "OurPocket 💳",
		description: "Ourpocket Infrastructure is a backend API that lets B2B platforms manage wallets across multiple payment and crypto providers with one simple, secure integration.",
		url: "https://www.ourpocket.xyz/"
	},
	{
		name: "Potato Squeezy 🍟",
		description: "Support your favorite GitHub contributors with crypto! 🥔✨ Show love to open-source developers through fast, secure, and hassle-free crypto tipping. 🚀💖",
		url: "https://www.potatoesqueezy.xyz/"
	},
	{
		name: "Rodoh 🌶️",
		description: "Capture your screen with sleek, dynamic zoom and pan effects.",
		url: "http://rodoh.xyz/"
	},
	{
		name: "Tomatoe 🍅",
		description: "Turn your smartphone into a remote messenger for your Android TV 🍅📺",
		url: "https://github.com/yhoungdev/tomatoe"
	},
	{
		name: "Manifold SDK 🦀",
		description: "After noticing a gap in Rust SDKs for many popular services, I decided to take the initiative and build them, maybe you've been waiting for this too.",
		url: "https://github.com/yhoungdev/manifold"
	},
	{
		name: "Glimpse 😈",
		description: "Glimpse is a lightweight Rust daemon that quietly monitors your system and sends real-time alerts to Telegram—covering CPU, memory, disk, and network usage.",
		url: "https://github.com/yhoungdev/gimpse"
	},
	{
		name: "Breedbudy 🐾",
		description: "An app that connects pet owners and cross-breeders together.",
		url: "https://breedbuddy.xyz/"
	},
	{
		name: "Bllow 💨",
		description: "Support your creative work",
		url: "https://bllow.co/"
	},
	{
		name: "Bookhive 📕 ",
		description: "An operating system for bibliophiles.",
		url: "https://github.com/Bookhive-Club/Bookhive-Client"
	},
	{
		name: "Silo 🗼 💾",
		description: "An open-source, self-hosted Network-as-a-Service for file storage and sharing (over LAN). Written in Rust, Silo is built for personal use, but the community is welcome to deploy and customize it for their own networks.",
		url: "https://github.com/yhoungdev/silo"
	},
	{
		name: "SolHaven 📱",
		description: "A secure and user-friendly Solana CLI wallet.",
		url: "https://www.npmjs.com/package/solhaven"
	},
	{
		name: "Solana summer compressed NFT session 🎨",
		description: "Educational sessions about Solana's compressed NFTs.",
		url: "https://solana.fm/address/3KxATdmr1wbjscqw8yAct2p1EqVLhUCnc2yGk8JH1DR4/transactions?cluster=mainnet-alpha"
	},
	{
		name: "Solmart 🏦",
		description: "A Solana point-of-sale app that helps merchants receive payment in Solana with Solana Pay.",
		url: "https://github.com/4rjunc/solmart"
	}
];

const $$Project = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="mb-12" id="projects"> <h2 class="ibm-plex-mono-semibold text-xl mb-4">Highlights</h2> <p class="text-sm ibm-plex-mono-regular text-gray-400 mb-6">
I've worked on many private services and applications, but these are some of the public ones.
</p> <div class=""> ${projects.map((project) => renderTemplate`<div class="p-4  hover:bg-gray-100/5 rounded-lg
            transition duration-300"> <a${addAttribute(project.url, "href")} target="_blank"> <h3 class="text-md ibm-plex-mono-semibold bg-transparent text-default">${project.name}</h3> </a> <a${addAttribute(project.url, "href")} target="_blank"> <p class="text-sm ibm-plex-mono-regular bg-transparent mt-2 text-gray-400 leading-6 !italic">${project.description}</p> </a> </div>`)} </div> </section>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/project.astro", void 0);

const html = () => "<p>I’m a software engineer passionate about Linux, open-source ecosystems, and systems engineering. I build software ranging from developer tools to real-world applications and enjoy exploring systems that run close to the metal. Outside of code, I play <strong>drums</strong> 🥁 and occasionally dive into deep reads 📚.</p>\n<br>\n<p>Recently, I worked on the <a class=\"text-default\" href=\"https://crates.io/crates/plunk\"> Plunk Rust SDK </a> 🦀  now the official community SDK featured in\n<a class=\"text-default\" href=\"https://docs.useplunk.com/guides/rust-sdk\"> Plunk’s documentation </a>. I’m also building an unofficial SDK for <a class=\"text-default\" href=\"https://polar.sh\"> Polar.sh </a> ❄️, both aimed at improving the open-source dev experience.</p>\n<br>\n<p>And also, I am currently building <a class=\"text-default\" href=\"https://www.ourpocket.xyz/\">OurPocket</a></p>\n<br>\n<p><em>Currently open to new opportunities 💼 and collaborations. If you’d like to connect or work together, feel free to <a href=\"https://x.com/obiabo_immanuel\" class=\"text-default\">reach out</a>.</em></p>";

				const frontmatter = {};
				const file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/data/intro.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const $$Astro$1 = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  const { more } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mb-12"> <article class="ibm-plex-mono-medium text-sm "> ${renderComponent($$result, "Intro", Content, {})} </article> <br> <br> ${more && renderTemplate`<a href="/about" class="text-default">
Discover more about me 🚀
</a>`} </section>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/sections/about.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', `><title>Emmanuel Obiabo</title><script async src="https://www.googletagmanager.com/gtag/js?id=G-GSQTWFBD18"><\/script><script>
      import { initializeAnalytics } from '../utils/analytics';
      initializeAnalytics();
    <\/script>`, "</head> <body> ", ' <div class="max-w-2xl mx-auto px-4 py-8 font-serif"> ', " ", " </div> </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Header", $$Index$1, {}), renderComponent($$result, "About", $$About, { "more": true }), renderComponent($$result, "Project", $$Project, {}));
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/index.astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
