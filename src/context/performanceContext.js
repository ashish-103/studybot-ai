import { createContext, useContext, useState } from "react";

const PerfomaceContext = createContext();

export const usePerfomaceData = () => {
  return useContext(PerfomaceContext)
}

export default function PerformanceContext({ children }) {
  const [data, setData] = useState(null);
  const setPerformanceData = (data) => {
    setData(data);
  }
  return (
    <PerformanceContext.Provider value={{ data, setPerformanceData }}>
      {children}
    </PerformanceContext.Provider>
  )
}

