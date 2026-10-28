import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";
import type { CredenciaisLogin } from "../types/usuario";

// Informações enviadas por quem redireciona para o login (ex.: RotaProtegida).
interface EstadoDeOrigem {
  from?: string;
  mensagem?: string;
}

export default function Login() {
  usePageTitle("Entrar");

  const navigate = useNavigate();
  const location = useLocation();
  const { entrar } = useAuth();
  const origem = (location.state ?? {}) as EstadoDeOrigem;

  const [erroApi, setErroApi] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CredenciaisLogin>();

  async function aoEnviar(dados: CredenciaisLogin) {
    setErroApi("");
    try {
      await entrar(dados.email, dados.senha);
      navigate(origem.from ?? "/perfil", { replace: true });
    } catch (erro) {
      setErroApi(mensagemDeErro(erro));
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12">
        <Card className="flex flex-col gap-4 text-secondary">
          <h2 className="font-sans text-2xl font-bold">Entrar</h2>

          {origem.mensagem && (
            <p className="rounded-lg bg-amber-50 px-4 py-3 text-left font-sans text-sm text-amber-800">
              {origem.mensagem}
            </p>
          )}

          <form onSubmit={handleSubmit(aoEnviar)} noValidate className="flex flex-col gap-4 text-left">
            <label className="flex flex-col gap-1 font-sans text-sm">
              E-mail*
              <input
                type="email"
                placeholder="seu@email.com"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.email ? "border-red-500" : "border-slate-300"
                }`}
                {...register("email", {
                  required: "Informe seu e-mail.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Informe um e-mail válido.",
                  },
                })}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </label>

            <label className="flex flex-col gap-1 font-sans text-sm">
              Senha*
              <input
                type="password"
                placeholder="Sua senha"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.senha ? "border-red-500" : "border-slate-300"
                }`}
                {...register("senha", { required: "Informe sua senha." })}
              />
              {errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span>}
            </label>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            {erroApi && (
              <p role="alert" className="font-sans text-sm text-red-500">
                {erroApi}
              </p>
            )}
          </form>
        </Card>
      </section>
    </Layout>
  );
}
