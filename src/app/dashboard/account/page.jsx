"use client";
import ButtonComponent from "@/components/Button";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosPin } from "react-icons/io";
import {
  MdEmail,
  MdBusiness,
  MdDateRange,
  MdPermIdentity,
  MdPhone,
  MdAccountCircle,
  MdWork,
  MdAttachMoney,
  MdGroup,
  MdSupervisorAccount,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
const Account = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${user.id}`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { user } = await response.json();
      setUser(user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      setUser(session.user.user);
    }
  }, [session]);
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleUpdateUser = (field, value) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("img", updatedUser);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setIsEditing(false);
        toast.success(data.massage);
      })
      .catch((error) => {
        toast.error(`Failed to update user information. ${error.massage}`);
        console.log(error)
      });
  };
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const handleProfilePictureEditClick = () => {
    setIsEditingProfilePicture(true);
  };
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUpdatedUser((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
      console.log(updatedUser);
      handleSaveChanges();
    } else {
      // Handle not accepted files here, show an error message
      toast.error("Invalid file type. Please upload an image.");
    }
    setIsEditingProfilePicture(false);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <section className="max-w-4xl mx-auto py-12 px-10">
      <h1 className="text-3xl font-bold mb-6">Account Information</h1>
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 relative" {...getRootProps()}>
          <input {...getInputProps()} />
          {updatedUser.image ? (
            <img
              src={updatedUser.image}
              alt={updatedUser.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex justify-center items-center text-gray-500 font-bold text-xl">
              {updatedUser?.name && (
                <div className="w-full h-full bg-gray-200 rounded-full flex justify-center items-center text-gray-500 font-bold text-xl">
                  {updatedUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {isEditing && (
            <div
              className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer"
              onClick={handleProfilePictureEditClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M12 20v-6m0-4V4M4 8l16 0m-8 12l0-6"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="px-4 w-full rounded-tr-md rounded-tl-md dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
            <HiOutlineMail
              size={24}
              className="inline-block mr-2 text-blue-500"
            />
            {user.email}
          </p>
          {user.type === "admin" ? (
            <p className="px-4 w-full dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
              <MdSupervisorAccount
                size={24}
                className="inline-block mr-2 text-blue-500"
              />
              Admin
            </p>
          ) : (
            <p className="px-4 w-full dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
              <MdGroup size={24} className="inline-block mr-2 text-blue-500" />
              Employee
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-lg shadow-md dark:bg-slate-800">
          <h3 className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 font-bold mb-4">
            Personal Information
          </h3>
          <div className="flex items-center mb-4">
            <MdPermIdentity size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.name}
                onChange={(e) => handleUpdateUser("name", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.name}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdEmail size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                type="email"
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.email}
                onChange={(e) => handleUpdateUser("email", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.email}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdDateRange size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                type="date"
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.date_of_birth}
                onChange={(e) =>
                  handleUpdateUser("date_of_birth", e.target.value)
                }
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.date_of_birth}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <IoIosPin size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                type="text"
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.City}
                onChange={(e) => handleUpdateUser("City", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.City}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdAccountCircle size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.username}
                onChange={(e) => handleUpdateUser("username", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.username}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdPhone size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.phone}
                onChange={(e) => handleUpdateUser("phone", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.phone}
              </p>
            )}
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md dark:bg-slate-800">
          <h3 className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 font-bold mb-4">
            Professional Information
          </h3>
          <div className="flex items-center mb-4">
            <MdBusiness size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.Company_Name}
                onChange={(e) =>
                  handleUpdateUser("Company_Name", e.target.value)
                }
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.Company_Name}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdWork size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.Job_number}
                onChange={(e) => handleUpdateUser("Job_number", e.target.value)}
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.Job_number}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <MdAttachMoney size={24} className="text-blue-500 mr-2" />
            {isEditing ? (
              <input
                type="number"
                className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
                value={updatedUser.total_salary}
                onChange={(e) =>
                  handleUpdateUser("total_salary", e.target.value)
                }
              />
            ) : (
              <p className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2">
                {user.total_salary}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <>
            <ButtonComponent
              additionalClasses="!mr-4"
              onClick={() => setIsEditing(false)}
              content="Cancel"
            />

            <ButtonComponent
              buttonType="filled"
              onClick={handleSaveChanges}
              content="Save Changes"
            />
          </>
        ) : (
          <ButtonComponent
            buttonType="filled"
            onClick={() => setIsEditing(true)}
            content="Edit Information"
          />
        )}
      </div>
    </section>
  );
};

export default Account;
