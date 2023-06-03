"use client";
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineFilterAlt } from 'react-icons/md';

import ButtonComponent from '@/components/Button';
import DataGridComponent from '@/components/DataGrid';
import Link from 'next/link';

const DepartmentTheJobSite = () => {
  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const roles = [
    'UI Developer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Software Engineer',
    'Quality Assurance',
  ];

  const statusColors = {
    active: ['bg-green-400/20', 'text-green-500'],
    inactive: ['bg-red-400/20', 'text-red-500'],
    vacation: ['bg-yellow-400/20', 'text-yellow-500'],
  };

  const createStatusCell = (status) => {
    const [bgColor, textColor] = statusColors[status] || ['', ''];

    return (
      <div className={`${bgColor} ${textColor} font-semibold rounded-full px-3 py-2`}>
        <span>{status}</span>
      </div>
    );
  };

  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'loading...',
      email: 'loading...',
      role: 'loading...',
      checkIn: 'loading...',
      checkOut: 'loading...',
      workTime: 'loading...',
    },
  ]);
  const columns = [
    {
      field: "rowNumber",
      headerName: "",
      renderCell: (params) => <div>{params.id}</div>,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "checkIn",
      headerName: "Check In",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "checkOut",
      headerName: "Check Out",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: "workTime",
      headerName: "Work Time",
      flex: 1,
      headerClassName: "datagrid-header",
      cellClassName: "datagrid-cell",
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'datagrid-header',
      cellClassName: 'datagrid-cell',
      renderCell: (params) => createStatusCell(params.value),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/department`;
      const token = 'J0G5gJVBEwxFIR22nox6uK0nPmkkzxeIlNo2a9bS';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const { department } = await response.json();
        setRows(
          department.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email || 'company@gmail.com',
            role: randomElement(roles),
            checkIn: user.Beginning_work || '08:00 AM',
            checkOut: user.finished_work || '05:10 PM',
            workTime: '08:00:00',
            status: randomElement(Object.keys(statusColors)),
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${id}`, JSON.stringify(updatedData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error(`Error updating the data: ${error}`)
      console.error(`Error updating the data: ${error}`);
    }
  }

  const handleCellEditCommit = (params, event) => {
    const { id, value, field, row } = params;
    const newValue = event.target.value;

    if (value === newValue) return;
    const updatedData = {
      ...row, [field]: newValue
    };
    handleDataGridUpdate(updatedData, id);
    toast.success(`"${value}" updated to "${newValue}" successfully`)
  };
  return (
    <section className="px-8 pb-7">
      <div className="flex items-center flex-wrap justify-between my-3">
        <div>
          <h1 className="text-2xl font-semibold mb-2 dark:text-slate-100">
            Department the job site
          </h1>
          <div className="flex items-center justify-start gap-3">
            <ButtonComponent
              content="Filter"
              buttonType="filled"
              bgColor="!bg-gray-300"
              fontColor="text-[#4a4a4a]"
              icon={<MdOutlineFilterAlt size={25} />}
            />
            <p className="text-sm text-gray-400">Total Number Of Departments ({rows.length})</p>
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
      <DataGridComponent rows={rows} columns={columns} onCellEditStop={handleCellEditCommit}/>
    </section>
  );
};

export default DepartmentTheJobSite;
