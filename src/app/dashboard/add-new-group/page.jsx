'use client';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePhoto } from '@/context/PhotoContext';
import { useSession } from 'next-auth/react';

const WorkingGroups = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [formFields, setFormFields] = useState({
    company_id: '',
    name: '',
    description: '',
    admin: '',
  });

  const { uploadedPhoto } = usePhoto();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({
      company_id: '',
      name: '',
      description: '',
      admin: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Group added successfully');
        resetFormFields();
      } else {
        toast.error(`Failed to save task: ${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error('Error:', error);
    }
  };

  const [validated, setValidated] = useState('');
  const handleSubmit = (event) => {
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
    <section>
      <Header imageUploader headerText="Working Groups" />
      <form
        className={`px-10 pb-7 flex flex-col gap-5 ${validated}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          labelText="company id"
          placeHolder="company id"
          icon={<FaUser />}
          type="number"
          name="company_id"
          value={formFields.company_id}
          onChange={onChange}
          required
        />

        <Input
          labelText="Group name"
          name="name"
          value={formFields.name}
          onChange={onChange}
          required
        />
        <Input
          labelText="admin"
          placeHolder="admin"
          name="admin"
          value={formFields.admin}
          onChange={onChange}
          required
        />
        <Input
          labelText="Description"
          placeHolder="description of the group"
          type="textarea"
          name="description"
          value={formFields.description}
          onChange={onChange}
          required
        />

        <div className="flex justify-center items-center my-11">
          <ButtonComponent
            content="Save group"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default WorkingGroups;
