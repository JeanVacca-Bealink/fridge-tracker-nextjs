import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log('User data:', data.user)

  return (
    <div className='flex justify-center items-center'>
      <h1 className='text-white text-3xl font-bold'>Hello {data.user.email}</h1>
    </div>
  )
}