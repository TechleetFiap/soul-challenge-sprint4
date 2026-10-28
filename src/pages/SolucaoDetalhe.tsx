import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { usePageTitle } from "../hooks/usePageTitle";
import { solucoes } from "../data/solucoes";

export default function SolucaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const solucao = solucoes.find((item) => item.id === id);

  usePageTitle(solucao ? solucao.titulo : "Solução não encontrada");

  if (!solucao) {
    return (
      <Layout>
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <h2 className="mb-4 font-sans text-2xl">Página não encontrada</h2>
          <Button onClick={() => navigate("/solucao")}>Voltar</Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <img
            src={solucao.imagem}
            alt={solucao.titulo}
            className="h-40 w-40 rounded-full object-cover"
          />
          <h2 className="font-sans text-3xl">{solucao.titulo}</h2>
        </div>
        {solucao.paragrafos.map((paragrafo, index) => (
          <p
            key={index}
            className="mb-4 font-sans text-sm text-text-footer sm:text-base"
          >
            {paragrafo}
          </p>
        ))}
        <Button variante="secundaria" onClick={() => navigate("/solucao")}>
          ← Voltar
        </Button>
      </section>
    </Layout>
  );
}
