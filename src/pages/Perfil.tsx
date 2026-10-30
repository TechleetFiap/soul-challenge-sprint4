import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RotaProtegida from "../components/auth/RotaProtegida";
import EditarPerfilForm from "../components/perfil/EditarPerfilForm";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { EstadoCarregando, EstadoErro, EstadoVazio } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { buscarUsuario, carregarItensDoUsuario } from "../services/techleetService";
import type { Feedback } from "../types/requisicao";
import type { Usuario } from "../types/usuario";

// "AAAA-MM-DD" vira "DD/MM/AAAA"
function formatarData(iso: string): string {
  const partes = iso.split("-");
  return partes.length === 3 ? partes.reverse().join("/") : iso;
}

function PerfilConteudo({ usuario }: { usuario: Usuario }) {
  const { estado: estadoUsuario, recarregar: recarregarUsuario } = useApi(
    () => buscarUsuario(usuario.id),
    [usuario.id]
  );
  const { estado: estadoItens, recarregar: recarregarItens } = useApi(
    () => carregarItensDoUsuario(usuario.id),
    [usuario.id]
  );

  const [editando, setEditando] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function aoSalvar() {
    setEditando(false);
    setFeedback({ tipo: "sucesso", texto: "Dados atualizados com sucesso!" });
    recarregarUsuario(); // busca o usuário de novo (saldo de pontos incluído)
  }

  return (
    <Layout>
      <section className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <h2 className="text-center font-sans text-3xl">Meu perfil</h2>

        {estadoUsuario.status === "loading" && <EstadoCarregando />}
        {estadoUsuario.status === "error" && (
          <EstadoErro mensagem={estadoUsuario.message} onTentar={recarregarUsuario} />
        )}
        {feedback && (
          <p
            role={feedback.tipo === "erro" ? "alert" : "status"}
            className={`rounded-lg px-4 py-3 text-center font-sans text-sm ${
              feedback.tipo === "sucesso" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            {feedback.texto}
          </p>
        )}

        {estadoUsuario.status === "success" && (
          <Card className="flex flex-col items-center gap-2 text-secondary">
            {editando ? (
              <>
                <h3 className="font-sans text-xl font-bold">Atualizar dados</h3>
                <EditarPerfilForm
                  usuario={estadoUsuario.data}
                  onSalvo={aoSalvar}
                  onCancelar={() => setEditando(false)}
                />
              </>
            ) : (
              <>
                <h3 className="font-sans text-xl font-bold">{estadoUsuario.data.nome}</h3>
                <p className="font-sans text-sm text-slate-500">{estadoUsuario.data.email}</p>
                <p className="font-sans text-sm text-slate-500">
                  Nascimento: {formatarData(estadoUsuario.data.dataNascimento)}
                </p>
                <p className="pt-2 font-sans text-2xl font-bold">{estadoUsuario.data.pontos} pts</p>
                <Button
                  variante="secundaria"
                  className="mt-2 !text-secondary"
                  onClick={() => {
                    setFeedback(null);
                    setEditando(true);
                  }}
                >
                  Atualizar dados
                </Button>
              </>
            )}
          </Card>
        )}

        <div>
          <h3 className="mb-4 font-sans text-xl">Meus itens</h3>

          {estadoItens.status === "loading" && <EstadoCarregando />}
          {estadoItens.status === "error" && (
            <EstadoErro mensagem={estadoItens.message} onTentar={recarregarItens} />
          )}
          {estadoItens.status === "success" &&
            (estadoItens.data.length === 0 ? (
              <EstadoVazio texto="Você ainda não possui itens." onTentar={recarregarItens}>
                <Link to="/loja" className="rounded-full bg-primary px-5 py-2 font-sans text-sm text-white">
                  Ir para a loja
                </Link>
              </EstadoVazio>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {estadoItens.data.map((item) => (
                  <li key={`${item.id}-${item.origem}`}>
                    <Card className="flex flex-col gap-1 text-secondary">
                      <h4 className="font-sans text-base font-semibold">{item.nome}</h4>
                      <p className="font-sans text-sm text-slate-500">
                        {item.modelo} · {item.tipo === "EXCLUSIVO" ? "Exclusivo" : "Normal"}
                      </p>
                      <p className="font-sans text-xs text-slate-400">Origem: {item.origem}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </section>
    </Layout>
  );
}

export default function Perfil() {
  usePageTitle("Meu perfil");
  const { usuario } = useAuth();

  return <RotaProtegida>{usuario && <PerfilConteudo usuario={usuario} />}</RotaProtegida>;
}
