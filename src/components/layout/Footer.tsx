export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-8 bg-secondary-dark px-4 py-8 md:h-52 md:flex-row md:gap-0 md:py-0">
      <div className="flex w-full flex-col items-center gap-2 border-b border-slate-400 pb-6 text-center md:h-[70%] md:w-1/2 md:border-b-0 md:border-r md:pb-0">
        <div className="flex items-center gap-4">
          <img src="/imagens/TechLeet.png" alt="TechLeet" className="h-16 md:h-24" />
          <img src="/imagens/SoulUp.png" alt="SoulUp" className="h-16 md:h-24" />
        </div>
        <p className="font-sans text-sm text-text-footer">
          Copyright © 2026 TechLeet. Todos os direitos reservados.
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-3 text-center md:h-[70%] md:w-1/2">
        <h3 className="font-sans text-xl text-text-footer md:text-2xl">Suporte</h3>
        <div className="flex items-center justify-center gap-2">
          <img
            src="/imagens/teams.png"
            alt="Teams"
            className="h-5 w-5 rounded border-2 border-gray-300 bg-white"
          />
          <a
            href="https://teams.microsoft.com/l/chat/48:notes/conversations?context=%7B%22contextType%22%3A%22chat%22%7D"
            className="font-sans text-text-footer hover:underline"
          >
            Teams
          </a>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src="/imagens/emailPreto.png"
            alt="e-mail"
            className="h-5 w-5 rounded border-2 border-gray-300 bg-white"
          />
          <a
            href="mailto:rm570024@fiap.com.br"
            className="font-sans text-text-footer hover:underline"
          >
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
}
