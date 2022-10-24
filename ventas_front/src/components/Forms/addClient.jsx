import { useContext, useState } from "react";
import { ClientContext } from "../../context/clientContext";

const AddClient = () => {
  const { storeData, getAllClients } = useContext(ClientContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //estados de los inputs
  const [id, setID] = useState("");
  const [nombre, setNombre] = useState("");

  const validate = () => {
    if (id === "" || nombre === "") {
      return false;
    }
    return true;
  };

  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
  };

  const create = async (e) => {
    e.preventDefault();

    reset();

    if (validate()) {
      try {
        await storeData({ identificacion: id, nombre: nombre });
        setSuccess(true);
        getAllClients();
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
            Identificacion
          </label>
          <input
            onChange={(e) => setID(e.target.value)}
            value={id}
            type="text"
            className="form-control"
            placeholder="Ingrese su identificacion"
            id="identificacion"
            aria-describedby="identificacion"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            className="form-control"
            placeholder="Ingrese Nombre completo"
            id="nombre"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>

      <p className={success ? "text-primary mt-3" : "d-none"}>Agregado!</p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        El usuario debe ser unico
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los espacios
      </p>
    </>
  );
};
export default AddClient;
