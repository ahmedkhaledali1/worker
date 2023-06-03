'use client';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import PagesDataGrid from '@/components/PagesDataGrid';
import { usePhoto } from '@/context/PhotoContext';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BsPerson, BsPersonCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';

const AddProductPage = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    company_id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    type: '',
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const { company_id, name, description, price, quantity, type } = formFields;

  const { uploadedPhoto } = usePhoto();
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {

    try {
      const response = await fetch('/api/product', {
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
  const [isValid, setIsValid] = useState('');
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity() || !uploadedPhoto) {
      setIsValid('not-validated');
      toast.error('Please fill in all required fields');
      return;
    }
    setIsValid('validated');
    handlePostRequest();
  };
  return (
    <section className="px-10">
      <Header imageUploader headerText="add new product" />
      <div className="px-10 mb-9">
        <form
          className={`flex mx-auto w-[80%] flex-col gap-6 ${isValid} `}
          onSubmit={handleFormSubmit}
        >
          <div className="flex w-full justify-between ">
            <div className="w-[45%]">
              <Input
                ClassesForTheInput="h-12"
                ClassesForTheLabel="h-12 !text-center !py-3"
                labelText="Company ID"
                placeHolder="Company ID - from the system"
                icon={<BsPerson size={30} />}
                name="company_id"
                value={company_id}
                onChange={onChange}
              />
            </div>
            <div className="w-[45%]">
              <Input
                ClassesForTheInput="h-12"
                ClassesForTheLabel="h-12 !text-center !py-3"
                labelText="Product Type"
                placeHolder="Choose Type"
                icon={<BsPersonCheck size={30} />}
                name="type"
                value={type}
                onChange={onChange}
              />
            </div>
          </div>
          <div className=" w-full self-center ">
            <div>
              <Input
                ClassesForTheInput="h-11 "
                ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
                labelText="Product Name "
                placeHolder="Product Name"
                icon={<BsPerson size={30} />}
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className="w-[45%]">
              <Input
                ClassesForTheInput="h-12"
                ClassesForTheLabel="h-12 !text-center !py-3"
                labelText="Price "
                placeHolder="Price"
                name="price"
                value={price}
                onChange={onChange}
                icon={<BsPerson size={30} />}
              />
            </div>
            <div className="w-[45%]">
              <Input
                ClassesForTheInput="h-12"
                ClassesForTheLabel="h-12 !text-center !py-3"
                labelText="Quantity"
                placeHolder="Quantity"
                icon={<BsPersonCheck size={30} />}
                name="quantity"
                value={quantity}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <Input
              labelText="Description"
              name="description"
              value={description}
              onChange={onChange}
              type="textarea"
            />
          </div>

          <div className="flex justify-between">
            <ButtonComponent
              content="Cancel"
              type="button"
              onClick={resetFormFields}
              additionalClasses="w-[10%]"
            />

            <ButtonComponent
              content="save an create another one"
              additionalClasses=" md:w-auto"
            />
            <ButtonComponent
              type="submit"
              content="save now"
              buttonType="filled"
              additionalClasses=" md:w-auto"
            />
          </div>
        </form>
      </div>
      <PagesDataGrid />
    </section>
  );
};

export default AddProductPage;
