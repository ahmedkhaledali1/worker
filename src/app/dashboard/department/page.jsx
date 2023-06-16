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

const Department = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState(
    "J0G5gJVBEwxFIR22nox6uK0nPmkkzxeIlNo2a9bS"
  );
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [rows, setRows] = useState([]);

  const keys = [
    "name",
    "email",
    "email_verified_at",
    "username",
    "phone",
    "Company_Name",
    "Company_Address",
    "Company_Address_2",
    "City",
    "Postal_code",
    "Country",
    "Company_email",
    "national_number",
    "working_days",
    "date_of_birth",
    "Job_number",
    "Date_of_employee_registration_in_system",
    "Date_of_employee_registration_in_company",
    "department_id",
    "Beginning_work",
    "finished_work",
    "status",
    "total_salary",
    "partial_salary",
    "bonuses",
    "overtime",
    "group_id",
    "manger_id",
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
      field: "type",
      headerName: "Type",
      width: 170,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
      editable: true,
      renderCell: (params) => createStatusCell(params.value),
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
  //create Status Cell
  const statusColors = {
    user: ["bg-blue-400/20", "text-blue-500"],
    admin: ["bg-green-400/20", "text-green-500"],
  };

  const createStatusCell = (status) => {
    const [bgColor, textColor] = statusColors[status];

    return (
      <div
        className={`${bgColor} ${textColor} font-semibold rounded-full px-3 py-2`}
      >
        <span>{status}</span>
      </div>
    );
  };

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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/department`,
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

      const { department } = await response.json();
      setRows(
        department.map(({ company }, index) => ({
          id: index + 1,
          name: company.name,
          type: company.type,
          email: company.email,
          email_verified_at: company.email_verified_at,
          username: company.username,
          image: company.image || "/assets/sidebar icon.png",
          phone: company.phone,
          Company_Name: company.Company_Name,
          Company_Address: company.Company_Address,
          Company_Address_2: company.Company_Address_2,
          City: company.City,
          Postal_code: company.Postal_code,
          Country: company.Country,
          Company_email: company.Company_email,
          national_number: company.national_number,
          working_days: company.working_days,
          date_of_birth: company.date_of_birth,
          Job_number: company.Job_number,
          Date_of_employee_registration_in_system:
            company.Date_of_employee_registration_in_system,
          Date_of_employee_registration_in_company:
            company.Date_of_employee_registration_in_company,
          department_id: company.department_id,
          Beginning_work: company.Beginning_work,
          finished_work: company.finished_work,
          status: company.status,
          total_salary: company.total_salary,
          partial_salary: company.partial_salary,
          bonuses: company.bonuses,
          overtime: company.overtime,
          group_id: company.group_id,
          manger_id: company.manger_id,
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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/department/${id}`,
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
            Department
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
              Total Number Of Departments ({rows.length})
            </p>
          </div>
        </div>
        <Link href="/dashboard/add-new-department">
          <ButtonComponent
            icon={<IoMdAdd />}
            content="Add new department"
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

export default Department;
