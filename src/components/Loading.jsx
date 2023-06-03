"use client";
import { Circles } from "react-loader-spinner";
import PropTypes from "prop-types";

function LoadingComponent({ ...props }) {
  const {
    type = "Circles",
    height = "24",
    width = "24",
    ariaLabel = "circles-loading",
  } = props;
  return (
    // <div className="">
    <Circles
      type={type}
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      color="#1d4ed8"
      wrapperClass="text-blue-600 dark:text-blue-200"
    />
    // </div>
  );
}

LoadingComponent.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default LoadingComponent;
