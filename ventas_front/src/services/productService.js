import http from "../../http-common";

const getAll = () => {
  return http.get("/productos");
};

const get = (id) => {
  return http.get(`/productos/${id}`);
};

const create = (data) => {
  return http.post("/productos", data);
};

const update = (data) => {
  return http.put(`/productos/${data.id_Producto}`, data);
};

const remove = (id) => {
  return http.delete(`/productos/${id}`);
};

const ProductService = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default ProductService;
