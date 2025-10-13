// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals: { getSession, supabase } }: Parameters<LayoutServerLoad>[0]) => {
  const session = await getSession();

  let profile = null;
  if (session?.user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();
    profile = data;
  }

  return {
    session,
    profile
  };
};
