import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import ImgSignin from '@/assets/Img-signin.png'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import NotificationsForm from '@/components/Notification-form'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={ImgSignin} width={250} alt="signIn" />
        <h2 className="text-center">
          Por favor faça o{' '}
          <Link href="/" className="text-indigo-500 underline">
            login
          </Link>{' '}
          para ter acesso a votação
        </h2>
      </div>
    )
  }
  return (
    <div className="container">
      <div className="mt-40">
        <h2 className="text-2xl font-bold tracking-tight">Seja bem vindo</h2>
        <p className=""> {session?.user.username}</p>
      </div>
      <Separator className="my-6" />
      <NotificationsForm />
    </div>
  )
}
