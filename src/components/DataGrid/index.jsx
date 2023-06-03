import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./style.css";

const DataGridComponent = ({ rows, columns, onCellEditStop,isLoading }) => {
  const [width, setWidth] = useState(150);

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
    <div style={{ width: width }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            }
          }
        }}
        className="datagrid-container rounded-lg transition-all"
        rows={rows}
        columns={columns}
        rowHeight={64}
        pagination
        pageSizeOptions={[10, 20, 30]}
        paginationMode="client"
        onCellEditStop={onCellEditStop}
        loading={isLoading}
      />
    </div>
  );
};

export default DataGridComponent;