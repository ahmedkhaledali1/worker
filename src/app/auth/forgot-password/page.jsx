"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens/forgotpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (
        response.ok &&
        data.massege !== "We cant find a user with that email address"
      ) {
        setSuccess(true);
        toast.success(data.massege);
        console.log(data.massege);
      } else {
        setError(data.massege);
        toast.error(data.massege);
      }
    } catch (error) {
      setError(error.massege);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-blue-700 text-transparent bg-clip-text">
        Forgot your password?
      </h1>
      {!success ? (
        <form
          className="w-full max-w-lg flex flex-col gap-4"
          onSubmit={handleResetPassword}
        >
          <label htmlFor="email" className="text-lg font-semibold">
            Enter your email address:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`px-4 rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-blue-400 py-2 ${
              error && "border-red-500"
            }`}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            type="submit"
            content={isLoading ? <LoadingComponent /> : "Reset password"}
          />
        </form>
      ) : (
        <div className="text-lg font-semibold dark:text-slate-50">
          A password reset link has been sent to your email address.
        </div>
      )}
    </div>
  );
};
export default ForgotPasswordPage;
