const load = async ({ locals: { supabase } }) => {
  const { data: bags } = await supabase.from("bags").select("*").order("created_at", { ascending: false });
  return {
    bags: bags || []
  };
};
export {
  load
};
