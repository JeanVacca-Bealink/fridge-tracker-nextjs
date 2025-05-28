'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(peveState:  {
    message: string;
}, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { message: error.message }
    //redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/app/dashboard')
}

export async function signup(peveState:  {
    message: string;
}, formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const postData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data, error } = await supabase.auth.signUp(postData)

  console.log('Signup result:', data.user)

  if (error) {
    return { message: error.message }
    //redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/app/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  console.log('Logging out...')

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}