"use client";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";

import ButtonComponent from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const VacationDataGrid = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "rowNumber",
      headerName: "",
      renderCell: (params) => <div>{params.id}.</div>,
      sortable: false,
      filterable: false,
    },
    {
      field: "employee_name",
      headerName: "Employee name",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "employee_id",
      headerName: "Employee ID",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "national_number",
      headerName: "National number",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "Job_number",
      headerName: "Job number",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "description",
      headerName: "Description",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
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
      field: "type",
      headerName: "Type",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
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
    },
  ];

  // delete function
  const onRowDelete = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/vacation/${row.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
    } catch (error) {
      console.error(`Error deleting the row: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/vacation`,
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

        const { vacation } = await response.json();
        setRows(
          vacation.map((user) => ({
            id: user.id,
            employee_name: user.employee_name,
            employee_id: user.employee_id,
            national_number: user.national_number,
            Job_number: user.Job_number,
            specialization: user.specialization,
            description: user.description,
            reason: user.reason,
            image: user.image,
            date: user.date,
            type: user.type,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/vacation/${id}`,
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
            Vacation
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
              Total Number Of Vacations ({rows.length})
            </p>
          </div>
        </div>
        <Link href="/dashboard/add-new-vacation">
          <ButtonComponent
            icon={<IoMdAdd />}
            content="Add new vacation"
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

export default VacationDataGrid;
