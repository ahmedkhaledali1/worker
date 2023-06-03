'use client';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const PriceOffer = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [validated, setValidated] = useState('');
  const [formFields, setFormFields] = useState({
    customer_id: '',
    company_id: '',
    title: '',
    product_id: '',
    price: '',
    discount: '',
    tax: '',
    message: '',
    address: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetFormFields = () => {
    setFormFields({
      customer_id: '',
      company_id: '',
      title: '',
      product_id: '',
      price: '',
      discount: '',
      tax: '',
      message: '',
      address: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/offer_prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('offer saved successfully');
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

  const [tax, setTax] = useState([]);
  const [discount, setDiscount] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/offer_prices`,
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

        const { offer } = await response.json();
        console.log(offer);
        setTax(offer.map((order) => order.tax));
        setDiscount(offer.map((orderthing) => orderthing.discount));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <section>
      <Header headerText="Price offer" />
      <form className={`${validated} px-10`} onSubmit={handleFormSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-3">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="customer id"
              placeHolder="customer id"
              icon={<FaUser />}
              name="customer_id"
              value={formFields.customer_id}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="company id"
              placeHolder="company id"
              name="company_id"
              value={formFields.company_id}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="title"
              name="title"
              value={formFields.title}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="Tax"
              type="select"
              selectData={tax.length > 1 ? tax : []}
              name="tax"
              value={formFields.tax}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col flex-wrap gap-[23px] flex-1">
            <Input
              labelText="product id"
              placeHolder="product id "
              name="product_id"
              value={formFields.product_id}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="price"
              placeHolder="price"
              name="price"
              value={formFields.price}
              onChange={handleInputChange}
              required
            />
            <Input
              labelText="Adress"
              name="address"
              value={formFields.address}
              onChange={handleInputChange}
            />
            <Input
              labelText="Discount"
              type="select"
              selectData={discount.length > 1 ? discount : []}
              name="discount"
              value={formFields.discount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <Input
          labelText="Message client"
          placeHolder="message to the client"
          type="textarea"
          name="message"
          value={formFields.message}
          onChange={handleInputChange}
          required
        />

        <div className="flex justify-center items-center my-11">
          <ButtonComponent
            content="Done"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default PriceOffer;
