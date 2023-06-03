'use client';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePhoto } from '@/context/PhotoContext';
import { useSession } from 'next-auth/react';

const Mission = () => {
  const [validated, setValidated] = useState('');
  const [formFields, setFormFields] = useState({
    user_id: '',
    employee_name: '',
    national_number: '',
    Job_number: '',
    description: '',
    name: '',
    massage: '',
  });
  const { data: session } = useSession();

  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const { uploadedPhoto } = usePhoto();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };
  const resetFormFields = () => {
    setFormFields({
      user_id: '',
      employee_name: '',
      national_number: '',
      Job_number: '',
      description: '',
      name: '',
      massage: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/taskEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
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
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity() || !uploadedPhoto) {
      event.stopPropagation();
      setValidated('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }

    setValidated('validated');
    handlePostRequest();
  };

  return (
    <section className="px-10">
      <Header
        chooseInput
        chooseInputText="Choose Employee"
        imageUploader
        headerText="Mission"
      />
      <form
        className={`${validated}`}
        onSubmit={handleFormSubmit}
        autoComplete="on"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="user id"
              placeHolder="user id - from the system"
              icon={<FaUser />}
              type="number"
              name="user_id"
              value={formFields.user_id}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="employee name"
              placeHolder="employee name"
              name="employee_name"
              value={formFields.employee_name}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="national number"
              type="number"
              name="national_number"
              value={formFields.national_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-wrap gap-[23px] flex-1">
            <Input
              labelText="Job number"
              placeHolder="Job number"
              type="number"
              name="Job_number"
              value={formFields.Job_number}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="name"
              placeHolder="name"
              name="name"
              value={formFields.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-rows-1 mt-5 gap-[23px] mb-14">
          <Input
            labelText="Message client"
            placeHolder="the message to the customer"
            type="textarea"
            name="massage"
            value={formFields.massage}
            onChange={handleInputChange}
            required
          />
          <Input
            labelText="description"
            placeHolder="description"
            type="textarea"
            name="description"
            value={formFields.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex justify-center items-center mb-11">
          <ButtonComponent
            content="Save"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default Mission;
