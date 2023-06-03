"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { useProSidebar } from "react-pro-sidebar";

const Input = ({
  upperCase = false,
  rounded = "rounded-md",
  inputBgColor = "bg-white dark:bg-slate-700",
  labelBgColor = "bg-blue-500",
  labelText = "Label Text",
  type = "text",
  typeOfSelectData,
  placeHolder,
  required = true,
  icon,
  ClassesForTheDiv,
  ClassesForTheLabel,
  ClassesForTheInput,
  ClassesForTheIcon,
  selectData,
  ...inputProps
}) => {
  const [selectedName, setSelectedName] = useState();

  const handleSelectChange = (event) => {
    setSelectedName(event.target.value);
  };

  const renderSelect = () => (
    <select
      placeholder={placeHolder}
      name="workers"
      className={`mx-2 flex-1 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
      {...inputProps}
      // value={selectedName}
      // onChange={handleSelectChange}
    >
      {typeOfSelectData === "normal"
        ? selectData &&
          selectData.map((option, index) => (
            <option key={index} value={option.value} >
              {option.label}
            </option>
          ))
        : selectData &&
          selectData.map((name, index) => (
            <option key={index} value={name} >
              {name}
            </option>
          ))}
    </select>
  );
  const { collapsed } = useProSidebar();

  const renderTextArea = () => (
    <>
      <label
        htmlFor="your-textarea"
        className={`text-gray-100 ${labelBgColor} ${
          collapsed ? null : "!text-[13px]"
        } text-[13px] md:text-[16px] rounded-tl-md rounded-bl-md pt-1 h-8 px-3 ${ClassesForTheLabel}`}
      >
        {labelText}
      </label>
      <textarea
        id="textarea"
        placeholder={placeHolder}
        className="border border-blue-300 dark:bg-slate-700 focus:outline-blue-600 flex-1 p-2 rounded-tr-md rounded-br-md resize-none align-middle"
        cols="20"
        rows="5"
        {...inputProps}
      ></textarea>
    </>
  );

  const renderDefaultInput = () => (
    <>
      <input
        className={`ml-2 flex-1 px-2 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
        type={type}
        placeholder={placeHolder || labelText}
        required={required}
        {...inputProps}
      />
      <div className={`text-blue-600 pr-2 ${ClassesForTheIcon}`}>{icon}</div>
    </>
  );

  const renderInputs = () => {
    switch (type) {
      case "select":
        return renderSelect();
      case "textarea":
        return renderTextArea();
      default:
        return renderDefaultInput();
    }
  };

  return (
    <div
      className={`flex capitalize ${
        upperCase && "uppercase"
      }  flex-nowrap overflow-hidden ${
        type === "textarea"
          ? "bg-transparent"
          : `border-2 border-blue-200 needs-validation items-center ${inputBgColor} ${rounded}`
      } ${ClassesForTheDiv}`}
    >
      {type === "textarea" ? null : (
        <label
          className={`text-gray-100 ${labelBgColor} ${
            collapsed ? null : "!text-[13px]"
          } text-[13px] md:text-[16px] flex-[0.5] h-full px-3 py-2 ${ClassesForTheLabel}`}
        >
          {labelText}
        </label>
      )}
      {renderInputs()}
    </div>
  );
};

Input.propTypes = {
  upperCase: PropTypes.bool,
  rounded: PropTypes.string,
  bgColor: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  typeOfSelectData: PropTypes.string,
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.object,
  selectData: PropTypes.array,
  ClassesForTheDiv: PropTypes.string,
  ClassesForTheLabel: PropTypes.string,
  ClassesForTheInput: PropTypes.string,
  ClassesForTheIcon: PropTypes.string,
};

export default Input;
