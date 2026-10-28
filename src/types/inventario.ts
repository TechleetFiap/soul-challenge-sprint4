import type { Item } from "./item";

// Aquisição feita por um usuário (linha do inventário).
export interface Inventario {
  id: number;
  idUsuario: number;
  idItem: number;
  origem: string;
}

// Tipo interseção: o item completo junto com a origem da aquisição.
export type ItemAdquirido = Item & Pick<Inventario, "origem">;
