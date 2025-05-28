'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export async function addItem(formData: FormData) {
    
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const open_date =  formData.get('openDate') as string;
  const expiration_date = formData.get('expirationDate') as string;

  const result = await supabase.from('fridge_content').insert({
    description: formData.get('description') as string,
    expiration_date: expiration_date ? new Date(expiration_date) : null,
    open_date: open_date ? new Date(open_date) : null,
    //picture: formData.get('photo') as File | null,
    user_id : data.user.id
    });

    if(result.error) {
      console.error('Error adding item:', result.error)
     // redirect('/error')
    }else{
        console.log('Item added successfully:', result.data)
        revalidatePath('/app/dashboard', 'layout')
        redirect('/app/dashboard')
    }
}