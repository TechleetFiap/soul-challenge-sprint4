import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";
import type { CadastroFormData } from "../types/usuario";

export default function Cadastro() {
  usePageTitle("Cadastro");

  const navigate = useNavigate();
  const { cadastrar } = useAuth();

  const [erroApi, setErroApi] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>();

  const senha = watch("senha");

  async function aoEnviar(dados: CadastroFormData) {
    setErroApi("");
    try {
      // confirmarSenha existe só para validação no front-end; a API não espera esse campo.
      const { nome, email, senha, dataNascimento } = dados;
      await cadastrar({ nome, email, senha, dataNascimento });
      navigate("/perfil", { replace: true });
    } catch (erro) {
      setErroApi(mensagemDeErro(erro));
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12">
        <Card className="flex flex-col gap-4 text-secondary">
          <h2 className="font-sans text-2xl font-bold">Criar conta</h2>

          <form onSubmit={handleSubmit(aoEnviar)} noValidate className="flex flex-col gap-4 text-left">
            <label className="flex flex-col gap-1 font-sans text-sm">
              Nome*
              <input
                type="text"
                placeholder="Seu nome completo"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.nome ? "border-red-500" : "border-slate-300"
                }`}
                {...register("nome", {
                  required: "Informe seu nome.",
                  minLength: { value: 3, message: "O nome precisa ter ao menos 3 caracteres." },
                })}
              />
              {errors.nome && <span className="text-xs text-red-500">{errors.nome.message}</span>}
            </label>

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
              Data de nascimento*
              <input
                type="date"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.dataNascimento ? "border-red-500" : "border-slate-300"
                }`}
                {...register("dataNascimento", { required: "Informe sua data de nascimento." })}
              />
              {errors.dataNascimento && (
                <span className="text-xs text-red-500">{errors.dataNascimento.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-1 font-sans text-sm">
              Senha*
              <input
                type="password"
                placeholder="Crie uma senha"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.senha ? "border-red-500" : "border-slate-300"
                }`}
                {...register("senha", {
                  required: "Crie uma senha.",
                  minLength: { value: 6, message: "A senha precisa ter ao menos 6 caracteres." },
                })}
              />
              {errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span>}
            </label>

            <label className="flex flex-col gap-1 font-sans text-sm">
              Confirmar senha*
              <input
                type="password"
                placeholder="Repita a senha"
                className={`rounded-lg border px-4 py-3 text-secondary outline-none ${
                  errors.confirmarSenha ? "border-red-500" : "border-slate-300"
                }`}
                {...register("confirmarSenha", {
                  required: "Confirme sua senha.",
                  validate: (valor) => valor === senha || "As senhas não coincidem.",
                })}
              />
              {errors.confirmarSenha && (
                <span className="text-xs text-red-500">{errors.confirmarSenha.message}</span>
              )}
            </label>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            {erroApi && (
              <p role="alert" className="font-sans text-sm text-red-500">
                {erroApi}
              </p>
            )}
          </form>

          <p className="font-sans text-sm text-slate-500">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </Card>
      </section>
    </Layout>
  );
}
