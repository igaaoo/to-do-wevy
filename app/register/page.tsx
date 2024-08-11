'use client';
import axios from "axios";

import { FormEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";


export default function IndexPage() {
  const [errorUser, setErrorUser] = useState('');
  const [errorInputs, setErrorInputs] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Checa inputs
    if (user == '' || password == '') {
      setErrorInputs(true);
      return;
    }
    if (user != '' || password != '') {
      setErrorInputs(false);
    }

    setLoading(true);

    // Login com usuário e senha AD
    axios.post('/api/register', {
      user,
      password: password
    }).then((res) => {
      if (res.status === 200) {
        setLoginSuccess(true);
        setErrorUser('');
        login(res.data.token);
        window.location.href = '/';
        setLoading(false);
      }
    }
    ).catch((err) => {
      setErrorUser(err.response.data.message);
      setLoading(false);
    });
  }


  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <span className="mb-2 rounded bg-blue-700 py-0.5 text-center font-medium text-white">Realizar Cadastro</span>
          <CardTitle className="text-center text-xl">To Do List - <span className="text-pink-700">Wevy</span></CardTitle>
          <CardDescription className="text-center">Preencha os campos para criar uma conta</CardDescription>
        </CardHeader>
        <CardContent>

          {/* Alertas */}
          {errorUser && <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              {errorUser}
            </AlertDescription>
          </Alert>}

          {errorInputs ? <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Preencha todos os campos!
            </AlertDescription>
          </Alert> : null}

          {loginSuccess ? <Alert className="mb-4 border-green-500">
            <CheckCircle2 className="size-4 " color="green" />
            <AlertTitle className="text-green-500">Sucesso</AlertTitle>
            <AlertDescription className="text-green-500">
              Redirecionando para página principal...
            </AlertDescription>
          </Alert> : null}


          <form
            onSubmit={handleSubmit}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">

                <Input id="login" placeholder="Usuário" onChange={(e) => {
                  setUser(e.target.value);
                }} />
              </div>
              <div className="flex flex-col space-y-1.5">

                <Input id="password" placeholder="Senha" type="password" onChange={(e) => {
                  setPassword(e.target.value);
                }} />

              </div>

            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  const loginInput = document.getElementById('login') as HTMLInputElement | null;
                  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
                  if (loginInput && passwordInput) {
                    loginInput.value = '';
                    passwordInput.value = '';
                  }
                  setUser('');
                  setPassword('');
                }
                }>Limpar</Button>

              {loading ? (<Button type="button" disabled>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Carregando...
              </Button>) : (<Button type="submit" >Enviar</Button>)}
            </div>
          </form>
        </CardContent>
      </Card>

      <Link href="/login">
        <p className="mt-4 block text-center text-xs text-muted-foreground underline">Já é cadastrado? Clique aqui para acessar</p>
      </Link>

    </div>
  );
}