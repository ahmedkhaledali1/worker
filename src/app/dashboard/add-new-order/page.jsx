'use client';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { BiCalendar } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const NewOrder = () => {
  const [token, setToken] = useState('');
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [validated, setValidated] = useState('');
  const [formFields, setFormFields] = useState({
    title: '',
    details: '',
    notes: '',
    date: '',
    begin_date: '',
    customer_id: '',
    company_id: '',
    group_id: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetFormFields = () => {
    setFormFields({
      title: '',
      details: '',
      notes: '',
      date: '',
      begin_date: '',
      customer_id: '',
      company_id: '',
      group_id: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Task saved successfully');
        resetFormFields();
      } else {
        toast.error(`Failed to save task: ${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error('Error:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setValidated('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }

    setValidated('validated');
    handlePostRequest();
  };

  const [companyIdOrder, setCompanyIdOrder] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/order`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const { order } = await response.json();
        setCompanyIdOrder(order.map((orderthing) => orderthing.company_id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <section>
      <Header headerText="New Order" />
      <form
        className={`${validated} px-10`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="title"
              icon={<FaUser />}
              name="title"
              value={formFields.title}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="details"
              name="details"
              value={formFields.details}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="notes"
              name="notes"
              value={formFields.notes}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="begin date"
              type="date"
              name="begin_date"
              value={formFields.begin_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-wrap gap-[23px] flex-1">
            <Input
              labelText="Customer"
              placeHolder="choose customer"
              name="customer_id"
              value={formFields.customer_id}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="company id"
              type="select"
              selectData={companyIdOrder}
              name="company_id"
              value={formFields.company_id}
              onChange={handleInputChange}
              ClassesForTheDiv="h-[3rem]"
              required
            />
            <Input
              labelText="Date"
              placeHolder="choose service"
              type="date"
              icon={<BiCalendar />}
              name="date"
              value={formFields.date}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="group_id"
              type="date"
              icon={<BiCalendar />}
              name="group_id"
              value={formFields.group_id}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-center items-center my-11">
          <ButtonComponent
            content="Save Order"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default NewOrder;
