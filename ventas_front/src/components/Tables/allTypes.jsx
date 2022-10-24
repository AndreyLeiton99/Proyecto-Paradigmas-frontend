import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TypeContext } from "../../context/typeContext";

const AllTypes = () => {
  const { deleteData, types } = useContext(TypeContext);
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
      <h1>Tipos de ventas</h1>
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar el tipo.
      </p>
      {types[0] ? (
        <table className="table table-striped mb-5">
          <thead className="bg-primary text-white">
            <tr>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id_tipo_venta}>
                <td> {type.descripcion} </td>
                <td>
                  <Link
                    to={`/productos/tipo/${type.id_tipo_venta}`}
                    className="btn btn-warning mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(type.id_tipo_venta)}
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
        <p className="text-danger">No hay tipos en el sistema</p>
      )}
    </div>
  );
};

export default AllTypes;
