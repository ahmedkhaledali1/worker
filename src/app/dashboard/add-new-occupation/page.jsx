"use client";
import ButtonComponent from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import PagesDataGrid from "@/components/PagesDataGrid";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePhoto } from "@/context/PhotoContext";
import {MdPerson } from "react-icons/md";
import { AiOutlineIdcard  } from "react-icons/ai";

const Occupation = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      console.log(session.user)
    }
  }, [session]);
  const defaultProps = {
    name: "",
    customer_id: "",
    description: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const { name, customer_id, description } = formFields;
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
      const response = await fetch("/api/occupation", {
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
    <section>
      <Header
        imageUploader
        headerText="Add Occupation"
        chooseInputText="Choose Employee"
      />
      <div className="px-10 flex flex-col gap-6">
        <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[52px] mb-5 md:mb-[52px]">
            <Input
              icon={<MdPerson />}
              labelText="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <Input
              labelText="Customer ID"
              icon={<AiOutlineIdcard />}
              name="customer_id"
              value={customer_id}
              onChange={onChange}
              type="number"
              required
            />
          </div>

          <Input
            labelText="description"
            name="description"
            value={description}
            onChange={onChange}
            type="textarea"
          />
          <div className="flex justify-between flex-wrap gap-3 my-11">
            <ButtonComponent
              content="Cancel"
              type="button"
              additionalClasses="w-full md:w-auto"
              onClick={cancelFormSubmit}
            />
            <div className="saveBtns flex flex-wrap gap-2">
              <ButtonComponent
                content="Save and create another one"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
              <ButtonComponent
                content="Save now"
                buttonType="filled"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
            </div>
          </div>
          <PagesDataGrid />
        </form>
      </div>
    </section>
  );
};

export default Occupation;
