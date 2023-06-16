"use client";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";

import ButtonComponent from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";

const DeparturesDataGrid = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [rows, setRows] = useState([]);
  const keys = [
    "employee_name",
    "employee_id",
    "Job_number",
    "national_number",
    "value",
    "description",
    "specialization",
    "date",
  ];

  const columns = [
    {
      field: "rowNumber",
      headerName: "",
      renderCell: (params) => <div>{params.id}.</div>,
      sortable: false,
      filterable: false,
    },
  ];

  keys.forEach((key) => {
    const headerName = key
      .split(/(?=[A-Z])|_/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    columns.push({
      originalField: key,
      field: key,
      headerName: headerName,
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
      editable: true,
    });
  });

  columns.push(
    {
      field: "image",
      headerName: "Image",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
      renderCell: (params) => {
        return (
          <img
            src={params.row.image}
            alt={params.row.name}
            className="w-full object-contain"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <ButtonComponent
            onClick={(e) => onRowDelete(e, params.row)}
            content="Delete"
            bgColor="!bg-red-500/30"
            fontColor="!text-red-500"
            buttonType="filled"
            fontWeight="!font-bold"
          />
        );
      },
    }
  );

  // delete function
  const onRowDelete = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/occupation/${row.id}`,
      {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Item with id ${row.id} deleted successfully`);
      setRows((prevRows) => prevRows.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error(`Error deleting the row: ${error}`);
      toast.error(`Failed to delete Item with id ${row.id} ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/debt`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { debt } = await response.json();
      setRows(
        debt.map((user) => ({
          id: user.id,
          employee_name: user.employee_name,
          employee_id: user.employee_id,
          Job_number: user.Job_number,
          national_number: user.national_number,
          value: user.value,
          image: user.image,
          description: user.description,
          specialization: user.specialization,
          date: user.date,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);
  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/debt/${id}`,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error(`Error updating the data: ${error}`);
      console.error(`Error updating the data: ${error}`);
    }
  };

  const handleCellEditCommit = (params, event) => {
    const {
      id,
      value,
      field,
      row,
      colDef: { headerName },
    } = params;

    const newValue = event.target.value;

    if (value === newValue || newValue === "") return;
    const updatedData = {
      ...row,
      [field]: newValue,
    };

    handleDataGridUpdate(updatedData, id);
    toast.success(
      `The field: "${headerName}" with the value: "${value}" updated to "${newValue}" successfully`
    );
  };
  return (
    <section className="px-8 pb-7">
      <div className="flex items-center flex-wrap justify-between my-3">
        <div>
          <h1 className="text-2xl font-semibold mb-2 dark:text-slate-100">
            Departures
          </h1>
          <div className="flex items-center justify-start gap-3">
            <ButtonComponent
              content="Filter"
              buttonType="filled"
              bgColor="!bg-gray-300"
              fontColor="text-[#4a4a4a]"
              icon={<MdOutlineFilterAlt size={25} />}
            />
            <p className="text-sm text-gray-400">
              Total Number Of Departures ({rows.length})
            </p>
          </div>
        </div>
        <Link href="/dashboard/add-new-departures">
          <ButtonComponent
            icon={<IoMdAdd />}
            content="Add new departures"
            buttonType="filled"
            additionalClasses="mt-3 md:mt-0 w-full md:w-auto"
          />
        </Link>
      </div>
      <DataGridComponent
        rows={rows}
        columns={columns}
        onCellEditStop={handleCellEditCommit}
      />
    </section>
  );
};

export default DeparturesDataGrid;
