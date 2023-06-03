'use client';
import { useEffect, useState } from 'react';
import { FaUser, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const Salaries = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    employee_id: '',
    date: '',
    Job_number: '',
    employee_name: '',
    national_number: '',
    section_id: '',
    deductions: '',
    tax: '',
    social_security: '',
    net_salary: '',
    discounts: '',
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    employee_id,
    date,
    Job_number,
    employee_name,
    national_number,
    section_id,
    deductions,
    tax,
    social_security,
    net_salary,
    discounts,
  } = formFields;
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/salarie', {
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
      } else {
        toast.error('Failed to send data');
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };
  const [isValid, setIsValid] = useState('');
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
      <Header headerText="Salaries" />

      <form className={`${isValid} px-10`} onSubmit={handleFormSubmit}>
        <div className="flex flex-row gap-12 flex-wrap justify-between mb-20">
          <div className="flex flex-col gap-6 flex-1">
            <Input
              labelText="Employee ID"
              name="employee_id"
              value={employee_id}
              onChange={onChange}
              icon={<FaUser />}
            />
            <Input
              labelText="Date"
              name="date"
              value={date}
              onChange={onChange}
              icon={<FaCalendarAlt />}
            />
            <Input
              labelText="Job Number"
              name="Job_number"
              value={Job_number}
              onChange={onChange}
              icon={<FaUsers />}
            />
            <Input
              labelText="Employee Name"
              name="employee_name"
              value={employee_name}
              onChange={onChange}
            />
            <Input
              labelText="National Number"
              name="national_number"
              value={national_number}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <Input
              labelText="Section ID"
              name="section_id"
              value={section_id}
              onChange={onChange}
            />
            <Input
              labelText="Deductions"
              name="deductions"
              value={deductions}
              onChange={onChange}
            />
            <Input labelText="Tax" name="tax" value={tax} onChange={onChange} />
            <Input
              labelText="Social Security"
              name="social_security"
              value={social_security}
              onChange={onChange}
            />
            <Input
              labelText="Net Salary"
              name="net_salary"
              value={net_salary}
              onChange={onChange}
            />
            <Input
              labelText="discounts"
              name="discounts"
              value={discounts}
              onChange={onChange}
            />
          </div>
        </div>

        <ButtonComponent content="submit" type="submit" buttonType="filled" />
      </form>
    </section>
  );
};

export default Salaries;
