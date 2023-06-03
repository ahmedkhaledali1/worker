'use client';
import { useEffect, useState } from 'react';
import { FaUser, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const Employees = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [isValid, setIsValid] = useState('');
  const defaultProps = {
    name: '',
    email: '',
    national_number: '',
    date_of_birth: '',
    Job_number: '',
    Date_of_employee_registration_in_system: '',
    Date_of_employee_registration_in_company: '',
    total_salary: '',
    working_days: '',
    department_id: '',
    status: '',
    manger_id: '',
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    name,
    email,
    national_number,
    date_of_birth,
    Job_number,
    Date_of_employee_registration_in_system,
    Date_of_employee_registration_in_company,
    total_salary,
    partial_salary,
    working_days,
    department_id,
    status,
    manger_id,
  } = formFields;
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      console.log(token);
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success('Data successfully sent');
        resetFormFields();
        setIsValid('');
      } else {
        toast.error('Failed to send data');
        setIsValid('');
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setIsValid('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }
    setIsValid('validated');
    handlePostRequest();
  };

  return (
    <section>
      <Header headerText="Add New Employee" />

      <form
        className={`${isValid} px-10`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="flex flex-row gap-12 flex-wrap justify-between mb-20">
          <div className="flex flex-col gap-6 flex-1">
            <Input
              labelText="Name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              icon={<FaUser />}
            />
            <Input
              labelText="National Number"
              name="national_number"
              value={national_number}
              onChange={onChange}
              icon={<FaUsers />}
              type="number"
            />
            <Input
              labelText="Job Number"
              name="Job_number"
              value={Job_number}
              onChange={onChange}
              icon={<FaUsers />}
              type="number"
            />
            <Input
              name="Date_of_employee_registration_in_company"
              value={Date_of_employee_registration_in_company}
              onChange={onChange}
              labelText="Registration"
              placeholder="Employee registration in the company"
              icon={<FaCalendarAlt />}
              type="date"
            />
            <Input
              name="total_salary"
              value={total_salary}
              onChange={onChange}
              labelText="Total Salary"
              placeholder="Total Salary"
            />

            <Input
              name="department_id"
              value={department_id}
              onChange={onChange}
              labelText="Department ID"
              placeholder="Department ID"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <Input
              labelText="Email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              icon={<FaUser />}
            />
            <Input
              name="date_of_birth"
              value={date_of_birth}
              onChange={onChange}
              labelText="Date of Birth"
              placeholder="Employee date of birth"
              type="date"
              icon={<FaCalendarAlt />}
            />
            <Input
              name="Date_of_employee_registration_in_system"
              value={Date_of_employee_registration_in_system}
              onChange={onChange}
              labelText="Date Registration"
              placeholder="Employee date of registration"
              icon={<FaCalendarAlt />}
              type="date"
            />
            <Input
              name="working_days"
              value={working_days}
              onChange={onChange}
              labelText="Working Days"
              placeholder="Working Days"
              icon={<FaCalendarAlt />}
              type="number"
            />
            <Input
              name="status"
              onChange={onChange}
              labelText="Status"
              icon={<FaUsers />}
              typeOfSelectData="normal"
              type="select"
              selectData={[
                { value: 'Official', label: 'Official' },
                { value: 'Hourly', label: 'Hourly' },
                { value: 'Part_Time', label: 'Part Time' },
              ]}
            />
            <Input
              name="manger_id"
              value={manger_id}
              onChange={onChange}
              labelText="Manager ID"
              placeholder="Manager ID"
              type="number"
            />
          </div>
        </div>

        <ButtonComponent
          content="Add Employee"
          type="submit"
          buttonType="filled"
        />
      </form>
    </section>
  );
};

export default Employees;
