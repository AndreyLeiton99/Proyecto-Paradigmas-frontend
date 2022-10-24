import AddProduct from "../Forms/addProduct";
import AllProducts from "../Tables/allProducts";

const Products = () => {
  return (
    <div>
      <h3>Agregar nuevo producto</h3>
      <AddProduct></AddProduct>
      <AllProducts />
    </div>
  );
};

export default Products;
