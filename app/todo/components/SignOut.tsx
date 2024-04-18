import { Button } from '@/components/ui/button';
import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const SignOut = () => {
  const logout = async () => {
    'use server';
    console.log('logging out');
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    redirect('/auth-server-action');
  };

  return (
    <form action={logout}>
      <Button type='submit'>Sign Out</Button>
    </form>
  );
};

export default SignOut;
