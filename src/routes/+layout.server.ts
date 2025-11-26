import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
  locals: { getSession, supabase },
}) => {
  const session = await getSession();

  let profile = null;

  if (session?.user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    }

    profile = data;

    // DEBUGGING: This will print in your VS Code terminal
    console.log("Current User Role:", profile?.role);
  }

  return {
    session,
    profile,
  };
};
