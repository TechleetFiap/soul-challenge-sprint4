const palavrasCarrossel: string[] = [
  "Avatar Inteligente",
  "Inovação",
  "Modelagem 3D",
  "Criatividade",
  "Diversidade",
  "Personalização",
  "Comunidade",
];

function TrilhaDePalavras() {
  return (
    <>
      {palavrasCarrossel.map((palavra) => (
        <span key={palavra} className="flex shrink-0 items-center gap-8 sm:gap-10">
          <span className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-text-footer transition-colors hover:text-text-light sm:text-base">
            {palavra}
          </span>
          <span aria-hidden="true" className="text-primary">
            ✦
          </span>
        </span>
      ))}
    </>
  );
}

export default function WordCarousel() {
  return (
    <div className="relative overflow-hidden border-y border-primary/20 bg-secondary-dark py-6">
      {/* Fades nas bordas para suavizar a entrada/saída das palavras */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-secondary-dark to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-secondary-dark to-transparent sm:w-28" />

      <div className="flex w-max animate-carrossel items-center gap-8 whitespace-nowrap sm:gap-10">
        <TrilhaDePalavras />
        <TrilhaDePalavras />
      </div>
    </div>
  );
}
