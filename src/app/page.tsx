import Image from 'next/image'
import ImgHome from '@/assets/img-home.png'
import SignInForm from '@/components/form/SignInForm'

export default async function Home() {
  return (
    <div className="container">
      <div className="relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-screen flex-col bg-[#000] p-10 py-32 text-white dark:border-r md:flex lg:flex">
          <div className="absolute inset-0 h-screen  sm:hidden md:hidden lg:hidden" />
          <div className="relative z-20 flex items-center justify-center py-4 text-xl font-medium md:hidden lg:flex">
            <Image src={ImgHome} width={400} alt="icon fire" />
          </div>
          <div className="relative z-20 mt-auto hidden md:flex">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Faça parte você também do sucesso de nossa companhia,
                participe de nossas campanhas.&rdquo;
              </p>
              <footer className="text-sm">RH sempre ao seu lado.</footer>
            </blockquote>
          </div>
        </div>
        <div className="py-32 ">
          <div className="relative z-20 m-32 flex items-center justify-center border-b border-t border-b-primary border-t-primary py-4 text-xl font-medium md:hidden lg:hidden">
            <h1 className="text-bold">
              RH <span className="text-primary">sempre ao seu lado</span>
            </h1>
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center justify-center gap-6 space-y-2">
              <Image
                src={ImgHome}
                width={200}
                alt="imgHOme"
                className=" lg:hidden"
              />
              <p className="text-sm text-muted-foreground">
                Entre com seu e-mail de login
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}
