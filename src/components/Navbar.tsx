import Link from 'next/link'
import { Button } from './ui/button'
import { HandMetal } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import UserAccountnav from './UserAccountnav'

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="container fixed top-0 z-10 mb-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal className="text-red-600" />
        </Link>
        <div className="flex items-center gap-10">
          <Link href="/">Home</Link>

          <Link href="/admin">Campanha</Link>
          {session?.user ? (
            <UserAccountnav />
          ) : (
            <Link href="/sign-in">
              <Button variant={'outline'}>Entar</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
