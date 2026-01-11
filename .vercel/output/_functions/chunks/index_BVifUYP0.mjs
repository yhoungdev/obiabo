import { c as createComponent, d as createAstro, m as maybeRenderHead, e as renderScript, f as addAttribute, r as renderTemplate, b as renderComponent } from './astro/server_XTC3fnMi.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nav;
  const navItems = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Projects",
      path: "#projects"
    },
    {
      title: "Howdy",
      path: "/about"
    },
    {
      title: "Notes",
      path: "/notes"
    },
    {
      title: "Contributions",
      path: "/open-source-contributions"
    },
    {
      title: "Contact",
      path: "/reach"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="flex items-center justify-between mx-auto mt-4 w-full max-w-6xl px-4"> <div class="hidden md:flex items-center text-sm gap-4 mx-auto"> ${navItems.map((item) => {
    const isProjects = item.title === "Projects";
    const href = isProjects && Astro2.url.pathname !== "/" ? `/${item.path}` : item.path;
    return renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`hover:text-default hover:underline ${Astro2.url.pathname === item.path ? "text-default underline" : ""}`, "class")}> ${item.title} </a>`;
  })} </div> <div class="md:hidden ml-auto relative"> <button id="mobile-menu-button" class="flex items-center justify-center w-8 h-8 text-current hover:text-default focus:outline-none" aria-label="Toggle navigation menu"> <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> <div id="mobile-menu" class="hidden absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[160px] z-50"> <div class="py-2"> ${navItems.map((item) => {
    const isProjects = item.title === "Projects";
    const href = isProjects && Astro2.url.pathname !== "/" ? `/${item.path}` : item.path;
    return renderTemplate`<a${addAttribute(href, "href")}${addAttribute(`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-default ${Astro2.url.pathname === item.path ? "text-default bg-gray-50 dark:bg-gray-800" : ""}`, "class")}> ${item.title} </a>`;
  })} </div> </div> </div> </nav> ${renderScript($$result, "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/header/nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/header/nav.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const personal_urls = [
    {
      title: "Github",
      url: "https://github.com/yhoungdev"
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/emmanuel-obiabo"
    },
    {
      title: "X (Formerly Twitter)",
      url: "https://x.com/obiabo_immanuel"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "Nav", $$Nav, {})} <header class="text-center mb-12 mt-12"> <img src="https://avatars.githubusercontent.com/u/54102389?v=4" alt="Profile picture" width="80" height="80" class="rounded-lg mx-auto mb-4"> <h1 class="text-3xl font-bold mb-2">Emmanuel Obiabo</h1> <div class="flex items-center flex-wrap gap-2 justify-center"> ${personal_urls.map((items) => renderTemplate`<a class="text-default text-xs underline"${addAttribute(items.url, "href")} target="_blank">${items.title}</a>`)} </div> </header> </div>`;
}, "/Users/obiabo/Desktop/Container/personal/obiabo/src/components/header/index.astro", void 0);

export { $$Index as $ };
