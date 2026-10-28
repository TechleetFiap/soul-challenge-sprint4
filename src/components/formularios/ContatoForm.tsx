import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContatoFormData } from "../../types/contato";
import Button from "../ui/Button";

export default function ContatoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoFormData>();

  const [statusMensagem, setStatusMensagem] = useState<string>("");
  const [statusTipo, setStatusTipo] = useState<"sucesso" | "erro" | "">("");

  async function aoEnviar(dados: ContatoFormData) {
    setStatusMensagem("");
    setStatusTipo("");

    try {
      // Sem consumo de API nesta sprint: apenas simula o envio.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Dados do formulário de contato:", dados);
      setStatusMensagem("Mensagem enviada com sucesso!");
      setStatusTipo("sucesso");
      reset();
    } catch {
      setStatusMensagem("Ocorreu um erro ao enviar. Tente novamente.");
      setStatusTipo("erro");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(aoEnviar)}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
      noValidate
    >
      <label className="flex flex-col gap-1 font-sans text-sm">
        Nome*
        <input
          type="text"
          placeholder="Nome completo"
          className={`rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer ${
            errors.nome ? "border-red-500" : "border-primary"
          }`}
          {...register("nome", {
            required: "Informe seu nome.",
            minLength: { value: 2, message: "Nome muito curto." },
          })}
        />
        {errors.nome && (
          <span className="text-xs text-red-400">{errors.nome.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1 font-sans text-sm">
        E-mail*
        <input
          type="email"
          placeholder="Email"
          className={`rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer ${
            errors.email ? "border-red-500" : "border-primary"
          }`}
          {...register("email", {
            required: "Informe seu e-mail.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Informe um e-mail válido.",
            },
          })}
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1 font-sans text-sm">
        Assunto
        <input
          type="text"
          placeholder="Assunto"
          className="rounded-lg border border-primary bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer"
          {...register("assunto")}
        />
      </label>

      <label className="flex flex-col gap-1 font-sans text-sm">
        Mensagem*
        <textarea
          rows={4}
          className={`rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer ${
            errors.mensagem ? "border-red-500" : "border-primary"
          }`}
          {...register("mensagem", {
            required: "Escreva sua mensagem.",
            minLength: { value: 10, message: "Mensagem muito curta." },
          })}
        />
        {errors.mensagem && (
          <span className="text-xs text-red-400">{errors.mensagem.message}</span>
        )}
      </label>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </Button>

      {statusMensagem && (
        <p
          aria-live="polite"
          className={`font-sans text-sm ${
            statusTipo === "sucesso" ? "text-green-400" : "text-red-400"
          }`}
        >
          {statusMensagem}
        </p>
      )}
    </form>
  );
}
