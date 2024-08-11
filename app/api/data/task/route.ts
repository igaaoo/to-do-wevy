import { NextResponse } from "next/server";
import { validateToken, getUserInfos } from "@/utils/jwtController";
import { PrismaClient } from '@prisma/client';
import { Tasks } from "@/types/tasks";


export async function GET(request: Request) {
  const token = request.headers.get("token");

  if (!token || !validateToken(token)) return NextResponse.json({ message: "Não Autorizado" });

  const userInfos = getUserInfos(token);

  try {
    const prisma = new PrismaClient();

    const tasks = await prisma.tasks.findMany({
      where: {
        user: userInfos.user
      }
    });

    return NextResponse.json(tasks as Tasks[]);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar tarefas" });
  }
}

export async function POST(request: Request) {
  const { token, title, description, priority } = await request.json();

  if (!token || !validateToken(token)) return NextResponse.json({ message: "Não Autorizado" });

  const userInfos = getUserInfos(token);

  try {
    const prisma = new PrismaClient();

    await prisma.tasks.create({
      data: {
        title,
        description,
        user: userInfos.user,
        priority,
        isOpen: true
      }
    });

    return NextResponse.json({ message: "Tarefa criada" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar tarefa" });
  }
}

export async function PUT(request: Request) {
  const { token, id, isOpen } = await request.json();

  if (!token || !validateToken(token)) return NextResponse.json({ message: "Não Autorizado" });

  const userInfos = getUserInfos(token);

  try {
    const prisma = new PrismaClient();

    await prisma.tasks.update({
      where: {
        id: id,
        user: userInfos.user
      },
      data: {
        isOpen
      }
    });

    return NextResponse.json({ message: "Tarefa atualizada" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar tarefa" });
  }
}



export async function DELETE(request: Request) {
  const { token, id } = await request.json();

  if (!token || !validateToken(token)) return NextResponse.json({ message: "Não Autorizado" });

  const userInfos = getUserInfos(token);

  try {
    const prisma = new PrismaClient();

    await prisma.tasks.delete({
      where: {
        id: id,
        user: userInfos.user
      }
    });

    return NextResponse.json({ message: "Tarefa deletada" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao deletar tarefa" });
  }
}
