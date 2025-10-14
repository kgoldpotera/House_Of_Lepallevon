import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// ✅ Add multiple admin emails here
const ADMIN_EMAILS = [
  "koechmanoah32@gmail.com",
  "Mercychepkemboi2001@yahoo.com",
];

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        // ✅ Check if this user’s email is in the admin list
        const isAdmin = ADMIN_EMAILS.includes(user.email ?? "");

        if (!profile) {
          await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            role: isAdmin ? "admin" : "user",
          });
        } else if (isAdmin && profile.role !== "admin") {
          await supabase
            .from("profiles")
            .update({ role: "admin" })
            .eq("id", user.id);
        }
      }
    }
  }

  throw redirect(303, "/");
};
