import { createContext, useContext, useState } from "react";

const PerformanceContext = createContext();

export const usePerformanceData = () => {
  return useContext(PerformanceContext)
}

export const PerformanceDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const setPerformanceData = (pdata) => {
    setData(pdata);
  }
  return (
    <PerformanceContext.Provider value={{ data, setPerformanceData }}>
      {children}
    </PerformanceContext.Provider>
  )
}

