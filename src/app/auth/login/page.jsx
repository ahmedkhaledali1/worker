"use client";

import { useEffect, useState } from "react";
import {
  MdVisibilityOff as VisibilityOffIcon,
  MdRemoveRedEye as RemoveRedEyeIcon,
  MdWavingHand as WavingHandIcon,
} from "react-icons/md";
import Button from "@/components/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginUserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRemeberedUser, setIsRemeberedUser] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleGoogleLogin = async () => {
    signIn("google", {
      callbackUrl: `/dashboard`,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);
    try {
      loginUserSchema.validateSync(
        {
          email: email,
          password: password,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    setIsLoading(true);
    const user = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!user.error) {
      handleRememberUser();
      router.push(`/dashboard`);
    } else {
      setError([user.error]);
      setIsLoading(false);
    }
  };
  const handleRememberUser = () => {
    if (isRemeberedUser) {
      localStorage.setItem("worker-user", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("worker-user");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("worker-user"));
    if (!user) return;
    setIsRemeberedUser(true);
    setEmail(user.email);
    setPassword(user.password);
  }, []);

  return (
    <div className="px-4 flex flex-col mt-32 gap-8">
      <div className="">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-blue-700 text-transparent bg-clip-text">
          Welcome Back!
          <WavingHandIcon className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          Start managing your company better.
        </h3>
      </div>

      <form className="flex flex-col gap-8" autoComplete="on">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-4 text-md font-bold ">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            id="email"
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
              onChange={(e) => setPassword(e.target.value)}
              type={isShowPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Your Password"
              id="password"
              autoComplete="current-password"
              className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
            {!isShowPassword ? (
              <VisibilityOffIcon
                onClick={() => setIsShowPassword(true)}
                className="rounded-md cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
              />
            ) : (
              <RemoveRedEyeIcon
                onClick={() => setIsShowPassword(false)}
                className="rounded-md cursor-pointer top-[50%] translate-y-[-50%] absolute right-2 text-gray-400"
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
        <div className="flex justify-between items-center w-full  h-full">
          <div className="flex justify-center items-center gap-1">
            <label htmlFor="remember-me" className=" text-gray-400 text-xs ">
              Remember me
            </label>
            <div className="relative flex items-center ">
              <input
                onChange={(e) => setIsRemeberedUser(e.target.checked)}
                type="checkbox"
                checked={isRemeberedUser}
                value={isRemeberedUser || ""}
                id="remember-me"
                className="relative w-full border-none outline-none"
              />
            </div>
          </div>
          <h3 className="text-blue-400 text-xs ">
            <Link
              className="text-blue-400 font-bold text-sm"
              href="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </h3>
        </div>

        <div className="flex flex-col text-center gap-5">
          <Button
            onClick={handleLogin}
            content={loading ? <Loading /> : "Login"}
          />
          <p className="text-xl">OR</p>
          <Button
            onClick={handleGoogleLogin}
            content={"Sign with Google"}
            type="button"
            buttonType="filled"
            icon={<FcGoogle size={27} />}
          />
        </div>
      </form>
      <p className="text-gray-400 relative bottom-0 text-center">
        You do not have an account?{" "}
        <Link className="text-blue-400 font-bold text-sm" href="/auth/signUp">
          Sign Up Now!
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
