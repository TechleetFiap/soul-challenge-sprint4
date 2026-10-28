import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import MembroDetalhe from "./pages/MembroDetalhe";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import Solucao from "./pages/Solucao";
import SolucaoDetalhe from "./pages/SolucaoDetalhe";
import Login from "./pages/Login";
import Loja from "./pages/Loja";
import ItemDetalhe from "./pages/ItemDetalhe";
import Missoes from "./pages/Missoes";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Rotas estáticas */}
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/integrantes" element={<Integrantes />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/solucao" element={<Solucao />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loja" element={<Loja />} />
      <Route path="/missoes" element={<Missoes />} />
      <Route path="/perfil" element={<Perfil />} />

      {/* Rotas dinâmicas [useParams] */}
      <Route path="/integrantes/:id" element={<MembroDetalhe />} />
      <Route path="/solucao/:id" element={<SolucaoDetalhe />} />
      <Route path="/loja/:id" element={<ItemDetalhe />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
