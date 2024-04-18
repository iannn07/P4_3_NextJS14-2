'use server';

import createSupabaseServerClient from '../supabase/server';
import { unstable_noStore as no_store } from 'next/cache';

export default async function readUserSession() {
  no_store();
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}
