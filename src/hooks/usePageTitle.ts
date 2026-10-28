import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const faviconPorRota: Record<string, string> = {
  home: "/imagens/IconeHome.png",
  usuario: "/imagens/IconeUser.png",
  sobre: "/imagens/IconeSobre.png",
  solucao: "/imagens/IconeSolucao.png",
  contato: "/imagens/IconeTelefone.png",
  faq: "/imagens/IconeInterrogacao.png",
};

function obterFavicon(pathname: string): string {
  if (pathname === "/") {
    return faviconPorRota.home;
  }

  if (pathname === "/contato") {
    return faviconPorRota.contato;
  }

  if (pathname === "/faq" || pathname === "/404") {
    return faviconPorRota.faq;
  }

  if (pathname === "/sobre") {
    return faviconPorRota.sobre;
  }

  if (pathname.startsWith("/integrantes")) {
    return faviconPorRota.usuario;
  }

  if (pathname === "/solucao" || pathname.startsWith("/solucao/")) {
    return faviconPorRota.solucao;
  }

  return faviconPorRota.home;
}

/**
 * Atualiza o título da aba do navegador sempre que o componente que o chama
 * for montado ou quando o parâmetro `titulo` mudar.
 */
export function usePageTitle(titulo: string): void {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${titulo} | Avatar Inteligente`;

    const favicon =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.head.appendChild(document.createElement("link"));

    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = obterFavicon(pathname);

    return () => {
      document.title = "Avatar Inteligente | SoulUp";
    };
  }, [pathname, titulo]);
}