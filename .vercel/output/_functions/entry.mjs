import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Dp0q0jrj.mjs';
import { manifest } from './manifest_BtkGUgxK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/comments.astro.mjs');
const _page3 = () => import('./pages/api/admin/comments.astro.mjs');
const _page4 = () => import('./pages/api/comments.astro.mjs');
const _page5 = () => import('./pages/api/reactions.astro.mjs');
const _page6 = () => import('./pages/notes/_slug_.astro.mjs');
const _page7 = () => import('./pages/notes.astro.mjs');
const _page8 = () => import('./pages/open-source-contributions.astro.mjs');
const _page9 = () => import('./pages/reach.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.10.0_@types+node@24.0.3_jiti@2.6.1_rollup@4.44.0_tsx@4.21.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about/index.astro", _page1],
    ["src/pages/admin/comments.astro", _page2],
    ["src/pages/api/admin/comments.ts", _page3],
    ["src/pages/api/comments.ts", _page4],
    ["src/pages/api/reactions.ts", _page5],
    ["src/pages/notes/[slug].astro", _page6],
    ["src/pages/notes/index.astro", _page7],
    ["src/pages/open-source-contributions/index.astro", _page8],
    ["src/pages/reach/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "db725b7f-84b3-42bd-b499-dab382ef802c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
