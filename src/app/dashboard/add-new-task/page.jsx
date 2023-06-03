'use client';
import ButtonComponent from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const AddingTasks = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  // const [tasksTitle, setTasksTitle] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/task`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`);
  //       }

  //       const { task } = await response.json();
  //       setTasksTitle(task.map((user) => user.title));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [token]);
  const [formFields, setFormFields] = useState({
    company_id: '',
    title: '',
    description: '',
    customer_id: '',
    date: '',
    group_id: '',
  });

  const { company_id, title, description, customer_id, date, group_id } =
    formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields({
      company_id: '',
      title: '',
      description: '',
      customer_id: '',
      date: '',
      group_id: '',
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api/task', {
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

  const [taskTitle, setTaskTitle] = useState([]);
  const [customerIdTask, setCustomerIdTask] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/task`,
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

        const { task } = await response.json();
        setTaskTitle(task.map((task) => task.title));
        setCustomerIdTask(task.map((task) => task.customer_id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <section>
      <Header headerText="Adding Tasks" />
      <form
        className={`${isValid} px-10 pb-7 flex flex-col gap-5`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
          <div className="flex flex-col gap-[23px] flex-1">
            <Input
              labelText="Company"
              placeHolder="The Company .."
              icon={<FaUser />}
              name="company_id"
              value={company_id}
              onChange={company_id}
              required
            />
          </div>
          <div className="flex flex-col flex-wrap gap-[23px] flex-1">
            <Input
              labelText="title"
              type="select"
              selectData={taskTitle.length > 1 ? taskTitle : []}
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <Input
          labelText="customer id"
          placeHolder="customer id"
          type="select"
          selectData={customerIdTask.length > 1 ? customerIdTask : []}
          name="customer_id"
          value={customer_id}
          onChange={onChange}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            labelText="Date task"
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
          <Input
            labelText="group id"
            name="group_id"
            value={group_id}
            onChange={onChange}
            required
          />
        </div>
        <Input
          labelText="Description"
          placeHolder="description of the task"
          type="textarea"
          name="description"
          value={description}
          onChange={onChange}
          required
        />
        <div className="flex justify-center items-center my-11">
          <ButtonComponent
            content="Save task"
            buttonType="filled"
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default AddingTasks;
