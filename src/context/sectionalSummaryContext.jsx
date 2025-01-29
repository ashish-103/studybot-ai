import { createContext, useState } from "react";

export const SectionalSummaryContext = createContext();

export const SummaryDetailsProvider = ({ children }) => {
    const [summaryData, setSummaryData] = useState([]);
    return (
        <SectionalSummaryContext.Provider value={{ summaryData, setSummaryData }}>
            {children}
        </SectionalSummaryContext.Provider>
    );
};
