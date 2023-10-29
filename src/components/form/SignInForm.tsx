'use client'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

const FormSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('e-mail inválido.'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória.')
    .min(8, 'A senha deve conter no mínimo 8 caracteres.'),
})

const SignInForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const singInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (singInData?.error) {
      toast({
        title: 'Oops! Algo deu errado.',
        description: 'Confirme seu usuário e senha!',
        variant: 'destructive',
      })
    } else {
      router.refresh()
      router.push('/admin')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="mail@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Entrar
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        ou
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        faça o cadastro na nossa plataforma&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Cadastrar
        </Link>
      </p>
    </Form>
  )
}

export default SignInForm
