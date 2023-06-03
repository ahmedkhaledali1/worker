"use client";
import { usePhoto } from "@/context/PhotoContext";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const styles = {
  focused: {
    borderColor: "#2196f3",
  },
  accept: {
    borderColor: "#00e676",
    backgroundColor: "rgb(59 130 246 / 0.3)",
  },
  reject: {
    borderColor: "#ff1744",
    backgroundColor: "rgb(220 38 38 / 0.3)",
  },
};

const DragAndDrop = () => {
  const { uploadedPhoto, setUploadedPhoto } = usePhoto();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...(isFocused && styles.focused),
      ...(isDragAccept && styles.accept),
      ...(isDragReject && styles.reject),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedPhoto(fileUrl);
    }
  }, [acceptedFiles, setUploadedPhoto]);

  const handleRemoveFiles = () => {
    if (uploadedPhoto) {
      URL.revokeObjectURL(uploadedPhoto);
    }
    setUploadedPhoto(null);
    acceptedFiles.splice(0, acceptedFiles.length);
  };
  return (
    <section className="w-64 text-center">
      <div
        {...getRootProps({ className: "dropzone", style })}
        className="py-5 px-4 border border-dashed border-gray-400 rounded-tr-lg rounded-tl-lg transition-all"
      >
        <input {...getInputProps()} />
        <Image
          src="/assets/image icon.svg"
          className="inline"
          width={19}
          height={19}
          alt="image icon"
        />
        <p className="text-gray-400">
          Drag your image, or select &nbsp;
          <span className="text-gray-500 font-semibold cursor-pointer">click to browse</span>
        </p>
      </div>
      <p className="text-gray-400 mt-2">Attach an image or file</p>
      <aside>
        {files.length > 0 && (
          <>
            <h4>Files</h4>
            <ul>{files}</ul>
            <button
              onClick={handleRemoveFiles}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Files
            </button>
          </>
        )}
      </aside>
    </section>
  );
};

export default DragAndDrop;
