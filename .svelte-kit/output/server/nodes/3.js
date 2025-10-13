import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.C_R82WTm.js","_app/immutable/chunks/DzV9Oz0k.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/C358f-vf.js"];
export const stylesheets = ["_app/immutable/assets/3.BlKpycSN.css"];
export const fonts = [];
