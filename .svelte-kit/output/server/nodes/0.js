import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BhMN4uXx.js","_app/immutable/chunks/DzV9Oz0k.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/UISnZMS-.js","_app/immutable/chunks/BwNcEr-W.js","_app/immutable/chunks/C1FmrZbK.js"];
export const stylesheets = [];
export const fonts = [];
