// Campos conforme o JSON devolvido por /techleet/usuario (ajuste se a API mudar).
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  pontos: number;
}

export interface CredenciaisLogin {
  email: string;
  senha: string;
}
