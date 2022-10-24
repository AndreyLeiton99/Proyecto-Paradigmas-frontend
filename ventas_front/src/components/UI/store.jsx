import { useContext, useEffect } from "react";
import { ClientContext } from "../../context/clientContext";
import { ProductContext } from "../../context/productContext";
import { SaleContext } from "../../context/saleContext";
import { TypeContext } from "../../context/typeContext";
import AddSale from "../Forms/addSale";
import AddType from "../Forms/addType";
import AllSales from "../Tables/allSales";
import AllTypes from "../Tables/allTypes";

const Sales = () => {
  const { getAllClients } = useContext(ClientContext);
  const { getAllProducts } = useContext(ProductContext);
  const { getAllSales } = useContext(SaleContext);
  const { getAllTypes } = useContext(TypeContext);

  useEffect(() => {
    getAllClients();
    getAllProducts();
    getAllSales();
    getAllTypes();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col col-sm-6">
          <h3>Agregar nuevo tipo de venta</h3>
          <AddType></AddType>
          <AllTypes />
        </div>
        <div className="col col-sm-6">
          <h3>Comprar!</h3>
          <AddSale></AddSale>
          <AllSales />
        </div>
      </div>
    </div>
  );
};

export default Sales;
