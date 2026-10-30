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

// Corpo enviado em POST /techleet/usuario. Não inclui id nem pontos:
// o ID é gerado pelo banco e os 100 pontos iniciais são definidos pelo BO.
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

// Dados do formulário de cadastro. confirmarSenha existe só para validação
// no front-end e não é enviado à API.
export interface CadastroFormData extends NovoUsuario {
  confirmarSenha: string;
}
