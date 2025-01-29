import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
// import { SummaryTableData } from "../data/data";

const SummaryTable = ({ summaryTableData }) => {
  console.log("summary table data: ", summaryTableData)
  const data = useMemo(() => summaryTableData, []);

  const columns = [
    {
      header: "Section Name",
      accessorKey: "section_name",
      // footer: "Overall",
    },
    {
      header: "Score",
      accessorKey: "score",
      // footer: "-2/50",
    },
    {
      header: "Attempted",
      accessorKey: "attempted",
      // footer: "34/100",
    },
    {
      header: "Accuracy",
      accessorKey: "accuracy",
      // footer: "17.65%",
    },
    {
      header: "Time",
      accessorKey: "time",
      // footer: "0.22/60 min",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Define a function to get color based on column index
  const getColumnColor = (colIndex, status, row, rowIndex) => {
    // Color logic for the "status" column
    if (colIndex === 1) {
      return status ? "bg-green-100" : "bg-white"; // Green for true, Red for false
    }
    if (colIndex === 2) {
      return status ? "bg-yellow-100" : "bg-white"; // Green for true, Red for false
    }
    if (colIndex === 3) {
      return status ? "bg-purple-100" : "bg-white"; // Green for true, Red for false
    }
    if (colIndex === 4) {
      return status ? "bg-red-100" : "bg-white"; // Green for true, Red for false
    }

    switch (colIndex) {
      case 0: // "Section Name"
        return "bg-white";
      case 1: // "Score"
        return "bg-green-100";
      case 2: // "Attempted"
        return "bg-yellow-100";
      case 3: // "Accuracy"
        return "bg-red-100";
      case 4: // "Time"
        return "bg-purple-100";
      case 5: // "Time"
        return "bg-red-100";
      default:
        return "";
    }
  };

  const getCellFillStyle = (value, maxValue) => {
    if (value >= 0) {
      const percentage = (value) * 100;
      return `w-[${percentage}%]`;
    } else {
      return "w-0 border-0";
    }
  };

  const getBorderColor = (colIndex, value) => {
    if (value <= 0) return " border-0";
    switch (colIndex) {
      case 0: // "Section Name"
        return "";
      case 1: // "Score"
        return "border-r-4 border-r-green-300";
      case 2: // "Attempted"
        return "border-r-4 border-r-yellow-300";
      case 3: // "Accuracy"
        return "border-r-4 border-r-purple-300";
      case 4: // "Time"
        return "border-r-4 border-r-red-300";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="mb-5 p-5 md:p-0 flex justify-between ">
        <h2 className=" text-[#2A4563] text-2xl font-bold pb-2">
          Sectional Summary
        </h2>
        {/* <div className="inline-flex bg-primary-blue items-center gap-1 sm:gap-3 py-1 px-3  sm:px-5 sm:py-2  text-white rounded-xl cursor-pointer">
          <button className="">Category</button>
          <svg
            className="w-6 h-6 text-white transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div> */}
      </div>

      <div className="max-h-[400px] overflow-y-auto border-t border-l border-b border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={`headergroup-${headerGroup.id}`}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={`headergroup-th${header.id}`}
                    className="border-r border-gray-200 p-3 text-left bg-[#f6f6f6]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, colIndex) => (
              <tr key={`summarytablerow-${row.id}`}>
                {row.getVisibleCells().map((cell, colIndex, rowIndex) => {
                  const values = ["", row.original.score_value, row.original.attempted_value, row.original.accuracy_value, row.original.time_value]
                  // const value = row.original.score_value;
                  const cellColor = getColumnColor(
                    colIndex,
                    row.original.status
                  );
                  const cellWidths = ["", "", "", "", ""];
                  const borderColors = ["", "", "", "", ""]
                  for (let i = 1; i <= 4; i++) {
                    cellWidths[i] = getCellFillStyle(values[i], 100);
                    borderColors[i] = getBorderColor(colIndex, values[i]);
                  }
                  return (
                    <td
                      key={`summarytablecell-${cell.id}`}
                      className={`border-r border-gray-200 h-[70px] text-left relative overflow-hidden`}
                    >
                      <div className={` ${borderColors[colIndex]} h-full ${cellWidths[colIndex]} ${cellColor} `}>
                      </div>
                      <div className={`absolute z-0 top-[10px] left-[10px] `}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        { }
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>

          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header, colIndex) => (
                  <th
                    key={header.id}
                    className={`border-r border-gray-200 p-3 text-left ${getColumnColor(
                      colIndex
                    )}`}
                  >
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
      </div>
    </>
  );
};

export default SummaryTable;
