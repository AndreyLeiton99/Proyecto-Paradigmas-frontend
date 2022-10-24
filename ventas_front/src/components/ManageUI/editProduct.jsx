import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/productContext";

const EditProduct = () => {
  const { id } = useParams();
  // funciones a travez del contexto
  const { updateData, product, getOne } = useContext(ProductContext);

  //mensajes de error
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);

  //estados de los inputs
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);

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
    reset();

    e.preventDefault();
    if (validate()) {
      try {
        await updateData({
          id_Producto: id,
          descripcion: descripcion,
          cantidad: cantidad,
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
    if (product) {
      setDescripcion(product.descripcion);
      setCantidad(product.cantidad);
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
    <p className="text-danger mt-3">El producto no existe</p>
  ) : (
    <>
      <form onSubmit={update}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Nueva Descripcion del producto
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
            Nueva cantidad
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
        Editado con exito!
      </p>

      <p className={err ? "text-danger mt-3" : "d-none"}>Error en el backend</p>

      <p className={input ? "text-danger mt-3" : "d-none"}>
        Por favor llene todos los inputs
      </p>
    </>
  );
};
export default EditProduct;
