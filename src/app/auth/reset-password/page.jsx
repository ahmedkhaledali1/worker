"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ResetPasswordPage = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens/forgotpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(confirmPassword),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        toast.success(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-700 text-transparent bg-clip-text">
        Reset your password
      </h1>
      {!success ? (
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleResetPassword}>
          <label htmlFor="password" className="text-lg font-semibold">
            New password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your Password at least 8 characters"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-blue-400 py-2 ${
              error && "border-red-500"
            }`}
          />
          <label htmlFor="confirmPassword" className="text-lg font-semibold">
            Confirm new password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            minLength={8}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-blue-400 py-2 ${
              error && "border-red-500"
            }`}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            type="submit"
            content={isLoading ? "Loading..." : "Reset password"}
          />
        </form>
      ) : (
        <div className="text-lg font-semibold dark:text-slate-50">
          Your password has been reset successfully.
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;