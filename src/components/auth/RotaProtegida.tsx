import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface RotaProtegidaProps {
  children: ReactNode;
}

// Quem não está logado é redirecionado ao login, com mensagem e rota de retorno.
export default function RotaProtegida({ children }: RotaProtegidaProps) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, mensagem: "Faça login para acessar esta página." }}
      />
    );
  }

  return <>{children}</>;
}
