import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext";

const AllProducts = () => {
  const { deleteData, products, getAllProducts } = useContext(ProductContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteData(id);
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div>
      <h1>Nuestros Productos</h1>
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar el producto.
      </p>
      {products[0] ? (
        <table className="table table-striped mb-5">
          <thead className="bg-primary text-white">
            <tr>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_Producto}>
                <td> {product.descripcion} </td>
                <td> {product.cantidad} </td>
                <td>
                  <Link
                    to={`/productos/producto/${product.id_Producto}`}
                    className="btn btn-warning mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(product.id_Producto)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-danger">No se encontraron productos en el sistema</p>
      )}
    </div>
  );
};

export default AllProducts;
