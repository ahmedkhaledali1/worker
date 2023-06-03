"use client";
import ButtonComponent from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import { HolidaysRows, HolidaysColumns } from "@/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const Holidays = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [rows, setRows] = useState([]);

  const keys = [
    "name",
    "image",
    "type",
    "number_of_day",
    "start_date",
    "end_date",
    "user_id",
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
            key={params.row.id}
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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/holiday/${row.id}`,
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
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/holiday`;
      const token = "J0G5gJVBEwxFIR22nox6uK0nPmkkzxeIlNo2a9bS";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const { holiday } = await response.json();
        setRows(
          holiday.map((user) => ({
            id: user.id,
            name: user.name,
            type: user.type,
            image: user.image,
            number_of_day: user.number_of_day,
            start_date: user.start_date,
            end_date: user.end_date,
            user_id: user.user_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/holiday/${id}`,
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
            Holidays
          </h1>
          <p className="text-sm text-gray-400">Holidays List</p>
        </div>
        <Link href="/dashboard/add-new-holiday">
          <ButtonComponent
            icon={<IoMdAdd />}
            content="Add new holiday"
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

export default Holidays;
