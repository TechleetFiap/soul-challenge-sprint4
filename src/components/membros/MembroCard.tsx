import { useNavigate } from "react-router-dom";
import type { Membro } from "../../types/membro";
import Card from "../ui/Card";

interface MembroCardProps {
  membro: Membro;
}

export default function MembroCard({ membro }: MembroCardProps) {
  const navigate = useNavigate();

  return (
    <Card className=" px-0 flex w-60 max-w-full flex-col items-center gap-2 text-secondary">
      <img
        src={membro.foto}
        alt={membro.nome}
        className="mb-2 h-36 w-36 rounded-full border-4 border-slate-200 object-cover"
      />
      <h3 className="font-sans text-sm font-semibold">{membro.nome}</h3>
      <p className="font-sans text-sm text-slate-500">
        {membro.rm} - {membro.turma}
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <a
          href={membro.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-[#24292f] px-3 py-2 text-xs text-text-light hover:opacity-90"
        >
          GitHub
        </a>
        <a
          href={membro.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl bg-[#0a66c2] px-3 py-2 text-xs text-text-light hover:opacity-90"
        >
          LinkedIn
        </a>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/integrantes/${membro.id}`)}
        className="mt-2 font-sans text-xs font-medium text-primary underline hover:text-slate-600"
      >
        Ver perfil completo
      </button>
    </Card>
  );
}
