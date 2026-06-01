import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import CatalogoPage from './Pages/CatalogoPage';
import ProdutoPage from './Pages/ProdutoPage';
import CadastroProdutoPage from './Pages/CadastroProdutoPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CatalogoPage />} />
          <Route path="/produto/:id" element={<ProdutoPage />} />
          <Route path="/cadastrar" element={<CadastroProdutoPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;