import { createContext, useState } from "react";
import ProductService from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const getAllProducts = async () => {
    const response = await ProductService.getAll();
    setProducts(response.data);
  };

  const getOne = async (id) => {
    const response = await ProductService.get(id);
    setProduct(response.data);
    return response;
  };

  const deleteData = async (id) => {
    const response = await ProductService.remove(id);
    getAllProducts();
    return response;
  };

  const updateData = async (data) => {
    return await ProductService.update(data);
  };

  const storeData = async (data) => {
    return await ProductService.create(data);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        storeData,
        updateData,
        deleteData,
        getOne,
        getAllProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
