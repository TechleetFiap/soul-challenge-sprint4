// União de tipos: um item só pode ser NORMAL ou EXCLUSIVO.
export type TipoItem = "NORMAL" | "EXCLUSIVO";

export interface Item {
  id: number;
  nome: string;
  modelo: string;
  valorPontos: number;
  tipo: TipoItem;
}

// Tipo interseção: um Item acrescido do status calculado para o usuário logado.
export type ItemVitrine = Item & { jaComprado: boolean };
