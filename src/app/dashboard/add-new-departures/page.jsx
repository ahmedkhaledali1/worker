'use client';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { usePhoto } from '@/context/PhotoContext';
import { useSession } from 'next-auth/react';

const Departures = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [departures, setDepartures] = useState({
    employee_name: '',
    employee_id: '',
    Job_number: '',
    national_number: '',
    value: '',
    description: '',
    specialization: '',
    image: '',
    date: '',
  });
  const { uploadedImage } = usePhoto();

  const onChange = (event) => {
    const { name, value } = event.target;
    setDepartures({ ...departures, [name]: value });
  };
  const resetFormFields = () => {
    setDepartures({
      employee_name: '',
      employee_id: '',
      Job_number: '',
      national_number: '',
      value: '',
      description: '',
      specialization: '',
      date: '',
    });
  };

  const handlePostRequest = async () => {

    try {
      const response = await fetch('/api/debt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...departures, image: uploadedImage }),
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity() || !uploadedImage) {
      event.stopPropagation();
      setIsValid('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }

    setIsValid('validated');
    handlePostRequest();
    resetFormFields();
  };

  return (
    <section>
      <Header imageUploader headerText="Departures" />
      <form
        className={`px-10 flex flex-col gap-6 ${isValid}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-row gap-[52px] flex-wrap justify-between">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="employee_name"
              placeHolder="employee_name"
              icon={<FaUserAlt />}
              name="employee_name"
              value={departures.employee_name}
              onChange={onChange}
              required
            />
            <Input
              labelText="employee_id"
              placeHolder="employee_id"
              icon={<HiOutlineMail />}
              name="employee_id"
              value={departures.employee_id}
              onChange={onChange}
              required
            />
            <Input
              labelText="Job_number"
              name="Job_number"
              value={departures.Job_number}
              onChange={onChange}
              required
            />
            <Input
              labelText="national_number"
              name="national_number"
              value={departures.national_number}
              onChange={onChange}
              type="number"
            />
            <Input
              labelText="value"
              name="value"
              value={departures.value}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="value"
              name="value"
              value={departures.value}
              onChange={onChange}
            />
            <Input
              labelText="specialization"
              name="specialization"
              value={departures.specialization}
              onChange={onChange}
            />

            <Input
              labelText="date"
              name="date"
              value={departures.date}
              onChange={onChange}
              type="date"
            />
          </div>
        </div>
        <div>
          <Input
            labelText="description"
            name="description"
            value={departures.description}
            onChange={onChange}
            type="textarea"
            required
          />
        </div>
        <div className="flex !my-[129px] justify-center items-center">
          <ButtonComponent
            content="Submit"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default Departures;
