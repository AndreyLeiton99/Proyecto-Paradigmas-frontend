import AddClient from "../Forms/addClient";
import AllClients from "../Tables/allClients";

const Clients = () => {
  return (
    <div>
      <h3>Registrar usuario</h3>
      <AddClient />
      <div className="container mt-5">
        <AllClients />
      </div>
    </div>
  );
};

export default Clients;
