// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals: { supabase } }: Parameters<PageServerLoad>[0]) => {
  const { data: bags } = await supabase
    .from('bags')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    bags: bags || []
  };
};
