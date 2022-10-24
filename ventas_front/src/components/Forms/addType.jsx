import { useContext, useState } from "react";
import { TypeContext } from "../../context/typeContext";

const AddType = () => {
  const { storeData, getAllTypes } = useContext(TypeContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //input
  const [descripcion, setDescripcion] = useState("");

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

  const create = async (e) => {
    e.preventDefault();

    reset();

    if (validate()) {
      try {
        await storeData({ descripcion: descripcion });
        setSuccess(true);
        getAllTypes();
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
          <label htmlFor="descripcion" className="form-label">
            Descripcion del tipo de venta
          </label>
          <input
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            type="text"
            placeholder="Ingrese una descripcion"
            className="form-control"
            id="descripcion"
            aria-describedby="descripcion"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>
      <p className={success ? "text-primary mt-3" : "d-none"}>
        Agregado exitosamente!
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Tipo de venta ya existente!</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los inputs
      </p>
    </>
  );
};
export default AddType;
