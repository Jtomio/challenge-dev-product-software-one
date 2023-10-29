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
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username é obrigatório!').max(100),
    email: z.string().min(1, 'Email é obrigatório').email('E-mail inválido!'),
    cpf: z
      .string()
      .min(1, 'Cpf é obrigatório')
      .min(11, 'Deve conter 11 números')
      .max(11),
    password: z
      .string()
      .min(1, 'Senha é obrigatória!')
      .min(8, 'A senha deve conter no mínimo 8 caracteres.'),
    confirmPassword: z.string().min(1, 'Confimação de senha é obrigatória!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Diferença nas senhas',
  })

const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        cpf: values.cpf,
        password: values.password,
      }),
    })

    if (response.ok) {
      router.push('/sign-in')
    } else {
      toast({
        title: 'Oops! Algo deu errado.',
        description: 'Confirme seu usuário e senha!',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cpf</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678901" {...field} />
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
                    <Input type="password" placeholder="Sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cofirme a senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirmação de senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-6 w-full" type="submit">
            Cadastrar
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          ou
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Se já tem cadastro?
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Entrar
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUpForm
