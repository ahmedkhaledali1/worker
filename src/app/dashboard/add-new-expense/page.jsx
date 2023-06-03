"use client";
import ButtonComponent from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { BsPerson, BsCalendar, BsFillPersonLinesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import PagesDataGrid from "@/components/PagesDataGrid";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Expense = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    employee_id: "",
    name: "",
    purpose: "",
    date: "",
    value: "",
    description: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const { employee_id, name, purpose, date, value, description } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
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
    if (!event.target.checkValidity()) {
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
    <section>
      <Header
        headerText="Expense"
        chooseInput
        chooseInputText="Choose Employee"
        
      />
      <div className="px-10">
        <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
          <Input
            labelText="Employee ID"
            placeHolder="Employee ID "
            icon={<BsPerson />}
            name="employee_id"
            value={employee_id}
            onChange={onChange}
            type="number"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[23px] my-[23px]">
            <Input
              labelText="Employee name"
              icon={<BsFillPersonLinesFill />}
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <Input
              labelText="purpose"
              placeHolder="The purpose of the expenditure"
              icon={<BsFillPersonLinesFill />}
              name="purpose"
              value={purpose}
              onChange={onChange}
              required
            />
            <Input
              labelText="Time and date"
              icon={<BsCalendar />}
              name="date"
              value={date}
              onChange={onChange}
              type="datetime-local"
              required
            />
            <Input
              labelText="Expense price"
              icon={<BsCalendar />}
              name="value"
              value={value}
              onChange={onChange}
              type="number"
              required
            />
          </div>
          <Input
            labelText="Description"
            placeHolder="Description of expenses"
            type="textarea"
            name="description"
            value={description}
            onChange={onChange}
          />
          <div className="flex justify-between flex-wrap gap-3 my-11">
            <ButtonComponent
              content="Cancel"
              additionalClasses="w-full md:w-auto"
              onClick={cancelFormSubmit}
              type="button"
            />
            <div className="saveBtns flex flex-wrap gap-2">
              <ButtonComponent
                content="save an create another one"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
              <ButtonComponent
                content="save now"
                buttonType="filled"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
            </div>
          </div>
        </form>
        <PagesDataGrid />
      </div>
    </section>
  );
};

export default Expense;
