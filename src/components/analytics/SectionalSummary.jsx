import React, { useContext } from 'react'
import SummaryTable from "./../SummaryTable";
import { AnalyticsContext } from '../../context/analyticsContext';

export default function SectionalSummary() {
    const { summaryData } = useContext(AnalyticsContext);
    return (
        <section className='px-5 pb-10'>
            <div className="bg-white md:p-10 shadow-md rounded-md">
                {/* <SummaryTable /> */}
                <SummaryTable summaryTableData={summaryData} />
            </div>
        </section>
    )
}
