import { createContext, useState } from "react";
import SaleService from "../services/saleService";

export const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState(null);

  const getAllSales = async () => {
    const response = await SaleService.getAll();
    setSales(response.data);
  };

  const getOne = async (id) => {
    const response = await SaleService.get(id);
    setSale(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await SaleService.remove(id);
    getAllSales();
    return response;
  };

  const updateData = async (data) => {
    return await SaleService.update(data);
  };

  const storeData = async (data) => {
    return await SaleService.create(data);
  };

  return (
    <SaleContext.Provider
      value={{
        sales,
        sale,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAllSales,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
