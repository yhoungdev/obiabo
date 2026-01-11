import '../chunks/page-ssr_75tYeORR.mjs';
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate, a as renderHead, b as renderComponent, f as addAttribute } from '../chunks/astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import { $ as $$Index$1 } from '../chunks/index_BVifUYP0.mjs';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

const html = () => "<p>Let’s connect! Here are the best ways to reach me:</p>";

				const frontmatter = {};
				const file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/data/contact.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const personal_urls = [
    {
      title: "Github",
      url: "https://github.com/yhoungdev",
      description: "\u{1F419} My code\u2019s playground, where bugs are squashed and dreams come to life."
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/emmanuel-obiabo-5a66371aa/",
      description: "\u{1F4C7} A place where I pretend to be fancy, but it\u2019s mostly just \u201Clet\u2019s connect.\u201D"
    },
    {
      title: "Twitter",
      url: "https://x.com/obiabo_immanuel",
      description: "\u{1F426} Reposting nonsense with the occasional brilliant thought. A place where I repost what nerds post."
    },
    {
      title: "Email",
      url: "mailto:theobiabo@gmail.com",
      description: '\u{1F4E7} "As Psalm said, you shall dine with kings!" But before we feast, shoot me an email. No more sending messages by pigeon \u2013 we\u2019ve upgraded to the heavenly art of email! \u{1F9B8}\u200D\u2642\uFE0F'
    },
    {
      title: "Nostr",
      url: "https://snort.social/nprofile1qqs2c3g85ck4qwpakm9nxzlhfved8yykqylcwdu34ge8whkcxeqx4dqka3xww",
      description: "\u{1F517} A decentralized dream where I post just for the blockchain of it. ( Speaking of decentralized, is Nostr really decentralized ? We shall find out in my little internet note \u{1F602}) "
    },
    {
      title: "Farcaster",
      url: "https://warpcast.com/obiabo",
      description: "\u{1F680} A decentralized social space where I cast my thoughts into the void, hoping someone catches them. (Same as this also is it really decentralize ? Paying $3 to signup dosnt make it decentralize, but we would find out in my little note as well \u{1F602})"
    }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>📮 Reach Out</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Index$1, {})} <div class="max-w-2xl mx-auto px-4 py-8 font-serif"> <div> <p> ${renderComponent($$result, "ReachNote", Content, {})} </p> </div> <section id="reach" class="mt-4"> <h4 class="my-4">📬 Find Me Online</h4> <ul> ${personal_urls.map((item) => renderTemplate`<li class="my-2"> <a${addAttribute(item.url, "href")} target="_blank" class="text-default underline "> ${item.title} </a>: ${item.description} </li>`)} </ul> </section> </div> </body></html>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/reach/index.astro", void 0);

const $$file = "/Users/obiabo/Desktop/Container/personal/obiabo/src/pages/reach/index.astro";
const $$url = "/reach";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
