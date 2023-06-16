"use client";
import ButtonComponent from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const PriceOffer = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [rows, setRows] = useState([]);

  const keys = [
    "title",
    "discount",
    "company_id",
    "tax",
    "price",
    "product_id",
    "customer_id",
    "message",
    "address",
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
            key={params.id}
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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/offer_prices/${row.id}`,
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
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/offer_prices`;

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

      const { offer } = await response.json();
      setRows(
        offer.map((user) => ({
          id: user.id,
          title: user.title,
          discount: user.discount,
          company_id: user.company_id,
          tax: user.tax,
          image: user.image,
          price: user.price,
          product_id: user.product_id,
          customer_id: user.customer_id,
          message: user.message,
          address: user.address,
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
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/offer_prices/${id}`,
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
            Price Offers
          </h1>
          <p className="text-sm text-gray-400">
            Total Number Of Price Offers ({rows.length})
          </p>
        </div>
        <Link href="/dashboard/add-new-offer_prices">
          <ButtonComponent
            icon={<IoMdAdd />}
            content="Add new offer"
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

export default PriceOffer;
