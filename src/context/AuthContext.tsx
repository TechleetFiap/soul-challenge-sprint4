import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { entrar as entrarNaApi } from "../services/techleetService";
import type { Usuario } from "../types/usuario";

export interface AuthContextValue {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<Usuario>;
  sair: () => void;
  atualizarUsuario: (usuario: Usuario) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CHAVE_STORAGE = "techleet:usuario";

function lerUsuarioSalvo(): Usuario | null {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? (JSON.parse(salvo) as Usuario) : null;
  } catch {
    return null;
  }
}

function salvarUsuario(usuario: Usuario | null): void {
  if (usuario) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(usuario));
  } else {
    localStorage.removeItem(CHAVE_STORAGE);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(lerUsuarioSalvo);

  const entrar = useCallback(async (email: string, senha: string) => {
    const dados = await entrarNaApi(email, senha);
    salvarUsuario(dados);
    setUsuario(dados);
    return dados;
  }, []);

  const sair = useCallback(() => {
    salvarUsuario(null);
    setUsuario(null);
  }, []);

  const atualizarUsuario = useCallback((dados: Usuario) => {
    salvarUsuario(dados);
    setUsuario(dados);
  }, []);

  const valor = useMemo(
    () => ({ usuario, entrar, sair, atualizarUsuario }),
    [usuario, entrar, sair, atualizarUsuario]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
