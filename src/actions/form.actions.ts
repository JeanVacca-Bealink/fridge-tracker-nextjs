'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export async function addItem(formData: {
    description: string;
    expirationDate: string;
    openingDate: string;
    photo: File | null;
}) {
    
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const open_date =  formData.openingDate;
  const expiration_date = formData.expirationDate;

  const result = await supabase.from('fridge_content').insert({
    description: formData.description,
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
    }
}

export async function deleteItem(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const result = await supabase.from('fridge_content').delete().eq('id', id).eq('user_id', data.user.id)

  if (result.error) {
    console.error('Error deleting item:', result.error)
    //redirect('/error')
  } else {
    console.log('Item deleted successfully:', result.data)
    revalidatePath('/app/dashboard', 'layout')
  }
}

export async function setOpenDate(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const id = formData.get('id') as string;
  console.error('Try updating open date:',id, new Date().toISOString())
  const { error: updateError } = await supabase
    .from('fridge_content')
    .update({ open_date: new Date() })
    .eq('id', id)
    .eq('user_id', data.user.id)

  if (updateError) {
    console.error('Error updating open date:', updateError)
    //redirect('/error')
  } else {
    console.log('Open date updated successfully for item ID:', id)
    revalidatePath('/app/dashboard', 'layout')
  }
}