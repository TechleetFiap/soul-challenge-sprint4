import { useState } from "react";
import Button from "../ui/Button";

type Acessorio = "oculos" | "bone" | "ambos" | "nenhum";

export default function AvatarCustomizer() {
  const [acessorio, setAcessorio] = useState<Acessorio>("nenhum");

  const mostrarOculosIsolado = acessorio === "oculos";
  const mostrarBoneIsolado = acessorio === "bone";
  const mostrarAmbos = acessorio === "ambos";

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h2 className="font-sans text-2xl">Customize seu Avatar</h2>

      <div className="relative h-64 w-64">
        <img
          src="/imagens/AvatarF-Base.jpg"
          alt="Avatar base"
          className="absolute inset-0 h-full w-full rounded-full object-cover"
        />
        {mostrarOculosIsolado && (
          <img
            src="/imagens/AvatarF-1.png"
            alt="Avatar com óculos"
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
        {mostrarBoneIsolado && (
          <img
            src="/imagens/AvatarF-2.png"
            alt="Avatar com boné"
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
        {mostrarAmbos && (
          <img
            src="/imagens/AvatarF-3.png"
            alt="Avatar com boné e óculos"
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          aria-label="Adicionar óculos"
          onClick={() => setAcessorio("oculos")}
          className="rounded-full bg-white/10 p-3 text-2xl hover:bg-white/20"
        >
          🕶️
        </button>
        <button
          type="button"
          aria-label="Adicionar boné"
          onClick={() => setAcessorio("bone")}
          className="rounded-full bg-white/10 p-3 text-2xl hover:bg-white/20"
        >
          🎩
        </button>
        <Button variante="primaria" onClick={() => setAcessorio("ambos")}>
          Adicionar Ambos
        </Button>
        <Button variante="secundaria" onClick={() => setAcessorio("nenhum")}>
          Limpar Tudo
        </Button>
      </div>
    </div>
  );
}
