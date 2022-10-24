import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogContext } from "../../context/logContext";

const AllLogs = () => {
    const {logs, getAllLogs } = useContext(LogContext);

    useEffect(() => {
        getAllLogs();
    }, []);
    

    return (
        <div>
          <h1>Logs registrados</h1>
          
          {logs[0] ? (
            <div className="overflow-scroll vh-100">
              <table className="table table-striped mb-5">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Método</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td> {log.metodo} </td>
                      <td> {log.fecha} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-danger">No se encontraron logs en el sistema</p>
          )}
        </div>
      );

};

export default AllLogs;