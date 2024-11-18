import process from "process";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import Modal from "react-modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cadastro from "./Pages/Cadastro/index.js";
import Home from "./Pages/Home/home.js";
import Pedidos from "./Pages/Pedidos/index.js";
import Produtos from "./Pages/Produtos/index.js";
import Relatorio from "./Pages/Relatorio/relatorio.js";
import Configuracao from "./Pages/Configuracao/index.js";
// Defina o elemento principal da aplicação
Modal.setAppElement("#root");
window.process = process;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/pedidos", element: <Pedidos /> },
      { path: "/produtos", element: <Produtos /> },
      { path: "/relatorio", element: <Relatorio /> },
      { path: "/configuracao", element: <Configuracao /> },
    ],
  },
]);

// Crie a raiz do aplicativo
const root = createRoot(document.getElementById("root"));

// Renderize o aplicativo
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
