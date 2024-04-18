'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore as no_store } from 'next/cache';
import { title } from 'process';

export async function createTodo(title: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('todo')
    .insert({
      title,
    })
    .single();

  revalidatePath('/todo');
  return JSON.stringify(result);
}

export async function readTodo() {
  no_store();
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').select('*');
  return result;
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').delete().eq('id', id);
  revalidatePath('/todo');
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').update({ completed }).eq('id', id);
  revalidatePath('/todo');
}
