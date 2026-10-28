import type { PerguntaFrequente } from "../../types/faq";
import FaqItem from "./FaqItem";

interface FaqListProps {
  itens: PerguntaFrequente[];
}

export default function FaqList({ itens }: FaqListProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      {itens.map((item) => (
        <FaqItem key={item.id} item={item} />
      ))}
    </div>
  );
}
