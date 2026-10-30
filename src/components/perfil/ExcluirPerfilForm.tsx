import { useState } from "react";
import { useForm } from "react-hook-form";
import { mensagemDeErro } from "../../services/apiClient";
import { excluirPerfil } from "../../services/techleetService";
import type { Usuario } from "../../types/usuario";
import Button from "../ui/Button";

interface ExcluirPerfilFormProps {
  usuario: Usuario;
  onExcluido: () => void;
  onCancelar: () => void;
}

interface ExcluirPerfilFormData {
  senha: string;
}

export default function ExcluirPerfilForm({ usuario, onExcluido, onCancelar }: ExcluirPerfilFormProps) {
  const [erroApi, setErroApi] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExcluirPerfilFormData>({ defaultValues: { senha: "" } });

  async function aoEnviar({ senha }: ExcluirPerfilFormData) {
    setErroApi("");
    try {
      await excluirPerfil(usuario, senha);
      onExcluido();
    } catch (erro) {
      setErroApi(mensagemDeErro(erro));
    }
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} noValidate className="flex w-full flex-col gap-4 text-left">
      <p className="rounded-lg bg-red-50 px-4 py-3 font-sans text-sm text-red-800">
        Tem certeza que deseja excluir o cadastro de <strong>{usuario.nome}</strong>? Esta ação é
        permanente e não pode ser desfeita: você perderá o acesso, seus pontos e seus itens.
      </p>

      <label className="flex flex-col gap-1 font-sans text-sm">
        Digite sua senha para confirmar*
        <input
          type="password"
          autoComplete="current-password"
          className={`w-full rounded-lg border px-4 py-3 text-secondary outline-none focus:border-primary ${
            errors.senha ? "border-red-500" : "border-slate-300"
          }`}
          {...register("senha", { required: "Informe sua senha para confirmar." })}
        />
        {errors.senha && <span className="text-xs text-red-500">{errors.senha.message}</span>}
      </label>

      {erroApi && (
        <p role="alert" className="font-sans text-sm text-red-500">
          {erroApi}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variante="secundaria"
          onClick={onCancelar}
          disabled={isSubmitting}
          className="!text-secondary sm:order-1"
        >
          Cancelar
        </Button>
        <Button type="submit" variante="perigo" disabled={isSubmitting} className="sm:order-2">
          {isSubmitting ? "Excluindo..." : "Excluir definitivamente"}
        </Button>
      </div>
    </form>
  );
}
