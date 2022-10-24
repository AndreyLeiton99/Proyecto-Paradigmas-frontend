import { useContext, useState } from "react";
import { ProductContext } from "../../context/productContext";

const AddProduct = () => {
  // funciones a travez del contexto
  const { storeData, getAllProducts } = useContext(ProductContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //estados de los inputs
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);

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
    reset();

    e.preventDefault();
    if (validate()) {
      try {
        await storeData({ descripcion: descripcion, cantidad: cantidad });
        setSuccess(true);
        getAllProducts();
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
            Descripcion del producto
          </label>
          <input
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            type="text"
            className="form-control"
            placeholder="Ingrese la descripcion"
            id="descripcion"
            aria-describedby="descripcion"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Cantidad Inicial
          </label>
          <input
            type="number"
            className="form-control"
            min={0}
            max={1000}
            step={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>

      <p className={success ? "text-primary mt-3" : "d-none"}>
        Agregado con exito!
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Producto ya existente!</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los inputs
      </p>
    </>
  );
};
export default AddProduct;
