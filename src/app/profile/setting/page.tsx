import React from 'react'
import PhoneAndEmail from './PhoneAndEmail'
import PasswordManager from './PasswordManager'

export default function page() {
  return (
    <main className='flex flex-col gap-5 p-2 py-5 max-w-[30rem]'>
      <PhoneAndEmail />
      <PasswordManager />
    </main>
  )
}

