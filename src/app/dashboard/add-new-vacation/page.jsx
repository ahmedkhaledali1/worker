"use client";
import React, { useEffect, useState } from "react";
import ButtonComponent from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaIdCard,
  FaBriefcase,
  FaPlusSquare,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";

const Vacation = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    employee_name: "",
    Job_number: "",
    employee_id: "",
    description: "",
    reason: "",
    national_number: "",
    specialization: "",
    date: "",
    type: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    employee_name,
    Job_number,
    employee_id,
    description,
    reason,
    national_number,
    specialization,
    date,
    type,
  } = formFields;

  const { uploadedPhoto } = usePhoto();
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/vacation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Data successfully sent");
        console.log(data);
      } else {
        toast.error(`Failed to send data: ${data.message}`);
        console.error(data);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error("Error:", error);
    }
  };

  const [isValid, setIsValid] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity() || !uploadedPhoto) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };
  const cancelFormSubmit = () => {
    resetFormFields();
    setIsValid("");
  };
  return (
    <section className="px-10">
      <Header
        headerText="Vacations"
        chooseInput
        chooseInputText="Choose Employee"
        imageUploader
      />
      <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
        <div className="flex flex-row gap-[52px] flex-wrap justify-between mb-[89px]">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Employee Name"
              placeHolder="Employee Name - variable by the system"
              icon={<FaUser />}
              name="employee_name"
              value={employee_name}
              onChange={onChange}
              required
            />
            <Input
              labelText="Job Number"
              placeHolder="Job Number - auto-fill"
              icon={<FaIdCard />}
              name="Job_number"
              value={Job_number}
              onChange={onChange}
              type="number"
              required
            />
            <Input
              labelText="Employee ID"
              placeHolder="Employee ID - auto-fill"
              icon={<FaUser />}
              name="employee_id"
              value={employee_id}
              onChange={onChange}
              required
            />
            <Input
              labelText="Description"
              placeHolder="Description"
              icon={<FaPlusSquare />}
              name="description"
              value={description}
              onChange={onChange}
            />
            <Input
              labelText="Reason"
              placeHolder="Reason"
              icon={<FaPlusSquare />}
              name="reason"
              value={reason}
              onChange={onChange}
            />
            <Input
              labelText="Type"
              placeHolder="type"
              name="type"
              value={type}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="National Number"
              placeHolder="National Number - auto-fill"
              icon={<FaUsers />}
              name="national_number"
              value={national_number}
              onChange={onChange}
              type="number"
              required
            />
            <Input
              labelText="Specialization"
              placeHolder="Specialization - auto-fill"
              icon={<FaBriefcase />}
              name="specialization"
              value={specialization}
              onChange={onChange}
            />

            <Input
              labelText="Date"
              placeHolder="Date"
              icon={<FaCalendarAlt />}
              name="date"
              value={date}
              onChange={onChange}
              type="date"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <ButtonComponent content="Reset" onClick={cancelFormSubmit} />
          <ButtonComponent content="Submit" type="submit" />
        </div>
      </form>
    </section>
  );
};

export default Vacation;
