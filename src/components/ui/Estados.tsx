import type { ReactNode } from "react";
import Button from "./Button";

export function EstadoCarregando() {
  return (
    <div role="status" className="py-12 text-center font-sans text-text-footer animate-pulse">
      Carregando...
    </div>
  );
}

interface EstadoErroProps {
  mensagem: string;
  onTentar: () => void;
}

export function EstadoErro({ mensagem, onTentar }: EstadoErroProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="font-sans text-red-400">{mensagem}</p>
      <Button variante="secundaria" onClick={onTentar}>
        Tentar novamente
      </Button>
    </div>
  );
}

interface EstadoVazioProps {
  texto: string;
  children?: ReactNode;
  onTentar?: () => void;
}

export function EstadoVazio({ texto, children, onTentar }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <p className="font-sans text-text-footer">{texto}</p>
      {children}
      {onTentar && (
        <Button variante="secundaria" onClick={onTentar}>
          Atualizar
        </Button>
      )}
    </div>
  );
}
