import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin') {
    throw redirect(303, '/');
  }

  const { data: bags } = await supabase
    .from('bags')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    bags: bags || []
  };
};

export const actions: Actions = {
  create: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const in_stock = formData.get('in_stock') === 'true';
    const imageFile = formData.get('image') as File;

    let image_url = '';

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bag-images')
        .upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        return { success: false, error: `Upload failed: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from('bag-images')
        .getPublicUrl(filePath);

      image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('bags').insert({
      name,
      description,
      price: parseFloat(price),
      image_url,
      in_stock,
      created_by: session.user.id
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  update: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const in_stock = formData.get('in_stock') === 'true';
    const imageFile = formData.get('image') as File;
    let image_url = formData.get('existing_image_url') as string;

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bag-images')
        .upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) {
        return { success: false, error: `Upload failed: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabase.storage
        .from('bag-images')
        .getPublicUrl(filePath);

      image_url = publicUrlData.publicUrl;

      if (formData.get('existing_image_url')) {
        const oldImageUrl = formData.get('existing_image_url') as string;
        if (oldImageUrl.includes('bag-images')) {
          const oldFileName = oldImageUrl.split('/').pop();
          if (oldFileName) {
            await supabase.storage.from('bag-images').remove([oldFileName]);
          }
        }
      }
    }

    const { error } = await supabase
      .from('bags')
      .update({
        name,
        description,
        price: parseFloat(price),
        image_url,
        in_stock,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  delete: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const formData = await request.formData();
    const id = formData.get('id') as string;
    const image_url = formData.get('image_url') as string;

    if (image_url && image_url.includes('bag-images')) {
      const fileName = image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('bag-images').remove([fileName]);
      }
    }

    const { error } = await supabase.from('bags').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }
};
