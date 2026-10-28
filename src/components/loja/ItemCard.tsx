import { Link } from "react-router-dom";
import type { ItemVitrine } from "../../types/item";
import Card from "../ui/Card";

interface ItemCardProps {
  item: ItemVitrine;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="flex w-full flex-col items-center gap-2 text-secondary">
      <span className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-500">
        {item.tipo === "EXCLUSIVO" ? "Exclusivo" : "Normal"}
      </span>
      <h3 className="font-sans text-base font-semibold">{item.nome}</h3>
      <p className="font-sans text-sm text-slate-500">{item.modelo}</p>
      <p className="font-sans text-lg font-bold">{item.valorPontos} pts</p>
      {item.jaComprado && (
        <span className="font-sans text-xs font-medium text-green-600">Já está no seu inventário</span>
      )}
      <Link
        to={`/loja/${item.id}`}
        className="mt-2 rounded-full bg-primary px-5 py-2 font-sans text-sm text-white hover:bg-slate-600"
      >
        Ver detalhes
      </Link>
    </Card>
  );
}
