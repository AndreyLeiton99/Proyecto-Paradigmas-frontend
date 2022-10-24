import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../context/clientContext";
import { SaleContext } from "../../context/saleContext";
import { TypeContext } from "../../context/typeContext";

const EditSale = () => {
  const { id } = useParams();
  const { updateData, getOne, sale } = useContext(SaleContext);
  const { types, getAllTypes } = useContext(TypeContext);
  const { clients, getAllClients } = useContext(ClientContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //inputs
  const [identificacion, setID] = useState("");
  const [descripcionTipo, setTipo] = useState("");

  //estado de error si no encuentra el usuario, validacion por si se inggresa un usuario en la url que  no existe
  const [notFound, setNotFound] = useState(true);

  const validate = () => {
    if (identificacion === "" || descripcionTipo === "") {
      return false;
    }
    return true;
  };

  const cargarDatos = () => {
    if (sale) {
      setID(sale.persona?.id_Persona);
      setTipo(sale.tipo_venta?.id_tipo_venta);
    }
  };

  const search = async () => {
    try {
      await getOne(id);
      setNotFound(false);
      getAllClients();
      getAllTypes();
      cargarDatos();
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

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
        await updateData({
          id_Venta: id,
          persona: { id_Persona: identificacion },
          tipo_venta: { id_tipo_venta: descripcionTipo },
          producto: { id_Producto: sale.producto.id_Producto },
          cantidad: sale.cantidad,
          fecha: sale.fecha,
        });
        setSuccess(true);
      } catch {
        setErr(true);
      }
    } else {
      setInput(true);
    }
  };

  return notFound ? (
    <p className="text-danger mt-3">Esta venta no existe</p>
  ) : (
    <>
      <form onSubmit={create}>
        <div className="mb-3">
          <label for="identificacion" class="form-label">
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
              <option value={sale.persona?.id_Persona}>
                ID actual: {sale.persona?.identificacion}
              </option>
              {/* mapeo de los datos */}

              {clients.map((client) => (
                <option key={client.id_Persona} value={client.id_Persona}>
                  {client.identificacion}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-danger">No existen usuarios</p>
          )}
        </div>

        <select
          className="form-select"
          value={descripcionTipo}
          onChange={(e) => setTipo(e.target.value)}
          aria-label="Tipo"
          id="Tipo"
        >
          <option
            key={sale.tipo_venta.id_tipo_venta}
            value={sale.tipo_venta?.id_tipo_venta}
          >
            Tipo de venta actual: {sale.tipo_venta?.id_tipo_venta}
          </option>
          {/* mapeo de los datos */}

          {types.map((type) => (
            <option key={type.id_tipo_venta} value={type.id_tipo_venta}>
              {type.descripcion}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>

      <p className={success ? "text-primary mt-3" : "d-none"}>Venta editada!</p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        Ups Error al realizar la venta
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los espacios
      </p>
    </>
  );
};
export default EditSale;
