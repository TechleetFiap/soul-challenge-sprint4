import { useState } from "react";
import type { PerguntaFrequente } from "../../types/faq";

interface FaqItemProps {
  item: PerguntaFrequente;
}

export default function FaqItem({ item }: FaqItemProps) {
  const [aberto, setAberto] = useState<boolean>(false);

  return (
    <div className="border-b border-primary/40 py-4">
      <button
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <h3 className="font-sans text-base sm:text-lg">{item.pergunta}</h3>
        <span className="shrink-0 text-2xl">{aberto ? "−" : "+"}</span>
      </button>
      {aberto && (
        <div className="pt-3">
          <p className="font-sans text-sm text-text-footer sm:text-base">{item.resposta}</p>
        </div>
      )}
    </div>
  );
}
