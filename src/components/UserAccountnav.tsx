'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export default function UserAccountnav() {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/`,
        })
      }
      variant={'destructive'}
    >
      Sair
    </Button>
  )
}
