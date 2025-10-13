import { c as create_ssr_component } from "../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import "@supabase/ssr";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let profile;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ session, profile } = data);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
