import { createContext, useEffect, useState } from "react";

export const AnalyticsContext = createContext();

export const ExamResultsProvider = ({ children }) => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [miscData, setMiscData] = useState([]);
    return (
        <AnalyticsContext.Provider value={{ analyticsData, setAnalyticsData, summaryData, setSummaryData, miscData, setMiscData }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
