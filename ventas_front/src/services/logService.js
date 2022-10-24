import http from "../../http-common";

const getAllLogs = () => {
    return http.get("/logs");
};

const LogService = {
    getAllLogs
};
  
  export default LogService;
