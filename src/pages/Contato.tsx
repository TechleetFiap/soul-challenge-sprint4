import Layout from "../components/layout/Layout";
import ContatoForm from "../components/formularios/ContatoForm";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Contato() {
  usePageTitle("/imagens/IconeTelefone.png");
 // interface de contato do front
  return (
    <Layout>
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 md:flex-row">
        <div className="flex-1">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl">
            Vamos conversar. Qual a sua Dúvida?
          </h2>
          <p className="mb-4 font-sans text-sm text-text-footer">
            E-mail para mais informações
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
            <img src="/imagens/emailBranco.png" alt="email" className="h-8 w-8" />
            <div>
              <h4 className="font-sans text-sm font-semibold">Contate em</h4>
              <p className="font-sans text-sm text-text-footer">
                rm570024@fiap.com.br
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-4 font-sans text-xl">Queremos te ouvir!</h3>
          <ContatoForm />
        </div>
      </section>
    </Layout>
  );
}
