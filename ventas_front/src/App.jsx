import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//Componentes iniciales
import Clients from "./components/UI/clients";
import Logs from "./components/UI/logs";
import Products from "./components/UI/products";
import Store from "./components/UI/store";

//Componentes de edicion
import EditClient from "./components/ManageUI/editClient";
import EditProduct from "./components/ManageUI/editProduct";
import EditSale from "./components/ManageUI/editSale";
import EditType from "./components/ManageUI/editType";

//Contextos
import { ClientProvider } from "./context/clientContext";
import { LogProvider } from "./context/logContext";
import { ProductProvider } from "./context/productContext";
import { SaleProvider } from "./context/saleContext";
import { TypeProvider } from "./context/typeContext";

//Barra de Navegacion
import NavBar from "./views/nav";

function App() {
  return (
    <ClientProvider>
      <ProductProvider>
        <TypeProvider>
          <LogProvider>
            <SaleProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<NavBar />}>
                    {/* rutas main */}
                    <Route index element={<Store />} />
                    {/* rutas tienda principal para hacer ventas */}
                    <Route path="tienda" element={<Store />} />
                    <Route path="tienda/venta/:id" element={<EditSale />} />
                    {/* ruta para ver y editar productos y sus tipos */}
                    <Route path="productos" element={<Products />} />
                    <Route
                      path="productos/producto/:id"
                      element={<EditProduct />}
                    />
                    <Route path="productos/tipo/:id" element={<EditType />} />
                    {/* ruta para ver y editar clientes */}
                    <Route path="clientes" element={<Clients />} />
                    <Route
                      path="clientes/cliente/:id"
                      element={<EditClient />}
                    />
                    {/* ruta para ver los logs */}
                    <Route path="logs" element={<Logs />} />
                    {/* ruta por defecto si se busca una ruta que no existe */}
                    <Route path="*" element={<Navigate replace to="/" />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SaleProvider>
          </LogProvider>
        </TypeProvider>
      </ProductProvider>
    </ClientProvider>
  );
}

export default App;
