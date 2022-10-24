import http from "../../http-common";

const getAll = () => {
  return http.get("/tienda");
};

const get = (id) => {
  return http.get(`/tienda/${id}`);
};

const create = (data) => {
  return http.post("/tienda", data);
};

const update = (data) => {
  return http.put(`/tienda/${data.id_tipo_venta}`, data);
};

const remove = (id) => {
  return http.delete(`/tienda/${id}`);
};

const TypeService = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default TypeService;
