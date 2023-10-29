import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { z } from 'zod'

// Define o schema para validação do input do cadastro
const userSchema = z.object({
  username: z.string().min(1, 'Nome é obrigatório!').max(100),
  email: z.string().min(1, 'E-mail é obrigatório!').email('E-mail inválido.'),
  cpf: z
    .string()
    .min(1, 'Cpf é obrigatório!')
    .min(11, 'Digite apenas os números')
    .max(11)
    .refine((cpf) => {
      const numberRegex = /^[0-9]+$/
      return numberRegex.test(cpf)
    }, 'O CPF deve conter apenas números'),
  password: z
    .string()
    .min(1, 'Senha obrigatória!')
    .min(8, 'Senha precisar ter 8 caracteres.'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, cpf, password } = userSchema.parse(body)

    // verifica se o e-mail já existe

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    })
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'E-mail já cadastrado. Faça o login na sua conta',
        },
        { status: 409 },
      )
    }

    // verifica se o nome já existe
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    })
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'Usuário já existe. Faça o login na sua conta' },
        { status: 409 },
      )
    }
    // verifica se o cpf já existe
    const existingUserByUserCpf = await db.user.findUnique({
      where: { cpf },
    })
    if (existingUserByUserCpf) {
      return NextResponse.json(
        { user: null, message: 'CPF já existe. Faça o login na sua conta' },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        username,
        email,
        cpf,
        password: hashedPassword,
      },
    })
    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      {
        user: rest,
        message: 'Usuário criado com sucesso!',
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: 'Algo deu errado!' }, { status: 500 })
  }
}
