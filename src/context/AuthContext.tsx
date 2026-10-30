import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { cadastrarUsuario, entrar as entrarNaApi } from "../services/techleetService";
import type { NovoUsuario, Usuario } from "../types/usuario";

export interface AuthContextValue {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<Usuario>;
  cadastrar: (dados: NovoUsuario) => Promise<Usuario>;
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

  // O cadastro (POST /techleet/usuario) já devolve o ID preenchido, então
  // aproveitamos a resposta para logar o usuário automaticamente, sem exigir
  // uma segunda chamada a /usuario/login.
  const cadastrar = useCallback(async (dados: NovoUsuario) => {
    const criado = await cadastrarUsuario(dados);
    salvarUsuario(criado);
    setUsuario(criado);
    return criado;
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
    () => ({ usuario, entrar, cadastrar, sair, atualizarUsuario }),
    [usuario, entrar, cadastrar, sair, atualizarUsuario]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
