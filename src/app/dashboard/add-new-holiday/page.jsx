'use client';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { usePhoto } from '@/context/PhotoContext';

const HolidayDays = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [holidayType, setHolidayType] = useState([]);
  const [holiday, setHoliday] = useState({
    name: '',
    type: '',
    number_of_day: '',
    start_day: '',
    end_day: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setHoliday({ ...holiday, [name]: value });
  };
  const resetFormFields = () => {
    setHoliday({
      name: '',
      type: '',
      number_of_day: '',
      start_day: '',
      end_day: '',
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/holiday`,
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

        const { holiday } = await response.json();
        setHolidayType(holiday.map((user) => user.type));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const { UploadedImage } = usePhoto();
  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/holiday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...holiday, image: UploadedImage }),
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
    if (!event.target.checkValidity() || !UploadedImage) {
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
      <Header
        chooseInput
        chooseInputText="Choose Employee"
        imageUploader
        headerText="Holiday Days"
      />
      <form
        className={`px-10 flex flex-col gap-6 ${isValid}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-row gap-[52px] flex-wrap justify-between">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Holiday Name"
              placeHolder="Holiday Name"
              icon={<FaUserAlt />}
              name="name"
              value={holiday.name}
              onChange={onChange}
              required
            />
            <Input
              labelText="Holiday Type"
              placeHolder="Choose One"
              icon={<HiOutlineMail />}
              name="type"
              value={holiday.type}
              onChange={onChange}
              type="select"
              selectData={holidayType.length > 1 ? holidayType : []}
              required
            />
            <Input
              labelText="Start Day"
              name="start_day"
              value={holiday.start_day}
              onChange={onChange}
              type="date"
              required
            />
          </div>
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Number of Days"
              name="number_of_day"
              value={holiday.number_of_day}
              onChange={onChange}
              type="number"
              required
            />
            <Input
              labelText="End Day"
              name="end_day"
              value={holiday.end_day}
              onChange={onChange}
              type="date"
              required
            />
          </div>
        </div>
        <div className="flex !my-[129px] justify-center items-center">
          <ButtonComponent
            content="Save Holiday"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default HolidayDays;
