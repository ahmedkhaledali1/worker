'use client'
import ButtonComponent from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";

const Settings = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    personalEmail: "",
    companyAddress: "",
    country: "",
    officialEmail: "",
    phoneNumber: "",
    companyName: "",
    companyAddress2: "",
    city: "",
    postalCode: "",
    oldPassword: "",
    newPassword: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const [isValidated, setIsValidated] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setIsValidated("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }
// if(formFields.newPassword !== formFields.)
    setIsValidated("validated");
    // handle your form submission logic here
  };

  return (
    <section>
      <Header headerText="Settings page" />
      <form
        className={`px-10 flex flex-col gap-6 ${isValidated}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-row gap-[52px] flex-wrap justify-between">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Username"
              icon={<FaUserAlt />}
              name="username"
              value={formFields.username}
              onChange={onChange}
              required
            />
            <Input
              labelText="Email"
              placeHolder="Personal Email"
              icon={<HiOutlineMail />}
              type="email"
              name="personalEmail"
              value={formFields.personalEmail}
              onChange={onChange}
              required
            />
            <Input
              labelText="Company address "
              placeHolder="Company address "
              name="companyAddress"
              value={formFields.companyAddress}
              onChange={onChange}
              required
            />
            <Input
              labelText="Country"
              placeHolder="Chose country"
              type="select"
              name="country"
              value={formFields.country}
              onChange={onChange}
              required
            />
            <Input
              labelText="Official email"
              placeHolder="Official email company"
              name="officialEmail"
              value={formFields.officialEmail}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Phone number"
              type="tel"
              icon={<BsFillTelephoneFill />}
              name="phoneNumber"
              value={formFields.phoneNumber}
              onChange={onChange}
              required
            />
            <Input
              labelText="Company name"
              type="text"
              name="companyName"
              value={formFields.companyName}
              onChange={onChange}
              required
            />
            <Input
              labelText="Company address"
              placeHolder="Company address 2"
              name="companyAddress2"
              value={formFields.companyAddress2}
              onChange={onChange}
              required
            />
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <Input
                labelText="City"
                name="city"
                value={formFields.city}
                onChange={onChange}
                required
              />
              <Input
                labelText="Postal code"
                type="text"
                name="postalCode"
                value={formFields.postalCode}
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex !mt-[129px] justify-center items-center">
          <ButtonComponent
            content="Save Setting"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
        <div className="flex flex-wrap items-center flex-1 gap-[43px]">
          <Input
            labelText="Old password"
            type="password"
            name="oldPassword"
            value={formFields.oldPassword}
            onChange={onChange}
            required
          />
          <Input
            labelText="New password"
            type="password"
            name="newPassword"
            value={formFields.newPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex !my-3 justify-end items-center">
          <ButtonComponent
            content="Save Setting"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default Settings;
