import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { z } from 'zod'

// Define o schema para validação do input
const userSchema = z.object({
  username: z.string().min(1, 'Nome é obrigatório!').max(100),
  email: z.string().min(1, 'E-mail é obrigatório!').email('E-mail inválido.'),
  password: z
    .string()
    .min(1, 'Senha obrigatória!')
    .min(8, 'Senha precisar ter 8 caracteres.'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = userSchema.parse(body)

    // verifica se o e-mail já existe

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    })
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'E-mail já cadastrado.' },
        { status: 409 },
      )
    }

    // verifica se o nome já existe
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    })
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'Usuário já existe.' },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        username,
        email,
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
