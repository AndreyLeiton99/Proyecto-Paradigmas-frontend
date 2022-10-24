import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeContext } from "../../context/typeContext";

const EditType = () => {
  const { id } = useParams();
  const { updateData, getOne } = useContext(TypeContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //input
  const [descripcion, setDescripcion] = useState("");

  //estado de error si no encuentra el usuario, validacion por si se inggresa un usuario en la url que  no existe
  const [notFound, setNotFound] = useState(true);

  const validate = () => {
    if (descripcion === "") {
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
      try {
        await updateData({ id_tipo_venta: id, descripcion: descripcion });
        setSuccess(true);
      } catch {
        setErr(true);
      }
    } else {
      setInput(true);
    }
  };

  const search = async () => {
    try {
      await getOne(id);
      setNotFound(false);
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return notFound ? (
    <p className="text-danger mt-3">El tipo de venta no existe</p>
  ) : (
    <>
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Nueva Descripcion
          </label>
          <input
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            type="text"
            className="form-control"
            placeholder="Ingrese una descripcion"
            id="descripcion"
            aria-describedby="descripcion"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>
      <p className={success ? "text-primary mt-3" : "d-none"}>
        Editado exitosamente!
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Ups Error backend</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los inputs
      </p>
    </>
  );
};
export default EditType;
