import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Página não encontrada");

  return (
    <Layout>
      <section className="flex flex-col items-center gap-4 px-4 py-24 text-center">
        <h2 className="font-sans text-3xl">404 - Página não encontrada</h2>
        <p className="font-sans text-text-footer">
          O endereço acessado não existe.
        </p>
        <Link
          to="/"
          className="rounded-full bg-primary px-6 py-3 font-sans text-sm text-white hover:bg-slate-600"
        >
          Voltar para a Home
        </Link>
      </section>
    </Layout>
  );
}
