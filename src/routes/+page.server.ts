import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: bags } = await supabase
    .from('bags')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    bags: bags || []
  };
};
