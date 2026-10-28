// União discriminada: a tela sempre está em exatamente um destes estados.
export type ApiState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

export interface Feedback {
  tipo: "sucesso" | "erro";
  texto: string;
}
