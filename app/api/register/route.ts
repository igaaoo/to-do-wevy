import { NextResponse } from "next/server";
import { generateToken } from "@/utils/jwtController";
import { PrismaClient } from '@prisma/client';

function validateUser(user: string, password: string) {
  if (!user || !password) throw new Error('Preencha todos os campos');
  if (user.length < 3) throw new Error('Usuário deve ter no mínimo 3 caracteres');
  if (password.length < 6) throw new Error('Senha deve ter no mínimo 6 caracteres');

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]*$/.test(user)) throw new Error('Usuário deve conter apenas letras maiúsculas, minúsculas e números');
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]*$/.test(password)) throw new Error('Senha deve conter letras maiúsculas, minúsculas e números');
  if (!/^[a-zA-Z0-9]*$/.test(user)) throw new Error('Usuário deve conter apenas letras maiúsculas, minúsculas e números');
}

async function createUser(user: string, password: string) {
  const prisma = new PrismaClient();

  try {
    await prisma.user.create({
      data: {
        user: user,
        password: password
      }
    });
  } catch (error) {
    throw new Error('Nome de usuário já cadastrado');
  }
}


export async function POST(request: Request, response: NextResponse) {
  const { user, password } = await request.json();

  try {
    validateUser(user, password);

    await createUser(user, password);
    const userJWT = generateToken({ user: user });

    return NextResponse.json({ message: "Usuário cadastrado, realizando login...", token: userJWT }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
