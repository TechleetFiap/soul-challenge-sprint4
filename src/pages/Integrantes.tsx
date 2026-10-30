import Layout from "../components/layout/Layout";
import MembroCard from "../components/membros/MembroCard";
import { usePageTitle } from "../hooks/usePageTitle";
import { membros } from "../data/membros";

export default function Integrantes() {
  usePageTitle("Integrantes");

  return (
    <Layout>
      <section className="mx-auto px-4 py-12 text-center">
        <h2 className="mb-8 font-sans text-3xl">Nossa Equipe:</h2>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {membros.map((membro) => (
            <MembroCard key={membro.id} membro={membro} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
