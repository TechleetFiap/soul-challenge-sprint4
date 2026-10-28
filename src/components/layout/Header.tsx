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
  "rounded-full border border-primary px-3 py-2 font-sans text-xs font-medium transition-colors hover:bg-primary/20 sm:px-4 sm:text-sm";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, sair } = useAuth();

  const links: LinkNavegacao[] = usuario
    ? [...linksNavegacao, { label: "Meu perfil", to: "/perfil" }]
    : linksNavegacao;

  // Fecha o menu mobile automaticamente sempre que a rota muda
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  function handleSair() {
    sair();
    navigate("/");
  }

  return (
    <header className="relative z-50">
      {/* Barra superior: logo, menu inline (desktop) e área de login + hamburguer à direita */}
      <div className="flex items-center justify-between px-4 sm:px-8">
        <Link to="/">
          <h1 className="py-6 font-sans text-xl sm:text-3xl">Avatar Inteligente</h1>
        </Link>

        {/* Menu inline - visível apenas em telas médias/grandes (768px+) */}
        <nav className="hidden md:flex md:gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-sans text-sm transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {usuario ? (
            <>
              <span className="hidden font-sans text-sm lg:inline">
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

          {/* Botão hamburguer - visível apenas abaixo de 768px */}
          <button
            type="button"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-controls="navegacao-mobile"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-6 w-8 shrink-0 flex-col justify-between md:hidden"
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

      {/* Menu suspenso (mobile) - overlay sobre o conteúdo */}
      <nav
        id="navegacao-mobile"
        className={`absolute inset-x-0 top-full w-full overflow-hidden bg-secondary shadow-lg transition-all duration-300 md:hidden ${
          menuAberto ? "max-h-96" : "max-h-0"
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
