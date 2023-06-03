"use client";
import { useEffect, useState } from "react";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import Button from "@/components/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import { signUpSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    Company_Name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [passwordIcon, setPasswordIcon] = useState(false);

  const togglePasswordIcon = () => {
    setPasswordIcon(!passwordIcon);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          Company_Name: formData.Company_Name,
          email: formData.email,
          password: formData.password,
          password: formData.password_confirmation,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error registering user.");
      }
      const data = await response.json();
      setLoading(false);
      toast.success("registered successfully.");
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 flex flex-col mt-24 gap-8 ">
      <div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-500 text-transparent bg-clip-text">
          Welcome to Worker!
          <MdWavingHand className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          Start managing your company better.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 text-md font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Company_Name" className="mb-4 text-md font-bold">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Company Name"
            id="Company_Name"
            name="Company_Name"
            value={formData.Company_Name}
            onChange={handleInputChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-4 text-md font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
              error && "border-red-500"
            }`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-4 text-md font-bold">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
            {passwordIcon ? (
              <MdVisibility
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            ) : (
              <MdVisibilityOff
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password_confirmation"
            className="mb-4 text-md font-bold"
          >
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Confirm Your Password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
            {passwordIcon ? (
              <MdVisibility
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            ) : (
              <MdVisibilityOff
                className="cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
                onClick={togglePasswordIcon}
              />
            )}
          </div>
        </div>
        {error && (
          <div className="text-xs  flex flex-col text-red-500 mx-4">
            {error.map((err, key) => {
              return <p key={key}>*{err}</p>;
            })}
          </div>
        )}
        <Button
          type="submit"
          content={loading ? <LoadingComponent /> : "Sign Up"}
        />
      </form>
      <p className="text-gray-400 relative bottom-4 text-center">
        You have an account?{" "}
        <Link className="text-blue-400 font-bold text-sm" href="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
}
