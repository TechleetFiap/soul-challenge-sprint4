# Avatar Inteligente — SoulUp | TechLeet

## Descrição

Aplicação **SPA (Single Page Application)** do projeto Avatar Inteligente da SoulUp, desenvolvida na **Sprint 04** da disciplina Front-End Design Engineering. O "Avatar Inteligente" é o mascote digital da SoulUp, e os "Avatares Personalizáveis" permitem que cada usuário customize seu próprio avatar com acessórios desbloqueados pelo uso do aplicativo.

Nesta etapa, o front-end consome a **API REST em Java** publicada na nuvem: é possível fazer login, consultar a loja de itens, ver o detalhe de cada item, comprar itens com os pontos do usuário e acompanhar o próprio perfil e inventário.

## Tecnologias utilizadas

- **React 18**: construção da interface e componentização
- **Vite**: build tool e servidor de desenvolvimento (com proxy para a API)
- **TypeScript**: tipagem estática, com interfaces, union types e intersection types
- **Tailwind CSS**: estilização e responsividade (mobile, tablet, desktop)
- **React Router DOM**: navegação SPA com rotas estáticas e dinâmicas (`useParams`)
- **React Hook Form**: formulários de login e de contato
- **Context API**: estado global de autenticação (`AuthProvider` e `useAuth`)
- **Fetch API**: consumo da API REST, centralizado em `src/services`
- **Vercel**: hospedagem do front-end, com rewrite de `/techleet` para a API
- **Git / GitHub**: versionamento do projeto

## Estrutura de pastas

```
soulup-techleet/
├── public/
│   └── imagens/                  # imagens e ícones do projeto (avatares, equipe, logos)
├── src/
│   ├── components/
│   │   ├── auth/                 # RotaProtegida (exige login)
│   │   ├── avatar/               # AvatarCustomizer, SolucaoCard
│   │   ├── faq/                  # FaqItem, FaqList
│   │   ├── formularios/          # ContatoForm (React Hook Form)
│   │   ├── layout/               # Header (com login), Footer, Layout
│   │   ├── loja/                 # ItemCard
│   │   ├── membros/              # MembroCard
│   │   └── ui/                   # Button, Card, Estados (loading, erro e vazio)
│   ├── context/                  # AuthContext (estado de login)
│   ├── data/                     # dados estáticos (membros, faq, soluções)
│   ├── hooks/                    # useApi, useAuth, usePageTitle
│   ├── pages/                    # uma página por rota
│   ├── services/                 # apiClient (HTTP central) e techleetService (endpoints)
│   ├── types/                    # tipos e interfaces (usuario, item, inventario, requisicao)
│   ├── App.tsx                   # definição das rotas
│   ├── main.tsx                  # ponto de entrada
│   └── index.css                 # diretivas do Tailwind e estilos globais
├── .env.example                  # modelo de variáveis de ambiente
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                   # rewrites: API e fallback de SPA
└── vite.config.ts                # proxy /techleet para a API
```

## Integração com a API

A API é consumida pelo `src/services/techleetService.ts`, que usa o cliente HTTP de `src/services/apiClient.ts`. As telas nunca chamam o `fetch` diretamente.

| Operação | Método | Endpoint | Onde aparece |
| --- | --- | --- | --- |
| Login | POST | `/techleet/usuario/login` | Página Entrar |
| Consultar usuário | GET | `/techleet/usuario/{id}` | Perfil |
| Listar itens | GET | `/techleet/item` | Loja |
| Consultar item | GET | `/techleet/item/{id}` | Detalhe do item |
| Listar inventário | GET | `/techleet/inventario` | Loja e detalhe do item |
| **Comprar item** | **POST** | `/techleet/inventario` | Detalhe do item |

Cada tela trata três estados, exibidos pelos componentes de `src/components/ui/Estados.tsx`:

- **Carregamento:** mensagem enquanto a requisição está em andamento.
- **Erro:** mensagem retornada pela API ou pelo cliente, com botão para tentar novamente.
- **Resposta vazia:** mensagem orientando o usuário quando não há dados (por exemplo, inventário sem itens).

As respostas são tipadas com interfaces em `src/types`, e o estado de cada requisição é modelado por um union type (`ApiState`).

## Rotas da aplicação

