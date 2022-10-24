import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SaleContext } from "../../context/saleContext";

const AllSales = () => {
  const { deleteData, sales } = useContext(SaleContext);
  const [error, setError] = useState(false);

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
      <h1>Nuestras ventas</h1>
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar la venta.
      </p>
      {sales[0] ? (
        <table className="table table-striped mb-5">
          <thead className="bg-primary text-white">
            <tr>
              <th>Comprador</th>
              <th>Tipo de venta</th>
              <th>Producto</th>
              <th>Cantidad vendida</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((Sales) => (
              <tr key={Sales.id_Venta}>
                <td> Comprador: {Sales.persona.nombre} </td>
                <td> Tipo: {Sales.tipo_venta?.descripcion} </td>
                {/* Esto seria un map de los productos, si es que lo cambian xd, cosa que me pareceria raro, mejor que solo compren un producto Asi se ahorran un monton, porque eso seria bastante complicado de hacer siento yo */}
                <td> Producto: {Sales.producto?.descripcion} </td>
                <td> Cantidad: {Sales.cantidad} </td>
                <td> Fecha: {Sales.fecha} </td>
                <td>
                  <Link
                    to={`/tienda/venta/${Sales.id_Venta}`}
                    className="btn btn-warning mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(Sales.id_Venta)}
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
        <p className="text-danger">No se han realizado ventas en el sistema</p>
      )}
    </div>
  );
};

export default AllSales;
