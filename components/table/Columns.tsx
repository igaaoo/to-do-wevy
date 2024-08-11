"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import axios from "axios";
import { Tasks } from "@/types/tasks";
import { getCookie } from "cookies-next";




async function removeTask(id: string) {
  const token = getCookie("tokenToDoWevy");

  try {
    await axios.delete("/api/data/task", { data: { id, token } });
  } catch (error) {
    console.log(error);
  }
  finally {
    window.location.reload();
  }
}

async function updateTask(id: string, isOpen: boolean) {
  const token = getCookie("tokenToDoWevy");

  try {
    await axios.put("/api/data/task", { id, isOpen: !isOpen, token });
  } catch (error) {
    console.log(error);
  }
  finally {
    window.location.reload();
  }
}


export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "id",
    header: () => null,
    cell: ({ row }) => (
      null
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        "Título"
      );
    },
    cell: ({ row }) => <strong>{row.getValue("title")}</strong>,
  },
  {
    accessorKey: "description",
    header: () => <div>Descrição</div>,
    cell: ({ row }) =>
      row.getValue("description")

  },

  {
    accessorKey: "priority",
    header: "Prioridade",
    cell: ({ row }) => {
      const priority = row.getValue("priority");

      return (
        <div className="flex items-center justify-center">
          {
            priority === 0 ? (
              <div className="flex items-center gap-2">
                <ArrowDown size={20} color="green" />
                <p>Baixa</p>
              </div>
            ) : priority === 1 ? (
              <div className="flex items-center gap-2">
                <ArrowUpDown size={20} color="orange" />
                <p>Média</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ArrowUp size={20} color="red" />
                <p>Alta</p>
              </div>
            )
          }
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="mb-2 "

              onClick={
                async () => await updateTask(row.getValue("id"), row.getValue("isOpen"))
              }
            >
              {
                row.getValue("isOpen") == true ? "Concluir" : "Reverter"
              }
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-600 text-white"
              onClick={async () => await removeTask(row.getValue("id"))}
            >
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "isOpen",
    header: () => null,
    cell: ({ row }) => (
      null
    ),
  },
];