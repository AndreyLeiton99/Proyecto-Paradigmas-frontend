import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClientContext } from "../../context/clientContext";

const AllClients = () => {
  const { deleteData, clients, getAllClients } = useContext(ClientContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllClients();
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
      <h1>Nuestros Clientes</h1>
      <p className={error ? "text-danger" : "d-none"}>
        Error al intentar eliminar el usuario.
      </p>
      {clients[0] ? (
        <table className="table table-striped mb-5">
          <thead className="bg-primary text-white">
            <tr>
              <th>Identificacion</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id_Persona}>
                <td> {client.identificacion} </td>
                <td> {client.nombre} </td>
                <td>
                  <Link
                    to={`cliente/${client.id_Persona}`} //////
                    //to={`/clientes/cliente/${client.id_Persona}`}
                    className="btn btn-warning mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(client.id_Persona)}
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
        <p className="text-danger">No se encontraron clientes en el sistema</p>
      )}
    </div>
  );
};

export default AllClients;
