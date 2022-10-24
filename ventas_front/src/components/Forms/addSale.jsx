import { useContext, useState } from "react";

import { ClientContext } from "../../context/clientContext";
import { ProductContext } from "../../context/productContext";
import { SaleContext } from "../../context/saleContext";
import { TypeContext } from "../../context/typeContext";

const AddSale = () => {
  const { storeData, getAllSales } = useContext(SaleContext);
  const { types } = useContext(TypeContext);
  const { products } = useContext(ProductContext);
  const { clients } = useContext(ClientContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errCantidad, setErrCantidad] = useState(false);

  //inputs
  const [identificacion, setID] = useState("");
  const [descripcionTipo, setTipo] = useState("");
  const [descripcionProducto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const validate = () => {
    if (
      identificacion === "" ||
      descripcionTipo === "" ||
      descripcionProducto === ""
    ) {
      return false;
    }

    if (cantidad <= 0) {
      setErrCantidad(true);
      return false;
    }

    return true;
  };

  const resets = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
  };

  const create = async (e) => {
    e.preventDefault();

    resets();

    if (validate()) {
      try {
        const fecha = new Date();
        await storeData({
          persona: { id_Persona: identificacion },
          tipo_venta: { id_tipo_venta: descripcionTipo },
          producto: { id_Producto: descripcionProducto },
          cantidad: cantidad,
          fecha: fecha,
        });
        setSuccess(true);
        getAllSales();
      } catch {
        setErr(true);
      }
    } else {
      setInput(true);
    }
  };

  return (
    <>
      <form onSubmit={create}>
        <div className="mb-3">
          <label htmlFor="identificacion" className="form-label">
            Identificacion del cliente
          </label>

          {clients[0] ? (
            <select
              className="form-select"
              onChange={(e) => setID(e.target.value)}
              value={identificacion}
              aria-label="Tipo"
              id="Tipo"
            >
              <option value="">Seleccione a una persona</option>
              {/* mapeo de los datos */}

              {clients.map((client) => (
                <option key={client.id_Persona} value={client.id_Persona}>
                  {"ID: " + client.identificacion} {"🡆 " + client.nombre}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-danger">No existen usuarios</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Cantidad por comprar
          </label>
          <input
            type="number"
            className="form-control"
            min={1}
            max={1000}
            step={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        {types[0] ? (
          <select
            className="form-select"
            value={descripcionTipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Tipo"
            id="Tipo"
          >
            <option value="">Seleccione un tipo de venta</option>
            {/* mapeo de los datos */}

            {types.map((type) => (
              <option key={type.id_tipo_venta} value={type.id_tipo_venta}>
                {type.descripcion}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-danger">
            No existen tipos de ventas en el sistema
          </p>
        )}

        {products[0] ? (
          <select
            className="form-select"
            value={descripcionProducto}
            onChange={(e) => setProducto(e.target.value)}
            aria-label="producto"
            id="producto"
          >
            <option value="">Seleccione un producto</option>
            {/* mapeo de los datos */}

            {products.map((producto) => (
              <option key={producto.id_Producto} value={producto.id_Producto}>
                 {producto.descripcion} {"🡆 Cantidad: " + producto.cantidad}  {/* se agrega cantidad */} 
              </option>
            ))}
          </select>
        ) : (
          <p className="text-danger">No existen productos en el sistema</p>
        )}

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>

      <p className={success ? "text-primary mt-3" : "d-none"}>
        Nueva venta registrada!
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        Error al realizar la venta, el producto no cuenta con la cantidad solicitada
      </p>

      <p className={errCantidad ? "text-danger mt-3" : "d-none"}>
        La cantidad a comprar debe ser mínimo 1
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los espacios
      </p>
    </>
  );
};
export default AddSale;
