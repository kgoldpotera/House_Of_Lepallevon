import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.DrCJjTn5.js","_app/immutable/chunks/DzV9Oz0k.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/wjsDZaue.js"];
export const stylesheets = ["_app/immutable/assets/Footer.CRG8fDco.css","_app/immutable/assets/2.bS5nyLav.css"];
export const fonts = [];
