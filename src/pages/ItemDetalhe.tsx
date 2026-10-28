import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { EstadoCarregando, EstadoErro } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";
import {
  buscarItem,
  buscarUsuario,
  comprarItem,
  listarInventario,
} from "../services/techleetService";
import type { Item } from "../types/item";
import type { Inventario } from "../types/inventario";
import type { Feedback } from "../types/requisicao";

export default function ItemDetalhe() {
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, atualizarUsuario } = useAuth();

  const { estado, recarregar } = useApi(() => buscarItem(itemId), [itemId]);

  const { estado: estadoInventario, recarregar: recarregarInventario } = useApi<Inventario[]>(
    () => (usuario ? listarInventario() : Promise.resolve<Inventario[]>([])),
    [usuario?.id]
  );

  const [comprando, setComprando] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  usePageTitle(estado.status === "success" ? estado.data.nome : "Item");

  async function comprar(item: Item) {
    if (!usuario) {
      navigate("/login", {
        state: { from: location.pathname, mensagem: "Faça login para comprar este item." },
      });
      return;
    }

    if (item.valorPontos > usuario.pontos) {
      setFeedback({ tipo: "erro", texto: "Você não tem pontos suficientes para este item." });
      return;
    }

    setComprando(true);
    setFeedback(null);
    try {
      await comprarItem(usuario.id, item.id);
      const atualizado = await buscarUsuario(usuario.id);
      atualizarUsuario(atualizado);
      setFeedback({
        tipo: "sucesso",
        texto: `"${item.nome}" adquirido! Seu saldo agora é ${atualizado.pontos} pontos.`,
      });
      recarregarInventario();
    } catch (erro) {
      setFeedback({ tipo: "erro", texto: mensagemDeErro(erro) });
      // Após uma falha, resincroniza saldo e inventário com o servidor.
      buscarUsuario(usuario.id).then(atualizarUsuario).catch(() => undefined);
      recarregarInventario();
    } finally {
      setComprando(false);
    }
  }

  if (estado.status === "loading") {
    return (
      <Layout>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <EstadoCarregando />
        </section>
      </Layout>
    );
  }

  if (estado.status === "error") {
    return (
      <Layout>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <EstadoErro mensagem={estado.message} onTentar={recarregar} />
          <div className="text-center">
            <Button variante="secundaria" onClick={() => navigate("/loja")}>
              ← Voltar para a loja
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const item = estado.data;
  const jaComprado =
    estadoInventario.status === "success" &&
    usuario !== null &&
    estadoInventario.data.some((a) => a.idUsuario === usuario.id && a.idItem === item.id);

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 py-16">
        <Card className="flex flex-col items-center gap-4 text-secondary">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-500">
            {item.tipo === "EXCLUSIVO" ? "Exclusivo" : "Normal"}
          </span>
          <h2 className="font-sans text-2xl font-bold">{item.nome}</h2>
          <p className="font-sans text-sm text-slate-500">Modelo: {item.modelo}</p>
          <p className="font-sans text-xl font-bold">{item.valorPontos} pts</p>

          {feedback && (
            <p
              role={feedback.tipo === "erro" ? "alert" : "status"}
              className={`font-sans text-sm ${
                feedback.tipo === "sucesso" ? "text-green-600" : "text-red-500"
              }`}
            >
              {feedback.texto}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              onClick={() => comprar(item)}
              disabled={comprando || jaComprado}
            >
              {jaComprado ? "Já está no seu inventário" : comprando ? "Comprando..." : "Comprar"}
            </Button>
            <Button variante="secundaria" onClick={() => navigate("/loja")} className="text-[#64748B]">
              ← Voltar para a loja
            </Button>
          </div>
        </Card>
      </section>
    </Layout>
  );
}
