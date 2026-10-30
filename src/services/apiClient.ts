// Cliente HTTP central. Todas as chamadas usam caminho relativo (/techleet/...):
// em desenvolvimento o Vite faz o proxy, em produção o vercel.json faz o rewrite.
const PREFIXO_API = "/techleet";

const CABECALHOS: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Extrai a mensagem do corpo do erro. Aceita texto simples ou JSON com campo "message".
// Erros padrão do Spring (sem "message") devolvem "" e caem na mensagem padrão.
function extrairMensagem(corpo: string): string {
  if (!corpo) return "";
  try {
    const dados = JSON.parse(corpo) as { message?: unknown };
    return typeof dados.message === "string" ? dados.message : "";
  } catch {
    return corpo;
  }
}

function mensagemPadrao(status: number): string {
  if (status === 400) return "A operação não foi concluída. Verifique os dados ou as regras da operação.";
  if (status === 404) return "Registro não encontrado.";
  if (status >= 500) return "Erro no servidor. Tente novamente em instantes.";
  return `Erro na requisição (${status}).`;
}

// Falhas que costumam ser passageiras (servidor acordando, proxy sem resposta).
const STATUS_TRANSITORIOS = [0, 502, 503, 504];
// Sem limite de tempo por chamada, então as tentativas extras servem para o caso
// de a conexão cair de fato (não para "esperar mais"); mantemos uma pausa entre elas.
const TENTATIVAS_LEITURA = 5;

export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  // Só repete leituras (GET): repetir POST poderia duplicar uma compra.
  const metodo = (opcoes.method ?? "GET").toUpperCase();
  const tentativasMaximas = metodo === "GET" ? TENTATIVAS_LEITURA : 1;

  for (let tentativa = 1; ; tentativa++) {
    try {
      return await executar<T>(caminho, opcoes);
    } catch (erro) {
      const transitorio = erro instanceof ApiError && STATUS_TRANSITORIOS.includes(erro.status);
      if (!transitorio || tentativa >= tentativasMaximas) throw erro;
      await new Promise((resolve) => setTimeout(resolve, 800 * tentativa));
    }
  }
}

async function executar<T>(caminho: string, opcoes: RequestInit): Promise<T> {
  // Sem limite de tempo aqui: espera o quanto a API precisar para responder
  // (o Render pode demorar para "acordar" ou para montar uma resposta grande).
  let res: Response;
  try {
    res = await fetch(`${PREFIXO_API}${caminho}`, { headers: CABECALHOS, ...opcoes });
  } catch {
    // Só cai aqui quando não há resposta nenhuma: servidor fora do ar ou proxy sem destino.
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  if (!res.ok) {
    // A API pode devolver texto simples nos erros.
    const corpo = await res.text();
    throw new ApiError(extrairMensagem(corpo) || mensagemPadrao(res.status), res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  // Alguns PUT/POST respondem 201 sem corpo; ler como texto evita erro de JSON vazio.
  const corpo = await res.text();
  return (corpo ? JSON.parse(corpo) : undefined) as T;
}

export function mensagemDeErro(erro: unknown): string {
  return erro instanceof Error ? erro.message : "Ocorreu um erro inesperado.";
}
