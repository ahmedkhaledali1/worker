import { createContext, useContext, useState } from "react";

const PhotoContext = createContext();

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhoto must be used within a PhotoProvider");
  }
  return context;
};

export const PhotoProvider = ({ children }) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const value = {
    uploadedPhoto,
    setUploadedPhoto,
  };

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};
