import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  /** Quando true, exibe o cabeçalho grande com imagem de fundo (usado na Home) */
  heroCompleto?: boolean;
  /** Conteúdo extra exibido dentro do hero, abaixo do menu (ex: mensagem de boas-vindas) */
  hero?: ReactNode;
}

export default function Layout({ children, heroCompleto = false, hero }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <section
        id="head"
        className={
          heroCompleto
            ? "min-h-[500px] bg-head-hero bg-cover bg-center md:h-[800px]"
            : "bg-secondary-dark"
        }
      >
        <Header />
        {hero}
      </section>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
