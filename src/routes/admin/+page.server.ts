import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({
  locals: { getSession, supabase },
}) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  // Security Check: Redirect if not admin
  if (!profile || profile.role !== "admin") {
    throw redirect(303, "/");
  }

  // Fetch Bags
  const { data: bags } = await supabase
    .from("bags")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch Users (For Admin View)
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    bags: bags || [],
    users: users || [],
    userEmail: session.user.email,
  };
};

export const actions: Actions = {
  create: async ({ request, locals: { supabase, getSession } }) => {
    // ... (Keep your existing create logic exactly as is) ...
    // Just ensure you include the authentication check at the top
    const session = await getSession();
    if (!session) return fail(401, { error: "Not authenticated" });

    const formData = await request.formData();
    // ... (rest of your create code)
    // Shortened for brevity here, paste your existing create logic back

    // Placeholder return to ensure TS doesn't complain in this snippet:
    return { success: true };
  },

  update: async ({ request, locals: { supabase, getSession } }) => {
    // ... (Keep your existing update logic exactly as is) ...
    return { success: true };
  },

  delete: async ({ request, locals: { supabase, getSession } }) => {
    // ... (Keep your existing delete logic exactly as is) ...
    return { success: true };
  },

  // NEW ACTION: Promote User
  promoteUser: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) return fail(401, { error: "Not authenticated" });

    // Double check that the person performing the action is an admin
    const { data: adminProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (adminProfile?.role !== "admin") {
      return fail(403, { error: "Unauthorized" });
    }

    const formData = await request.formData();
    const userId = formData.get("user_id") as string;
    const currentRole = formData.get("current_role") as string;

    // Toggle role
    const newRole = currentRole === "admin" ? "user" : "admin";

    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      return fail(500, { error: error.message });
    }

    return { success: true };
  },
};
