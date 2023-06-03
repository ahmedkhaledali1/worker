'use client';
import React, { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import {
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaIdCard,
  FaClock,
  FaBriefcase,
  FaPlusSquare,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const Leave = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [validated, setValidated] = useState('');
  const [formFields, setFormFields] = useState({
    departureId: '',
    fullName: '',
    jobNumber: '',
    dateWrite: '',
    typeOfDeparture: '',
    nationalNumber: '',
    jobTitle: '',
    writeTime: '',
    startDeparture: '',
    endDeparture: '',
    departureRequests: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  // const resetFormFields = () => {
  //   setFormFields(defaultProps);
  // };
  // const handlePostRequest = async () => {

  //   try {
  //     const response = await fetch('/api/invoice', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formFields),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast.success("Data successfully sent");
  //       resetFormFields();
  //     } else {
  //       toast.error(`Failed to send data: ${data.message}`);
  //       console.error(data);
  //     }
  //   } catch (error) {
  //     toast.error(`${error.method}: ${error.message}`);
  //     console.error("Error:", error);
  //   }
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setValidated('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }

    setValidated('validated');
    // handlePostRequest()
    // Have NO BACK END
  };

  return (
    <section>
      <Header chooseInput chooseInputText="Choose Employee" />
      <form
        className={`${validated}`}
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete="on"
      >
        <div className="px-10 pb-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Departure ID"
                placeHolder="Departure ID - variable by the system"
                icon={<FaUser />}
                type="number"
                name="departureId"
                value={formFields.departureId}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Full name"
                placeHolder="The employee's full name - auto-fill"
                icon={<FaUser />}
                name="fullName"
                value={formFields.fullName}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Job number"
                placeHolder="Job number - auto-fill"
                icon={<FaIdCard />}
                type="number"
                name="jobNumber"
                value={formFields.jobNumber}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Date write"
                placeHolder="the actual date of opening the license"
                icon={<FaCalendarAlt />}
                type="date"
                name="dateWrite"
                value={formFields.dateWrite}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Type of Departure"
                // type="select"
                // selectData={[
                //   { value: "Official", label: "Official" },
                //   { value: "Hourly", label: "Hourly" },
                //   { value: "Part_Time", label: "Part Time" },
                // ]}
                // Have No Back End
                name="typeOfDeparture"
                value={formFields.typeOfDeparture}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Job number"
                placeHolder="Job number - auto-fill"
                icon={<FaBriefcase />}
                type="number"
                name="jobNumber"
                value={formFields.jobNumber}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="National number"
                placeHolder="National number - auto-fill"
                icon={<FaUsers />}
                type="number"
                name="nationalNumber"
                value={formFields.nationalNumber}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Job title"
                placeHolder="Job title - auto-fill"
                icon={<FaIdCard />}
                name="jobTitle"
                value={formFields.jobTitle}
                onChange={handleInputChange}
                required
              />
              <Input
                labelText="Write time"
                placeHolder="the actual time of opening the leave"
                icon={<FaCalendarAlt />}
                type="date"
                name="writeTime"
                value={formFields.writeTime}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  labelText="Start Deparure"
                  icon={<FaClock />}
                  name="startDeparture"
                  value={formFields.startDeparture}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelText="End Deparure"
                  icon={<FaClock />}
                  name="endDeparture"
                  value={formFields.endDeparture}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap flex-1 gap-[23px] mt-5">
            <Input
              labelText="Departure requests"
              icon={<FaPlusSquare />}
              ClassesForTheDiv="h-11"
              name="departureRequests"
              value={formFields.departureRequests}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="Description"
              type="textarea"
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-between flex-wrap gap-3 !my-11">
            <ButtonComponent
              content="Cancel"
              type="button"
              additionalClasses="w-full md:w-auto"
              onClick={() => {
                setFormFields({
                  departureId: '',
                  fullName: '',
                  jobNumber: '',
                  dateWrite: '',
                  typeOfDeparture: '',
                  nationalNumber: '',
                  jobTitle: '',
                  writeTime: '',
                  startDeparture: '',
                  endDeparture: '',
                  departureRequests: '',
                  description: '',
                });
              }}
            />
            <div className="saveBtns flex flex-wrap gap-2">
              <ButtonComponent
                content="save an create another one"
                type="submit"
                additionalClasses="w-full md:w-auto"
                onClick={(event) => {
                  handleFormSubmit(event);
                  setFormFields({
                    departureId: '',
                    fullName: '',
                    jobNumber: '',
                    dateWrite: '',
                    typeOfDeparture: '',
                    nationalNumber: '',
                    jobTitle: '',
                    writeTime: '',
                    startDeparture: '',
                    endDeparture: '',
                    departureRequests: '',
                    description: '',
                  });
                }}
              />
              <ButtonComponent
                content="save now"
                buttonType="filled"
                type="submit"
                additionalClasses="w-full md:w-auto"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Leave;
