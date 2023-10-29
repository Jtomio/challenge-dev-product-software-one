import React from 'react'
import Image from 'next/image'
import imgSuccess from '@/assets/img-success.png'

export default function page() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <Image src={imgSuccess} width={500} alt="success" />
        <h2 className="text-2xl font-semibold">Obrigado por participar!</h2>
      </div>
    </div>
  )
}
