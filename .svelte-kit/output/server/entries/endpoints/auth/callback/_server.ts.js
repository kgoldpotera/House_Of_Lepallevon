import { redirect } from "@sveltejs/kit";
const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
        if (!profile) {
          await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            role: "user"
          });
        }
      }
    }
  }
  throw redirect(303, "/");
};
export {
  GET
};
