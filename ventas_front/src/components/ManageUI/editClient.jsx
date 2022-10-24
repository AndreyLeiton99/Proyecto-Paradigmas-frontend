import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../context/clientContext";

const EditClient = () => {
  const { id } = useParams();
  const { updateData, client, getOne } = useContext(ClientContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //estado de error si no encuentra el usuario, validacion por si se inggresa un usuario en la url que  no existe
  const [notFound, setNotFound] = useState(true);

  //estados de los inputs
  const [identificacion, setID] = useState("");
  const [nombre, setNombre] = useState("");

  const validate = () => {
    if (identificacion === "" || nombre === "") {
      return false;
    }
    return true;
  };

  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
  };

  const update = async (e) => {
    e.preventDefault();

    reset();

    if (validate()) {
      //esto puede cambiar si se toma la identificacion como key, no hace falta enviar el id
      //ademas de que el use params recibe la identificacion
      try {
        await updateData({
          id_Persona: id,
          identificacion: identificacion,
          nombre: nombre,
        });
        setSuccess(true);
      } catch {
        setErr(true);
      }
    } else {
      setInput(true);
    }
  };

  const cargarDatos = () => {
    if (client) {
      setID(client.identificacion);
      setNombre(client.nombre);
    }
  };

  const search = async () => {
    try {
      await getOne(id);
      setNotFound(false);
      cargarDatos();
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return notFound ? (
    <p className="text-danger mt-3">El usuario no existe</p>
  ) : (
    <>
      <div className="container">
        <div>Editando usuario: {client.nombre}</div>
      </div>
      <form onSubmit={update}>
        <div className="mb-3">
          <label for="identificacion" class="form-label">
            Identificacion
          </label>
          <input
            onChange={(e) => setID(e.target.value)}
            value={identificacion}
            type="text"
            className="form-control"
            placeholder="Ingrese su identificacion"
            id="identificacion"
            aria-describedby="identificacion"
          />
        </div>
        <div class="mb-3">
          <label for="nombre" className="form-label">
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

      <p className={success ? "text-primary mt-3" : "d-none"}>Editado!</p>

      <p className={err ? "text-danger mt-3" : "d-none"}>
        El usuario debe ser unico
      </p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los espacios
      </p>
    </>
  );
};
export default EditClient;
