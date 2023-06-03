import PropTypes from "prop-types";

const ButtonComponent = ({
  fontColor = "text-white",
  fontWeight = "font-normal",
  bgColor = "bg-blue-500",
  capitalize = false,
  upperCase = false,
  content = "Place Holder...",
  icon,
  rounded = "rounded-md",
  buttonType,
  additionalClasses,
  ...buttonProps
}) => {
  const buttonClasses = `
    ${upperCase ? "uppercase" : ""}
    ${capitalize ? "capitalize" : ""}
    ${fontWeight}
    ${rounded}
    ${
      buttonType === "filled"
        ? `${bgColor} ${fontColor}`
        : `bg-transparent hover:bg-blue-500 border-2 border-solid border-blue-400 text-blue-400 hover:text-white`
    }
    mx-4 px-4 py-2 flex justify-center items-center transition-all
    ${additionalClasses}
  `;

  return (
    <button className={buttonClasses.trim()} {...buttonProps}>
      {icon && <span className="px-2">{icon}</span>}
      {content}
    </button>
  );
};

ButtonComponent.propTypes = {
  content: PropTypes.string.isRequired || PropTypes.element,
  icon: PropTypes.element,
  rounded: PropTypes.string,
  buttonType: PropTypes.string,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  bgColor: PropTypes.string,
  capitalize: PropTypes.bool,
  upperCase: PropTypes.bool,
  additionalClasses: PropTypes.string,
};

export default ButtonComponent;
