import Layout from "../components/layout/Layout";
import { usePageTitle } from "../hooks/usePageTitle";
import { solucoes } from "../data/solucoes";

export default function Sobre() {
  usePageTitle("Sobre");

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 lg:max-w-6xl lg:py-20">
        <h2 className="mb-8 text-center font-sans text-3xl">Sobre o Projeto:</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {solucoes.map((solucao) => (
            <div key={solucao.id}>
              <h3 className="mb-3 font-sans text-xl">{solucao.titulo}</h3>
              {solucao.paragrafos.map((paragrafo, index) => (
                <p
                  key={index}
                  className="mb-3 font-sans text-sm text-text-footer sm:text-base"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
