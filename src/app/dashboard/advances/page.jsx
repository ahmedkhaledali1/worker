'use client';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import PagesDataGrid from '@/components/PagesDataGrid';
import { FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { FiUserCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const Advances = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [formFields, setFormFields] = useState({
    deductionID: '',
    fullName: '',
    jobNumber: '',
    dateWrite: '',
    typeOfLeave: '',
    nationalNumber: '',
    jobTitle: '',
    writeTime: '',
    leaveRequests: '',
    description: '',
  });

  const {
    deductionID,
    fullName,
    jobNumber,
    dateWrite,
    typeOfLeave,
    nationalNumber,
    jobTitle,
    writeTime,
    leaveRequests,
    description,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({
      deductionID: '',
      fullName: '',
      jobNumber: '',
      dateWrite: '',
      typeOfLeave: '',
      nationalNumber: '',
      jobTitle: '',
      writeTime: '',
      leaveRequests: '',
      description: '',
    });
  };

  // const handlePostRequest = async () => {
  //   const url = "https://workerapp.space/public/api/auth/advances";

  //   try {
  //     const response = await fetch(url, {
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
  //  HAVE NO BACKEND
  const [isValid, setIsValid] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setIsValid('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }
    setIsValid('validated');
    handlePostRequest();
  };
  const cancelFormSubmit = () => {
    resetFormFields();
    setIsValid('');
  };
  return (
    <section>
      <Header
        headerText="Requesting an advance"
        chooseInput
        chooseInputText="Choose Employee"
        
      />
      <form
        className={`${isValid} px-10 flex flex-col gap-6`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-row gap-[52px] flex-wrap justify-between">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Deduction ID"
              placeHolder="variable by the system"
              icon={<FaUserAlt />}
              type="number"
              name="deductionID"
              value={deductionID}
              onChange={onChange}
              required
            />
            <Input
              labelText="Full name"
              placeHolder="The employee's full name - auto-fill"
              icon={<FiUserCheck />}
              name="fullName"
              value={fullName}
              onChange={onChange}
              required
            />
            <Input
              labelText="Job number"
              placeHolder="Job number - auto-fill"
              type="number"
              name="jobNumber"
              value={jobNumber}
              onChange={onChange}
              required
            />
            <Input
              labelText="Date write"
              placeHolder="Functional department name - auto-fill"
              icon={<FaCalendarAlt />}
              type="date"
              name="dateWrite"
              value={dateWrite}
              onChange={onChange}
              required
            />
            <Input
              labelText="Type of leave"
              placeHolder="choice one"
              type="select"
              name="typeOfLeave"
              value={typeOfLeave}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Job Number"
              placeHolder="Job number - auto-fill"
              icon={<FiUserCheck />}
              name="jobNumber"
              value={jobNumber}
              onChange={onChange}
              required
            />
            <Input
              labelText="National number"
              placeHolder="National number - auto-fill"
              icon={<MdCalendarMonth />}
              name="nationalNumber"
              value={nationalNumber}
              onChange={onChange}
              required
            />
            <Input
              labelText="Job title"
              placeHolder="Job title - auto-fill"
              name="jobTitle"
              value={jobTitle}
              onChange={onChange}
              required
            />
            <Input
              labelText="Write time"
              placeHolder="the actual time of opening the leave"
              name="writeTime"
              value={writeTime}
              onChange={onChange}
              required
            />
            <Input
              labelText="Leave requests"
              placeHolder="Leave requests - the reason for requesting leave"
              name="leaveRequests"
              value={leaveRequests}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <Input
          labelText="Description"
          placeHolder="Description of truncation"
          type="textarea"
          name="description"
          value={description}
          onChange={onChange}
          required
        />
        <div className="flex justify-between flex-wrap gap-3 my-11">
          <ButtonComponent
            content="Cancel"
            additionalClasses="w-full md:w-auto"
            type="button"
            onClick={cancelFormSubmit}
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

export default Advances;
