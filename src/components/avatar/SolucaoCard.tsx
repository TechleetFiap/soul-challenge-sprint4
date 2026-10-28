import { useNavigate } from "react-router-dom";
import type { Solucao } from "../../types/solucao";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface SolucaoCardProps {
  solucao: Solucao;
}

export default function SolucaoCard({ solucao }: SolucaoCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center gap-4 text-secondary">
      <img
        src={solucao.imagem}
        alt={solucao.titulo}
        className="h-28 w-28 rounded-full object-cover"
      />
      <h3 className="font-sans text-lg font-bold">{solucao.titulo}</h3>
      <p className="font-sans text-sm text-slate-600">{solucao.resumo}</p>
      <Button variante="primaria" onClick={() => navigate(`/solucao/${solucao.id}`)}>
        Saiba mais
      </Button>
    </Card>
  );
}
