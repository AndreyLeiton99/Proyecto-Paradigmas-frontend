import http from "../../http-common";

const getAll = () => {
  //return http.get("/.");
  return http.get("/clientes");
};

const get = (id) => {
  //return http.get(`/./${id}`);
  return http.get(`/clientes/${id}`);
};

const create = (data) => {
  //return http.post("/.", data);
  return http.post("/clientes", data);
};

const update = (data) => {
  //return http.put(`/.`, data);
  return http.put(`/clientes/${data.id_Persona}`, data); // hace falta adaptarlo al ID a modificar como parametro
};

const remove = (id) => {
  //return http.delete(`/./${id}`);
  return http.delete(`/clientes/${id}`);
};

const ClientService = {
  getAll,
  get,
  remove,
  create,
  update,
};

export default ClientService;
