"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "clientName",
    headerName: "Client Name",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "total",
    headerName: "Total$",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "balance",
    headerName: "Balance$",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "issuedDate",
    headerName: "Issued Date",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 150,
    headerClassName: "text-gray-500",
  },
  {
    field: "open",
    headerName: "Open",
    width: 150,
    headerClassName: "text-gray-500",
  },
];

const rows = [
  {
    id: 1,
    clientName: "Report totals:",
  },
];

const PagesDataGrid = () => {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWidth(window.innerWidth - 160);

    const handleResize = () => setWidth(window.innerWidth - 160);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[245px]" style={{ width: width }}>
      <div className="bg-blue-500 text-white dark:text-slate-900 p-4 rounded-tr-lg rounded-tl-lg">
        <div className="flex gap-5 items-center mt-2">
          <h1 className="text-lg font-bold">Show</h1>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="text-white px-3 py-2 rounded-md border-2 border-solid border-slate-700 bg-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span>Entries</span>
        </div>
      </div>
      <DataGrid
        // style={{ width: "67rem" }}
        style={{ width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onPageChange={(newPage) => setPage(newPage)}
        getCellClassName={() => "text-slate-200"}
        getRowClassName={() => "text-slate-200"}
        slots={{
          footer: () => (
            <div className="p-4  border-t-[1px] border-gray-400 border-solid">
              <span className="text-gray-400">
                Showing {page * pageSize + 1} of {rows.length} entries
              </span>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PagesDataGrid;
