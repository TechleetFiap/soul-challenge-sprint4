import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LinkNavegacao {
  label: string;
  to: string;
}

const linksNavegacao: LinkNavegacao[] = [
  { label: "Sobre", to: "/sobre" },
  { label: "Integrantes", to: "/integrantes" },
  { label: "Solução", to: "/solucao" },
  { label: "Loja", to: "/loja" },
  { label: "Missões", to: "/missoes" },
  { label: "Contato", to: "/contato" },
  { label: "FAQ", to: "/faq" },
];

const classesBotaoLogin =
  "shrink-0 rounded-full border border-primary px-3 py-2 font-sans text-xs font-medium transition-colors hover:bg-primary/20 sm:px-4 sm:text-sm";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, sair } = useAuth();

  // Com login incluso, são 8 abas: o menu em linha só cabe a partir de telas grandes (lg).
  // Abaixo disso (inclusive tablets), usa o hambúrguer.
  const links: LinkNavegacao[] = usuario
    ? [...linksNavegacao, { label: "Meu perfil", to: "/perfil" }]
    : linksNavegacao;

  // Fecha o menu mobile automaticamente sempre que a rota muda
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  // Trava a rolagem do fundo enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  // Fecha com a tecla Esc
  useEffect(() => {
    if (!menuAberto) return;
    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", aoPressionarTecla);
    return () => window.removeEventListener("keydown", aoPressionarTecla);
  }, [menuAberto]);

  function handleSair() {
    sair();
    navigate("/");
  }

  return (
    <header className="relative z-50">
      {/* Barra superior: logo, menu inline (desktop grande) e área de login + hamburguer à direita */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-8">
        <Link to="/" className="min-w-0 shrink">
          <h1 className="truncate py-6 font-sans text-lg sm:text-2xl lg:text-3xl">
            Avatar Inteligente
          </h1>
        </Link>

        {/* Menu inline - só visível em telas grandes (1024px+), onde todas as 8 abas cabem */}
        <nav className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="whitespace-nowrap font-sans text-sm transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {usuario ? (
            <>
              <span className="max-w-[72px] truncate font-sans text-xs sm:max-w-[160px] sm:text-sm">
                Olá, {usuario.nome.split(" ")[0]}
              </span>
              <button type="button" onClick={handleSair} className={classesBotaoLogin}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className={classesBotaoLogin}>
              Entrar
            </Link>
          )}

          {/* Botão hamburguer - visível abaixo de 1024px (inclui tablets) */}
          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-controls="navegacao-mobile"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-6 w-8 shrink-0 flex-col justify-between lg:hidden"
          >
            <span
              className={`block h-[3px] w-full rounded bg-white transition-transform ${
                menuAberto ? "translate-y-[10.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-full rounded bg-white transition-opacity ${
                menuAberto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-full rounded bg-white transition-transform ${
                menuAberto ? "-translate-y-[10.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Fundo escurecido atrás do menu suspenso, para fechar ao tocar fora dele */}
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMenuAberto(false)}
        className={`fixed inset-0 top-full bg-black/40 transition-opacity lg:hidden ${
          menuAberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Menu suspenso (mobile/tablet) - altura relativa à tela, com rolagem própria
          se o conteúdo não couber inteiro (telas muito baixas) */}
      <nav
        id="navegacao-mobile"
        className={`absolute inset-x-0 top-full w-full overflow-y-auto overflow-x-hidden bg-secondary shadow-lg transition-all duration-300 lg:hidden ${
          menuAberto ? "max-h-[70vh]" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block border-t border-primary px-5 py-4 font-sans text-base transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