| Rota | Página | Tipo |
| --- | --- | --- |
| `/` | Home | Estática |
| `/sobre` | Sobre o Projeto | Estática |
| `/integrantes` | Lista da equipe | Estática |
| `/integrantes/:id` | Perfil de um integrante | Dinâmica (`useParams`) |
| `/solucao` | Lista das soluções do projeto | Estática |
| `/solucao/:id` | Detalhe de uma solução | Dinâmica (`useParams`) |
| `/loja` | Loja de itens (listagem via API) | Estática |
| `/loja/:id` | Detalhe do item e compra (via API) | Dinâmica (`useParams`) |
| `/login` | Entrada do usuário | Estática |
| `/perfil` | Perfil e inventário (exige login) | Estática, protegida |
| `/faq` | Perguntas frequentes | Estática |
| `/contato` | Formulário de contato | Estática |
| `*` | Página não encontrada (404) | Fallback |

O botão **Entrar** fica no canto superior direito do cabeçalho. Depois do login, ele dá lugar ao nome do usuário e ao botão **Sair**. Tentar comprar sem estar logado redireciona para `/login` com uma mensagem, e o usuário volta para o item após entrar.

## Como executar localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env
# mantenha VITE_API_URL=https://techleet569602.onrender.com
# (a API precisa estar rodando nessa porta)

# 3. Rodar o servidor de desenvolvimento
npm run dev

# 4. Abrir no navegador
http://localhost:5173
```


## Como usar

- **Repositório no GitHub:** `https://github.com/TechleetFiap/soul-challenge-sprint4`
- **Vídeo de apresentação (YouTube):** `https://youtu.be/hh29Rvpot1c`
- **API publicada (Render):** `https://techleet569602.onrender.com`

Para testar a aplicação publicada, acesse o link da Vercel, abra **Entrar** no canto superior direito e use uma conta cadastrada na API. Depois, visite a **Loja** e escolha um item para comprar.

> Observação: a API está hospedada em um serviço gratuito do Render, que pode levar alguns segundos para responder na primeira requisição depois de um período sem uso.

## Autores e créditos

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
| --- | --- | --- | --- | --- | --- |
| <img src="public/imagens/samuel.jpeg" width="60" /> | Samuel Pedroso | 569335 | 1TDSR | [GitHub](https://github.com/OSamuelXavierDev) | [LinkedIn](https://www.linkedin.com/in/samuel-xavier-061434274) |
| <img src="public/imagens/diogo.jpeg" width="60" /> | Diogo Pedroso Alves | 570024 | 1TDSR | [GitHub](https://github.com/DiogoPedrosoAlves) | [LinkedIn](https://www.linkedin.com/in/diogo-pedroso-alves-895346237/) |
| <img src="public/imagens/murilo.jpeg" width="60" /> | Murilo Munari Bissiato | 569602 | 1TDSR | [GitHub](https://github.com/murilomunari) | [LinkedIn](https://www.linkedin.com/in/murilomunaribissiato/) |
| <img src="public/imagens/pedro.jpeg" width="60" /> | Pedro Henrique Toledo Sampaio | 571707 | 1TDSR | [GitHub](https://github.com/PedroSampaio20) | [LinkedIn](https://www.linkedin.com/in/pedro-sampaio2002/) |
| <img src="public/imagens/felipe.jpeg" width="60" /> | Felipe Ferreira Amado | 572567 | 1TDSR | [GitHub](https://github.com/FelipeFerreiraAmado) | [LinkedIn](https://www.linkedin.com/in/felipe-amado/) |

As fotos de cada integrante também aparecem na página **Integrantes** e no perfil individual de cada membro (`/integrantes/:id`).

## Imagens e ícones do projeto

| Ícone/Imagem | Uso |
| --- | --- |
| <img src="public/imagens/AvatarSoulUp.png" width="50" /> | Mascote / Avatar Inteligente da SoulUp |
| <img src="public/imagens/AvatarF-Base.jpg" width="50" /> | Base do Avatar Personalizável |
| <img src="public/imagens/IconeHome.png" width="30" /> | Favicon da Home |
| <img src="public/imagens/IconeUser.png" width="30" /> | Favicon das páginas Sobre / Integrantes |
| <img src="public/imagens/IconeTelefone.png" width="30" /> | Favicon da página Contato |
| <img src="public/imagens/TechLeet.png" width="60" /> | Logo da equipe TechLeet (rodapé) |
| <img src="public/imagens/SoulUp.png" width="60" /> | Logo da empresa SoulUp (rodapé) |

Todos os arquivos de imagem do projeto estão em `public/imagens/`.

## Contato

Dúvidas sobre o projeto: **rm570024@fiap.com.br**
