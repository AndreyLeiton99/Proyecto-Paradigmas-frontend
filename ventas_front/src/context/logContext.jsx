import { createContext, useState } from "react";
import LogService from "../services/logService";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const [log, setLog] = useState(null);
  
    const getAllLogs = async () => {
      const response = await LogService.getAllLogs();
      setLogs(response.data);
    };
  
    return (
      <LogContext.Provider
        value={{
          log,
          logs,
          getAllLogs,
        }}
        >
        {children}
      </LogContext.Provider>
    );
  };
  

