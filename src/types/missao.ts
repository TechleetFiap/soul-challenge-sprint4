// Campos conforme os exemplos reais da collection do Postman (POST/PUT /techleet/missao).
export interface Missao {
  id: number;
  titulo: string;
  descricao: string;
  pontos: number;
  tipo: string; // ex.: "DIARIA", "SEMANAL"
}

// Status do vínculo em si (não da missão): fica EXPIRADA quando passa de dataFim
// sem ser concluído. Concluído é identificado por dataRealizacao preenchida,
// nunca por um status "CONCLUIDA".
export type StatusVinculoMissao = "DISPONIVEL" | "EXPIRADA";

// Vínculo entre um usuário e uma missão (/techleet/missaoUsuario).
export interface MissaoUsuario {
  id: number;
  idUsuario: number;
  idMissao: number;
  dataFim: string;
  dataRealizacao: string | null;
  status?: StatusVinculoMissao;
}

// Tipo interseção: a missão completa, com o vínculo do usuário logado (se existir).
export type MissaoComSituacao = Missao & { vinculo: MissaoUsuario | null };
