import type { Feedback } from "../../types/requisicao";
import type { MissaoComSituacao } from "../../types/missao";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface MissaoCardProps {
  missao: MissaoComSituacao;
  logado: boolean;
  processando: boolean;
  feedback: Feedback | null;
  onConcluir: () => void;
}

export default function MissaoCard({
  missao,
  logado,
  processando,
  feedback,
  onConcluir,
}: MissaoCardProps) {
  const concluida = Boolean(missao.vinculo?.dataRealizacao);
  const expirada = !concluida && missao.vinculo?.status === "EXPIRADA";

  return (
    <Card className="flex w-full flex-col items-center gap-2 text-secondary">
      <span
        className={`rounded-full px-3 py-1 font-sans text-xs ${
          concluida
            ? "bg-green-100 text-green-700"
            : expirada
              ? "bg-red-100 text-red-600"
              : "bg-slate-100 text-slate-500"
        }`}
      >
        {concluida ? "Concluída" : expirada ? "Expirada" : "Disponível"}
      </span>
      <h3 className="font-sans text-base font-semibold">{missao.titulo}</h3>
      <p className="font-sans text-sm text-slate-500">{missao.descricao}</p>
      <p className="font-sans text-lg font-bold">+{missao.pontos} pts</p>

      {feedback && (
        <p
          role={feedback.tipo === "erro" ? "alert" : "status"}
          className={`font-sans text-xs ${
            feedback.tipo === "sucesso" ? "text-green-600" : "text-red-500"
          }`}
        >
          {feedback.texto}
        </p>
      )}

      {logado && (
        <Button
          onClick={onConcluir}
          disabled={concluida || expirada || processando}
          className="mt-2"
        >
          {concluida ? "Concluída" : expirada ? "Expirada" : processando ? "Concluindo..." : "Concluir"}
        </Button>
      )}
    </Card>
  );
}
