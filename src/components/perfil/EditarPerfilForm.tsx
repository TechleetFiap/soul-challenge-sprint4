import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { mensagemDeErro } from "../../services/apiClient";
import { atualizarPerfil } from "../../services/techleetService";
import type { AtualizarPerfilForm, Usuario } from "../../types/usuario";
import Button from "../ui/Button";

interface EditarPerfilFormProps {
  usuario: Usuario;
  onSalvo: () => void;
  onCancelar: () => void;
}

const classeInput = (invalido: boolean) =>
  `w-full rounded-lg border px-4 py-3 text-secondary outline-none focus:border-primary ${
    invalido ? "border-red-500" : "border-slate-300"
  }`;

export default function EditarPerfilForm({ usuario, onSalvo, onCancelar }: EditarPerfilFormProps) {
  const { atualizarUsuario } = useAuth();
  const [erroApi, setErroApi] = useState<string>("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AtualizarPerfilForm>({
    defaultValues: {
      nome: usuario.nome,
      email: usuario.email,
      dataNascimento: usuario.dataNascimento,
      senhaAtual: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    },
  });

  async function aoEnviar(dados: AtualizarPerfilForm) {
    setErroApi("");
    try {
      const atualizado = await atualizarPerfil(
        usuario,
        {
          nome: dados.nome.trim(),
          email: dados.email.trim(),
          dataNascimento: dados.dataNascimento,
        },
        dados.senhaAtual,
        dados.novaSenha || undefined
      );
      atualizarUsuario(atualizado); // mantém o contexto e o localStorage em sincronia
      onSalvo();
    } catch (erro) {
      setErroApi(mensagemDeErro(erro));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(aoEnviar)}
      noValidate
      className="flex w-full flex-col gap-4 text-left"
    >
      <label className="flex flex-col gap-1 font-sans text-sm">
        Nome*
        <input
          type="text"
          autoComplete="name"
          className={classeInput(!!errors.nome)}
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
          autoComplete="email"
          className={classeInput(!!errors.email)}
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
          max={new Date().toISOString().slice(0, 10)}
          className={classeInput(!!errors.dataNascimento)}
          {...register("dataNascimento", { required: "Informe sua data de nascimento." })}
        />
        {errors.dataNascimento && (
          <span className="text-xs text-red-500">{errors.dataNascimento.message}</span>
        )}
      </label>

      <fieldset className="flex flex-col gap-4 border-t border-slate-200 pt-4">
        <legend className="sr-only">Senha</legend>

        <label className="flex flex-col gap-1 font-sans text-sm">
          Nova senha (opcional)
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Deixe em branco para manter a atual"
            className={classeInput(!!errors.novaSenha)}
            {...register("novaSenha", {
              minLength: { value: 6, message: "A senha precisa ter ao menos 6 caracteres." },
            })}
          />
          {errors.novaSenha && <span className="text-xs text-red-500">{errors.novaSenha.message}</span>}
        </label>

        <label className="flex flex-col gap-1 font-sans text-sm">
          Confirmar nova senha
          <input
            type="password"
            autoComplete="new-password"
            className={classeInput(!!errors.confirmarNovaSenha)}
            {...register("confirmarNovaSenha", {
              validate: (valor) =>
                valor === getValues("novaSenha") || "As senhas não coincidem.",
            })}
          />
          {errors.confirmarNovaSenha && (
            <span className="text-xs text-red-500">{errors.confirmarNovaSenha.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-1 font-sans text-sm">
          Senha atual* (para confirmar a alteração)
          <input
            type="password"
            autoComplete="current-password"
            className={classeInput(!!errors.senhaAtual)}
            {...register("senhaAtual", { required: "Informe sua senha atual." })}
          />
          {errors.senhaAtual && (
            <span className="text-xs text-red-500">{errors.senhaAtual.message}</span>
          )}
        </label>
      </fieldset>

      {erroApi && (
        <p role="alert" className="font-sans text-sm text-red-500">
          {erroApi}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variante="secundaria" onClick={onCancelar} disabled={isSubmitting}
          className="!text-secondary sm:order-1">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="sm:order-2">
          {isSubmitting ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
