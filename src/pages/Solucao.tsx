import Layout from "../components/layout/Layout";
import SolucaoCard from "../components/avatar/SolucaoCard";
import { usePageTitle } from "../hooks/usePageTitle";
import { solucoes } from "../data/solucoes";

export default function Solucao() {
  usePageTitle("Solução do Projeto");

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h2 className="mb-3 font-sans text-3xl">Solução do Projeto</h2>
        <p className="mx-auto mb-10 max-w-2xl font-sans text-sm text-text-footer sm:text-base">
          Conheça as duas frentes que compõem a solução Avatar Inteligente da
          SoulUp.
        </p>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {solucoes.map((solucao) => (
            <SolucaoCard key={solucao.id} solucao={solucao} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
