"use client";
import ButtonComponent from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PagesDataGrid from "@/components/PagesDataGrid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  BsCalendar,
  BsFillEnvelopeFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";

const Customers = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      console.log(session.user)
    }
  }, [session]);

  const defaultFields = {
    company_id: "",
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    email: "",
    website: "",
    facebook_link: "",
    tweeter_link: "",
    youtube_link: "",
    linkedin_link: "",
    instgram_link: "",
    address_1: "",
    address_2: "",
    town: "",
    interrupt: "",
    zipcode: "",
    country: "",
  };
  const [formFields, setFormFields] = useState(defaultFields);

  const {
    company_id,
    first_name,
    last_name,
    company_name,
    phone,
    email,
    website,
    facebook_link,
    tweeter_link,
    youtube_link,
    linkedin_link,
    instgram_link,
    address_1,
    address_2,
    town,
    interrupt,
    zipcode,
    country,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };

  const handlePostRequest = async () => {
    try {
      console.log(formFields);
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Customer added successfully");
        resetFormFields();
      } else {
        toast.error(`Failed to added Customer: ${data.message}`);
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

  return (
    <section>
      <Header
        headerText="Customers"
        chooseInput
        chooseInputText="Choose Customer"
      />
      <form
        className={`px-10 flex flex-col gap-6 ${isValid}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-row gap-[52px] flex-wrap justify-between">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              name="company_id"
              value={company_id}
              onChange={onChange}
              labelText="Company ID"
              placeHolder="Company ID - from the system"
              icon={<BsFillPersonLinesFill />}
              type="number"
            />
            <Input
              name="first_name"
              value={first_name}
              onChange={onChange}
              labelText="First Name"
              placeHolder="Customer First Name"
              icon={<BsFillPersonLinesFill />}
            />
            <div className="flex gap-3">
              <div className="w-[33%]">
                <Input
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  labelText="Main Phone"
                  icon={<BsFillPersonLinesFill />}
                  type="tel"
                  ClassesForTheLabel="!text-[14px]"
                />
              </div>
              <div className="w-[67%]">
                <Input
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  labelText="Phone Number"
                  placeHolder="Phone Number"
                  icon={<BsFillPersonLinesFill />}
                />
              </div>
            </div>
            <Input
              name="address_2"
              value={address_2}
              onChange={onChange}
              labelText="Address 2"
              placeHolder="customer address"
              icon={<FiMapPin />}
            />
            <Input
              name="address_1"
              value={address_1}
              onChange={onChange}
              labelText="Address 1"
              placeHolder="customer address"
              icon={<FiMapPin />}
            />
            <div className="flex gap-3">
              <div className="w-[33%]">
                <Input
                  name="town"
                  value={town}
                  onChange={onChange}
                  labelText="Town/City"
                  placeHolder="Town/City"
                  icon={<BsFillPersonLinesFill />}
                />
              </div>
              <div className="w-[67%]">
                <Input
                  name="interrupt"
                  value={interrupt}
                  onChange={onChange}
                  labelText="Interrupt"
                  icon={<BsFillPersonLinesFill />}
                />
              </div>
            </div>
            <Input
              name="company_name"
              value={company_name}
              onChange={onChange}
              labelText="Company Name"
              placeHolder="the name of client company"
              icon={<BsCalendar />}
            />
            <Input
              name="last_name"
              value={last_name}
              onChange={onChange}
              labelText="Last Name"
              placeHolder="Last Name of client"
              icon={<BsCalendar />}
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              name="email"
              value={email}
              onChange={onChange}
              labelText="Email"
              icon={<BsFillEnvelopeFill />}
              type="email"
            />

            <div className="flex gap-3">
              <div className="w-[33%]">
                <Input
                  name="zipcode"
                  value={zipcode}
                  onChange={onChange}
                  labelText="Zip Code"
                  icon={<BsFillEnvelopeFill />}
                />
              </div>
              <div className="w-[67%]">
                <Input
                  name="country"
                  value={country}
                  onChange={onChange}
                  labelText="Country"
                />
              </div>
            </div>
            <Input
              name="website"
              value={website}
              onChange={onChange}
              labelText="Website"
              placeHolder="the name of site attributed to"
              icon={<BsFillPersonLinesFill />}
            />
            <Input
              name="tweeter_link"
              value={tweeter_link}
              onChange={onChange}
              labelText="Twitter Link"
              placeHolder="customer twitter link"
              icon={<FaTwitter />}
              type="url"
            />
            <Input
              name="linkedin_link"
              value={linkedin_link}
              onChange={onChange}
              labelText="Linkedin Link"
              placeHolder="linkedin link to client"
              icon={<FaLinkedin />}
              type="url"
            />
            <Input
              name="facebook_link"
              value={facebook_link}
              onChange={onChange}
              labelText="Facebook Link"
              placeHolder="Facebook link"
              icon={<FaFacebook />}
              type="url"
            />
            <Input
              name="youtube_link"
              value={youtube_link}
              onChange={onChange}
              labelText="Youtube Link"
              placeHolder="Youtube link"
              icon={<FaYoutube />}
              type="url"
            />
            <Input
              name="instgram_link"
              value={instgram_link}
              onChange={onChange}
              labelText="Instgram Link"
              placeHolder="Instgram link"
              icon={<FaInstagram />}
              type="url"
            />
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-3">
          <ButtonComponent
            content="Cancel"
            additionalClasses="w-full md:w-auto"
            onClick={resetFormFields}
            type="button"
          />
          <div className="saveBtns flex flex-wrap gap-2">
            <ButtonComponent
              content="save an create another one"
              additionalClasses="w-full md:w-auto"
            />
            <ButtonComponent
              content="save now"
              buttonType="filled"
              additionalClasses="w-full md:w-auto"
              type="submit"
            />
          </div>
        </div>
        <PagesDataGrid />
      </form>
    </section>
  );
};

export default Customers;
