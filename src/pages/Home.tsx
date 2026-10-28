import Layout from "../components/layout/Layout";
import AvatarCustomizer from "../components/avatar/AvatarCustomizer";
import WordCarousel from "../components/ui/WordCarousel";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home");

  return (
    <Layout
      heroCompleto
      hero={
        <div className="flex flex-col items-center px-4 pt-16 text-center md:pt-24">
          <p className="font-sans text-4xl font-bold sm:text-6xl">Avatar</p>
          <p className="font-sans text-4xl font-bold text-primary sm:text-6xl">
            Inteligente
          </p>
          <p className="mt-4 font-sans text-base sm:text-lg">
            Bem-vindo ao Avatar inteligente!
          </p>
        </div>
      }
    >
      <WordCarousel />

      {/* Avatar Inteligente */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 md:flex-row lg:max-w-6xl lg:gap-16 lg:py-24">
        <img
          src="/imagens/AvatarSoulUp.png"
          alt="Avatar SoulUp"
          className="h-48 w-48 rounded-full object-cover lg:h-64 lg:w-64"
        />
        <div>
          <h3 className="mb-3 font-sans text-2xl">Avatar Inteligente</h3>
          <p className="mb-3 font-sans text-sm text-text-footer sm:text-base">
            O "Avatar Inteligente" é uma extensão do projeto "Avatares
            personalizáveis", focada em criar o "mascote" da empresa, afim de
            uma identidade visual única.
          </p>
          <p className="font-sans text-sm text-text-footer sm:text-base">
            Com essa ideia em prática buscamos representar a SoulUp de forma
            viva para uma maior proximidade da empresa com os usuários. A
            partir disso, o Avatar se comunicará com o internauta através de
            expressões que mudarão de acordo com a utilização do aplicativo.
          </p>
        </div>
      </section>

      {/* Avatar Personalizável - customizador interativo */}
      <section className="bg-secondary-dark px-4 py-10">
        <AvatarCustomizer />
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-3 font-sans text-2xl">Avatares personalizáveis</h3>
          <p className="mb-3 font-sans text-sm text-text-footer sm:text-base">
            O projeto "Avatares personalizáveis" é uma extensão do projeto
            "Avatar Inteligente" que visa criar avatares digitais
            personalizados utilizando inteligência artificial. Isso sendo
            possível com roupas, acessórios e modelagem corporal.
          </p>
          <p className="font-sans text-sm text-text-footer sm:text-base">
            Nosso objetivo é proporcionar uma experiência única e interativa
            para os usuários, permitindo que eles criem avatares que reflitam
            suas personalidades, e gere um melhor senso de comunidade ao poder
            compartilhar com os outros usuários suas missões sustentáveis
            feitas no aplicativo.
          </p>
        </div>
      </section>
    </Layout>
  );
}
