import Layout from "../components/layout/Layout";
import ItemCard from "../components/loja/ItemCard";
import { EstadoCarregando, EstadoErro, EstadoVazio } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { carregarVitrine } from "../services/techleetService";

export default function Loja() {
  usePageTitle("Loja");

  const { usuario } = useAuth();
  const { estado, recarregar } = useApi(() => carregarVitrine(usuario?.id), [usuario?.id]);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-3 text-center font-sans text-3xl">Loja de Itens</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-sm text-text-footer sm:text-base">
          Use seus pontos para desbloquear acessórios para o seu Avatar Inteligente.
        </p>

        {estado.status === "loading" && <EstadoCarregando />}

        {estado.status === "error" && (
          <EstadoErro mensagem={estado.message} onTentar={recarregar} />
        )}

        {estado.status === "success" &&
          (estado.data.length === 0 ? (
            <EstadoVazio texto="Nenhum item disponível no momento." onTentar={recarregar} />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {estado.data.map((item) => (
                <li key={item.id} className="flex">
                  <ItemCard item={item} />
                </li>
              ))}
            </ul>
          ))}
      </section>
    </Layout>
  );
}
