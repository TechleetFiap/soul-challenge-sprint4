import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { usePageTitle } from "../hooks/usePageTitle";
import { membros } from "../data/membros";

export default function MembroDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const membro = membros.find((item) => item.id === id);

  usePageTitle(membro ? membro.nome : "/imagens/IconeUser.png");

  // Sempre que o parâmetro da rota mudar, rola a página para o topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!membro) {
    return (
      <Layout>
        <section className="mx-auto max-w-xl px-4 py-16 text-center ">
          <h2 className="mb-4 font-sans text-2xl">Integrante não encontrado</h2>
          <p className="mb-6 font-sans text-text-footer">
            Não encontramos nenhum integrante com o identificador "{id}".
          </p>
          <Button onClick={() => navigate("/integrantes")}>
            Voltar para a equipe
          </Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 py-16">
        <Card className="flex flex-col items-center gap-4 text-secondary">
          <img
            src={membro.foto}
            alt={membro.nome}
            className="h-40 w-40 rounded-full border-4 border-slate-200 object-cover"
          />
          <h2 className="font-sans text-2xl font-bold">{membro.nome}</h2>
          <p className="font-sans text-sm text-slate-500">
            RM {membro.rm} - {membro.turma}
          </p>
          <p className="font-sans text-sm text-slate-600">{membro.bio}</p>
          <div className="flex gap-3 pt-2">
            <a
              href={membro.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#24292f] px-4 py-2 text-sm text-text-light hover:opacity-90"
            >
              GitHub
            </a>
            <a
              href={membro.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#0a66c2] px-4 py-2 text-sm text-text-light hover:opacity-90"
            >
              LinkedIn
            </a>
          </div>
          <Button variante="secundaria" onClick={() => navigate("/integrantes")} className="text-[#64748B]">
            ← Voltar para a equipe
          </Button>
        </Card>
      </section>
    </Layout>
  );
}
