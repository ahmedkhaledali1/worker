'use client';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import PagesDataGrid from '@/components/PagesDataGrid';
import { FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const Invoices = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    order_id: '',
    customer_id: '',
    date: '',
    company_id: '',
    remaining_amount: '',
    tax: '',
    total: '',
    title: '',
    value: '',
    discount: '',
    massage: '',
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    order_id,
    customer_id,
    date,
    company_id,
    remaining_amount,
    tax,
    total,
    title,
    value,
    discount,
    massage,
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
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Data successfully sent');
        resetFormFields();
      } else {
        toast.error(`Failed to send data: ${data.message}`);
        console.error(data);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error('Error:', error);
    }
  };

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
        headerText="Invoices"
        chooseInput
        chooseInputText="Choose Employee"
      />
      <div className="px-10 flex flex-col gap-6">
        <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[52px] mb-5 md:mb-[52px]">
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Order ID"
                icon={<FaUserAlt />}
                name="order_id"
                value={order_id}
                onChange={onChange}
                type="number"
                required
              />
              <Input
                labelText="Customer ID"
                icon={<FaCalendarAlt />}
                name="customer_id"
                value={customer_id}
                onChange={onChange}
                type="number"
                required
              />
              <Input
                labelText="Date"
                placeHolder="Date of transmission"
                name="date"
                value={date}
                onChange={onChange}
                icon={<FaCalendarAlt />}
                type="date"
                required
              />
              <Input
                labelText="Company ID"
                icon={<FaCalendarAlt />}
                name="company_id"
                value={company_id}
                onChange={onChange}
                required
              />
              <Input
                labelText="Remaining Amounts"
                placeHolder="All amounts $"
                name="remaining_amount"
                value={remaining_amount}
                onChange={onChange}
                type="number"
                required
              />
              <Input
                labelText="Tax"
                name="tax"
                value={tax}
                onChange={onChange}
                type="number"
                required
              />
            </div>
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Total"
                name="total"
                value={total}
                onChange={onChange}
                required
              />
              <Input
                labelText="Title"
                icon={<MdCalendarMonth />}
                name="title"
                value={title}
                onChange={onChange}
              />
              <Input
                labelText="discount"
                name="discount"
                value={discount}
                onChange={onChange}
              />
              <Input
                labelText="value"
                name="value"
                value={value}
                onChange={onChange}
              />
            </div>
          </div>
          <Input
            labelText="Message Client"
            placeHolder="The message to the customer"
            name="massage"
            value={massage}
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

export default Invoices;
