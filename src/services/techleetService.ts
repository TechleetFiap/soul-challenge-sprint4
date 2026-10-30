import { requisitar } from "./apiClient";
import type { NovoUsuario, Usuario } from "../types/usuario";
import type { Item, ItemVitrine } from "../types/item";
import type { Inventario, ItemAdquirido } from "../types/inventario";
import type { Missao, MissaoComSituacao, MissaoUsuario } from "../types/missao";

// ---------- Usuário ----------

export function entrar(email: string, senha: string): Promise<Usuario> {
  return requisitar<Usuario>("/usuario/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export function buscarUsuario(id: number): Promise<Usuario> {
  return requisitar<Usuario>(`/usuario/${id}`);
}

// Cadastro de usuário: POST /techleet/usuario. Não existe rota separada
// /cadastro ou /register. Não enviamos id (gerado pelo banco) nem pontos
// (os 100 pontos iniciais são definidos pelo BO).
export function cadastrarUsuario(dados: NovoUsuario): Promise<Usuario> {
  return requisitar<Usuario>("/usuario", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

// ---------- Itens ----------

export function listarItens(): Promise<Item[]> {
  return requisitar<Item[]>("/item");
}

export function buscarItem(id: number): Promise<Item> {
  return requisitar<Item>(`/item/${id}`);
}

// ---------- Inventário (compras) ----------

export function listarInventario(): Promise<Inventario[]> {
  return requisitar<Inventario[]>("/inventario");
}

export function comprarItem(idUsuario: number, idItem: number): Promise<Inventario> {
  return requisitar<Inventario>("/inventario", {
    method: "POST",
    body: JSON.stringify({ idUsuario, idItem, origem: "COMPRA" }),
  });
}

// ---------- Composições para as telas ----------

// Vitrine da loja: marca cada item conforme o usuário já o possui.
export async function carregarVitrine(idUsuario?: number): Promise<ItemVitrine[]> {
  const [itens, inventario] = await Promise.all([
    listarItens(),
    idUsuario !== undefined ? listarInventario() : Promise.resolve<Inventario[]>([]),
  ]);

  const idsComprados = new Set(
    inventario.filter((aquisicao) => aquisicao.idUsuario === idUsuario).map((aquisicao) => aquisicao.idItem)
  );

  return itens.map((item) => ({ ...item, jaComprado: idsComprados.has(item.id) }));
}

// Itens que pertencem a um usuário, com a origem de cada aquisição.
// Se a listagem do catálogo não trouxer um item, tenta buscá-lo pelo ID antes de desistir.
export async function carregarItensDoUsuario(idUsuario: number): Promise<ItemAdquirido[]> {
  const [itens, inventario] = await Promise.all([listarItens(), listarInventario()]);
  const meuInventario = inventario.filter((aquisicao) => aquisicao.idUsuario === idUsuario);

  const idsFaltantes = [...new Set(meuInventario.map((a) => a.idItem))].filter(
    (id) => !itens.some((item) => item.id === id)
  );

  const resgatados = await Promise.all(
    idsFaltantes.map((id) => buscarItem(id).catch((): Item | null => null))
  );

  const catalogo: Item[] = [...itens, ...resgatados.filter((item): item is Item => item !== null)];

  return meuInventario.map((aquisicao) => {
    const item = catalogo.find((i) => i.id === aquisicao.idItem);
    if (item) {
      return { ...item, origem: aquisicao.origem };
    }
    // Item não existe mais no catálogo: mantém a compra visível, com aviso.
    return {
      id: aquisicao.idItem,
      nome: `Item #${aquisicao.idItem}`,
      modelo: "Indisponível no catálogo",
      valorPontos: 0,
      tipo: "NORMAL" as const,
      origem: aquisicao.origem,
    };
  });
}

// ---------- Missões ----------

export function listarMissoes(): Promise<Missao[]> {
  return requisitar<Missao[]>("/missao");
}

export function listarMissoesUsuario(): Promise<MissaoUsuario[]> {
  return requisitar<MissaoUsuario[]>("/missaoUsuario");
}

// Missões disponíveis, cada uma com o vínculo do usuário logado (se houver).
export async function carregarMissoes(idUsuario?: number): Promise<MissaoComSituacao[]> {
  const [missoes, vinculos] = await Promise.all([
    listarMissoes(),
    idUsuario !== undefined ? listarMissoesUsuario() : Promise.resolve<MissaoUsuario[]>([]),
  ]);

  return missoes.map((missao) => ({
    ...missao,
    vinculo: vinculos.find((v) => v.idUsuario === idUsuario && v.idMissao === missao.id) ?? null,
  }));
}

// "AAAA-MM-DD" de hoje + alguns dias (formato exigido pela API).
function dataDaquiA(dias: number): string {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return data.toISOString().slice(0, 10);
}

// Cria o vínculo entre o usuário e a missão. dataFim é o prazo para concluir;
// como a API exige o campo e não documenta um valor padrão, assumimos 7 dias.
// Ajuste aqui se a regra do projeto definir outro prazo.
function vincularMissao(idUsuario: number, idMissao: number): Promise<MissaoUsuario> {
  return requisitar<MissaoUsuario>("/missaoUsuario", {
    method: "POST",
    body: JSON.stringify({ idUsuario, idMissao, dataFim: dataDaquiA(7) }),
  });
}

function concluirVinculo(
  idVinculo: number,
  idUsuario: number,
  idMissao: number
): Promise<MissaoUsuario> {
  return requisitar<MissaoUsuario>(`/missaoUsuario/${idVinculo}`, {
    method: "PUT",
    body: JSON.stringify({ idUsuario, idMissao, dataRealizacao: dataDaquiA(0) }),
  });
}

// Conclui a missão: cria o vínculo se ele ainda não existir, depois marca a conclusão.
export async function concluirMissao(
  idUsuario: number,
  idMissao: number,
  vinculoExistente: MissaoUsuario | null
): Promise<MissaoUsuario> {
  let vinculo = vinculoExistente;

  if (!vinculo) {
    vinculo = await vincularMissao(idUsuario, idMissao);

    if (!vinculo?.id) {
      // Alguns cadastros não devolvem o ID preenchido; a listagem resolve isso.
      const vinculos = await listarMissoesUsuario();
      const achado = vinculos.find(
        (v) => v.idUsuario === idUsuario && v.idMissao === idMissao && !v.dataRealizacao
      );
      if (!achado) {
        throw new Error("A missão foi vinculada, mas não foi possível localizá-la para concluir.");
      }
      vinculo = achado;
    }
  }

  return concluirVinculo(vinculo.id, idUsuario, idMissao);
}
