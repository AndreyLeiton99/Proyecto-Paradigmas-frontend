import { createContext, useState } from "react";
import ClientService from "../services/clientService";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

  const getAllClients = async () => {
    const response = await ClientService.getAll();
    setClients(response.data);
  };

  const getOne = async (id) => {
    console.log(id);
    const response = await ClientService.get(id);
    setClient(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await ClientService.remove(id);
    getAllClients();
    return response;
  };

  const updateData = async (data) => {
    return await ClientService.update(data);
  };

  const storeData = async (data) => {
    return await ClientService.create(data);
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        client,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAllClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
