import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import MissaoCard from "../components/missoes/MissaoCard";
import { EstadoCarregando, EstadoErro, EstadoVazio } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";
import { buscarUsuario, carregarMissoes, concluirMissao } from "../services/techleetService";
import type { Feedback } from "../types/requisicao";
import type { MissaoComSituacao } from "../types/missao";

export default function Missoes() {
  usePageTitle("Missões");

  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, atualizarUsuario } = useAuth();
  const { estado, recarregar } = useApi(() => carregarMissoes(usuario?.id), [usuario?.id]);

  const [processandoId, setProcessandoId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ idMissao: number; info: Feedback } | null>(null);

  async function handleConcluir(missao: MissaoComSituacao) {
    if (!usuario) {
      navigate("/login", {
        state: { from: location.pathname, mensagem: "Faça login para concluir missões." },
      });
      return;
    }

    setProcessandoId(missao.id);
    setFeedback(null);
    try {
      await concluirMissao(usuario.id, missao.id, missao.vinculo);
      const atualizado = await buscarUsuario(usuario.id);
      atualizarUsuario(atualizado);
      setFeedback({
        idMissao: missao.id,
        info: {
          tipo: "sucesso",
          texto: `Missão concluída! +${missao.pontos} pts. Saldo: ${atualizado.pontos} pts.`,
        },
      });
      recarregar();
    } catch (erro) {
      setFeedback({ idMissao: missao.id, info: { tipo: "erro", texto: mensagemDeErro(erro) } });
    } finally {
      setProcessandoId(null);
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-3 text-center font-sans text-3xl">Missões</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-sm text-text-footer sm:text-base">
          Complete missões para ganhar pontos e desbloquear itens na loja.
        </p>

        {!usuario && (
          <p className="mb-8 text-center font-sans text-sm text-text-footer">
            Faça login para concluir missões e ganhar pontos.
          </p>
        )}

        {estado.status === "loading" && <EstadoCarregando />}

        {estado.status === "error" && (
          <EstadoErro mensagem={estado.message} onTentar={recarregar} />
        )}

        {estado.status === "success" &&
          (estado.data.length === 0 ? (
            <EstadoVazio texto="Nenhuma missão disponível no momento." onTentar={recarregar} />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {estado.data.map((missao) => (
                <li key={missao.id} className="flex">
                  <MissaoCard
                    missao={missao}
                    logado={Boolean(usuario)}
                    processando={processandoId === missao.id}
                    feedback={feedback?.idMissao === missao.id ? feedback.info : null}
                    onConcluir={() => handleConcluir(missao)}
                  />
                </li>
              ))}
            </ul>
          ))}
      </section>
    </Layout>
  );
}
