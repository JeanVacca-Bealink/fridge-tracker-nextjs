import PageHeader from '@/components/page-header'
import React from 'react'

function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <>
        <PageHeader />
        {children}
    </>
  )
}

export default AuthLayout