import { createContext, useState } from "react";
import TypeService from "../services/typeService";

export const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);

  const getAllTypes = async () => {
    const response = await TypeService.getAll();
    setTypes(response.data);
  };

  const getOne = async (id) => {
    const response = await TypeService.get(id);
    setType(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await TypeService.remove(id);
    getAllTypes();
    return response;
  };

  const updateData = async (data) => {
    return await TypeService.update(data);
  };

  const storeData = async (data) => {
    return await TypeService.create(data);
  };

  return (
    <TypeContext.Provider
      value={{
        types,
        type,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAllTypes,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
};
