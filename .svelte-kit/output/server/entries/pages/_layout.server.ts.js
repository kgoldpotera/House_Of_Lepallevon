const load = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();
  let profile = null;
  if (session?.user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
    profile = data;
  }
  return {
    session,
    profile
  };
};
export {
  load
};
