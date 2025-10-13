import { redirect } from "@sveltejs/kit";
const POST = async ({ locals: { supabase } }) => {
  await supabase.auth.signOut();
  throw redirect(303, "/");
};
export {
  POST
};
