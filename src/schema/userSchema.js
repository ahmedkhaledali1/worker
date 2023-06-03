import { object, string, number, date, InferType } from "yup";

export const loginUserSchema = object().shape({
  email: string().email().required("Please Enter Email"),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
});
export const signUpSchema = object().shape({
  name:string().required("Please Enter Your Name"),
  Company_Name:string().required("Please Enter Your Company Name"),
  email: string().email().required("Please Enter Email"),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
