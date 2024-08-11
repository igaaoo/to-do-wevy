"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";

export function CreateTaskCard() {
  const { token } = useAuthContext();
  const { updateData } = useDataContext();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    mode: 'onSubmit',
  });


  const [priority, setPriority] = useState(1);


  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;
    data.priority = priority;

    axios.post('/api/data/task', data)
      .then(async () => {
        setLoading(false);
        toast({
          title: "Tarefa criada",
          description: "Sua tarefa foi registrada e deverá aparecer na lista ao lado",
          variant: "success",
        });

        updateData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Card className="col-span-2  max-h-[450px] min-w-[300px] shadow" aria-label="createTaskCard">
      <CardHeader className="text-start">
        <CardTitle className="text-xl">
          Criar Tarefa
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar uma nova tarefa
        </CardDescription>
      </CardHeader>

      <CardContent >
        <form className="flex  w-full flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Label className="w-full">Título</Label>
          <Input placeholder="Digite aqui..." {...register("title")} id="title" required />

          <Label className="mt-2 w-full">Descrição</Label>
          <Textarea placeholder="Digite aqui..." {...register("description")} id="description" />

          <Label className="mt-2 w-full">Prioridade</Label>
          <Slider
            defaultValue={[1]}
            max={2}
            step={1}
            onValueChange={(value) => setPriority(value[0])}
          />
          <div className="flex w-full justify-between text-sm font-medium">
            <span className="text-emerald-700">Baixa</span>
            <span className="text-amber-700">Média</span>
            <span className="text-red-700">Alta</span>
          </div>


          <Button
            type="submit"
            className="mt-4 w-full bg-pink-700 text-white"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Criar Tarefa"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}