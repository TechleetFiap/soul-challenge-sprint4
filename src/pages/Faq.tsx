import Layout from "../components/layout/Layout";
import FaqList from "../components/faq/FaqList";
import { usePageTitle } from "../hooks/usePageTitle";
import { perguntasFrequentes } from "../data/faq";

export default function Faq() {
  usePageTitle("FAQ");

  return (
    <Layout>
      <section className="px-4 py-12 min-h-screen flex flex-col">
        <h2 className="mb-8 text-center font-sans text-3xl">
          Perguntas frequentes
        </h2>
        <FaqList itens={perguntasFrequentes} />
      </section>
    </Layout>
  );
}
